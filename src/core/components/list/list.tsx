import { set, ref } from 'firebase/database';
import { SyntheticEvent, useContext, useEffect, useRef } from 'react';
import { db } from '../../../config';
import { Artwork } from '../../../features/models/artwork.model';
import { ArtworkContext } from '../../context/artworks.context';
import { Item } from '../item/item';
import './list.scss';
export function List() {
    const { artworks, handleLoad, handleAdd, reShuffleArtworks, getAdmin } =
        useContext(ArtworkContext);
    useEffect(() => {
        handleLoad();
    }, [handleLoad]);
    const handleAddSpace = () => {
        const newSpace = new Artwork(
            'untitled',
            'https://firebasestorage.googleapis.com/v0/b/marina-labella-app.appspot.com/o/No%20image2.jpg.png?alt=media&token=1549ba6d-aa29-457a-93e1-3ea2f25df613'
        );
        handleAdd(newSpace);
    };

    const dragItem = useRef();
    const dragOverItem = useRef();

    const dragStart = (e: SyntheticEvent, position: number) => {
        (dragItem.current as unknown) = position;
    };
    const dragEnter = (e: SyntheticEvent, position: number) => {
        e.preventDefault();
        (dragOverItem.current as unknown) = position;
    };

    const drop = (e: SyntheticEvent) => {
        const copyListItems = [...artworks];
        const dragItemContent =
            copyListItems[dragItem.current as unknown as number];
        copyListItems.splice(dragItem.current as unknown as number, 1);
        copyListItems.splice(
            dragOverItem.current as unknown as number,
            0,
            dragItemContent
        );
        (dragItem.current as unknown as null) = null;
        (dragOverItem.current as unknown as null) = null;
        set(ref(db, 'admin/artworks/'), copyListItems);
        reShuffleArtworks(copyListItems);
    };
    return (
        <section className="list">
            {getAdmin() ? (
                <button onClick={handleAddSpace}>
                    <img src={require('../../../assets/Plus.png')} alt="plus" />
                </button>
            ) : (
                ''
            )}
            <div className="row">
                <ul className="artworks-list list-unstyled">
                    {artworks.map((item: Artwork, index) => {
                        return (
                            <Item
                                key={index}
                                item={item}
                                dragStart={(e: SyntheticEvent) =>
                                    dragStart(e, index)
                                }
                                dragEnter={(e: SyntheticEvent) =>
                                    dragEnter(e, index)
                                }
                                dragEnd={drop}
                            ></Item>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}
