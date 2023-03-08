/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react';
import { User } from '../../../features/models/user.model';
import { ArtworkContext } from '../../context/artworks.context';
import { Card } from '../contact.card/card';
import './client.contact.scss';
export function ClientContact() {
    const { users, handleLoadUsers } = useContext(ArtworkContext);
    useEffect(() => {
        handleLoadUsers();
    }, [handleLoadUsers]);

    return (
        <>
            <h3>Received Messages</h3>
            <div className="client-contact">
                <ul>
                    {users.map((item: User) => {
                        return <Card key={item.uid} item={item}></Card>;
                    })}
                </ul>
            </div>
        </>
    );
}
