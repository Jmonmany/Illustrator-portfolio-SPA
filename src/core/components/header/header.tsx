import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArtworkContext } from '../../context/artworks.context';
import './header.scss';
export function Header({ children }: { children: JSX.Element }) {
    const { currentUser, handleCurrentUser } = useContext(ArtworkContext);
    const title = 'Marina Labella';
    const subtitle = 'ILLUSTRATION';
    const navigate = useNavigate();
    const handleClick = () => {
        if (Object.keys(currentUser).length === 0) {
            navigate('/login');
            return;
        }
        handleCurrentUser({});
    };
    return (
        <header>
            <h1>{title}</h1>
            <h2>{subtitle}</h2>
            <button onClick={handleClick}>
                {Object.keys(currentUser).length === 0 ? 'Log in' : 'Log out'}
            </button>
            {children}
        </header>
    );
}
