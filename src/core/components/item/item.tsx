import { SyntheticEvent, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Artwork } from '../../../features/models/artwork.model';
import { ArtworkContext } from '../../context/artworks.context';
import './item.scss';

export function Item({
    item,
    dragStart,
    dragEnter,
    dragEnd,
}: {
    item: Artwork;
    dragStart: (e: SyntheticEvent) => void;
    dragEnter: (e: SyntheticEvent) => void;
    dragEnd: (e: SyntheticEvent) => void;
}) {
    const { getAdmin, handleFile, handleLoad, handleDetailed, handleDelete } =
        useContext(ArtworkContext);
    const navigate = useNavigate();
    useEffect(() => {
        handleLoad();
    }, [handleLoad]);

    const handleClickDetails = () => {
        handleDetailed(item);
        navigate('/details');
    };

    const handleClickDelete = () => {
        handleDelete(item.id);
    };

    const handleClickFile = (ev: SyntheticEvent) => {
        handleFile(ev, item.id);
    };

    const inputRef = useRef<HTMLInputElement>(null);
    const handleFileButton = () => {
        inputRef.current?.click();
        Swal.fire({
            icon: 'question',
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
        });
    };

    return (
        <li
            className="item"
            draggable
            onDragStart={dragStart}
            onDragEnter={dragEnter}
            onDragEnd={dragEnd}
        >
            <div>
                <img
                    src={item.url}
                    alt={item.title}
                    className="item__artwork"
                    onClick={handleClickDetails}
                />
                {getAdmin() ? (
                    <div>
                        <button onClick={handleFileButton}>
                            <img
                                src={require('../../../assets/Replace.png')}
                                alt="replace"
                            />
                        </button>
                        <input
                            type="file"
                            name=""
                            data-testid="getFile"
                            ref={inputRef}
                            id="getFile"
                            onChange={handleClickFile}
                        />
                        <button onClick={handleClickDelete}>
                            <img
                                className="item__delete"
                                src={require('../../../assets/Trash.png')}
                                alt="delete"
                            />
                        </button>
                    </div>
                ) : (
                    ''
                )}
            </div>
        </li>
    );
}
