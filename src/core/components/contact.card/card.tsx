import { useContext } from 'react';
import { User } from '../../../features/models/user.model';
import { ArtworkContext } from '../../context/artworks.context';
import './card.scss';
export function Card({ item }: { item: User }) {
    const { handleUpdateUser, handleDeleteCard } = useContext(ArtworkContext);

    const data: Partial<User> = {
        name: '',
        email: '',
        address: '',
        phone: '',
        subject: '',
        description: '',
    };

    const handleClick = () => {
        handleUpdateUser({ ...item, ...data });
        handleDeleteCard(item.uid);
    };

    return (
        <li key={item.uid} className="card">
            <address>
                <span>{item.name}</span>
                <a href={`mailto: ${item.email}`}>{item.email}</a>
                <span>Address: {item.address}</span>
                <span>Phone: {item.phone}</span>
            </address>
            <div>
                <label>Subject: {item.subject}</label>
                <p>{item.description}</p>
            </div>
            <button onClick={handleClick}>
                <img src={require('../../../assets/Trash.png')} alt="trash" />
            </button>
        </li>
    );
}
