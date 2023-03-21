import { SyntheticEvent, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ArtworkContext } from '../../../core/context/artworks.context';
import { Artwork } from '../../models/artwork.model';
import './details.scss';
export default function Details() {
    const { artworkDetailed, getAdmin, handleUpdate } =
        useContext(ArtworkContext);

    const navigate = useNavigate();

    const initialFormData: Partial<Artwork> = {
        title: (artworkDetailed as Artwork).title,
        description: (artworkDetailed as Artwork).description,
        linkTag: (artworkDetailed as Artwork).linkTag,
        link: (artworkDetailed as Artwork).link,
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleInput = (ev: SyntheticEvent) => {
        const element = ev.target as HTMLFormElement;
        setFormData({ ...formData, [element.name]: element.value });
    };

    const handleSubmit = (ev: SyntheticEvent) => {
        ev.preventDefault();
        handleUpdate({ ...artworkDetailed, ...formData });
        navigate('/work');
        Swal.fire({
            title: 'Successfully edited',
            icon: 'success',
            timer: 1200,
            showConfirmButton: false,
        });
    };

    return (
        <>
            {getAdmin() ? (
                <div className="details">
                    <img
                        src={(artworkDetailed as Artwork).url}
                        alt={(artworkDetailed as Artwork).title}
                        className="item__artwork"
                    />
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            placeholder="Title"
                            value={formData.title}
                            onInput={handleInput}
                            required
                        />
                        <textarea
                            className="description"
                            name="description"
                            id="description"
                            placeholder="Description"
                            value={formData.description}
                            onInput={handleInput}
                        />
                        <input
                            type="text"
                            name="linkTag"
                            id="linkTag"
                            placeholder="Link Tag"
                            value={formData.linkTag}
                            onInput={handleInput}
                        />
                        <input
                            type="text"
                            name="link"
                            id="link"
                            placeholder="Link"
                            value={formData.link}
                            onInput={handleInput}
                        />

                        <div className="div__btn">
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="details">
                    <img
                        src={(artworkDetailed as Artwork).url}
                        alt={(artworkDetailed as Artwork).title}
                        className="item__artwork"
                    />
                    <section>
                        <h2>{(artworkDetailed as Artwork).title}</h2>
                        <p>{(artworkDetailed as Artwork).description}</p>
                        <a href={(artworkDetailed as Artwork).link}>
                            {(artworkDetailed as Artwork).linkTag}
                        </a>
                    </section>
                </div>
            )}
        </>
    );
}
