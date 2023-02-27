import { useState, SyntheticEvent, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { login } from '../../../config';
import { ArtworkContext } from '../../../core/context/artworks.context';
import './login.scss';
export default function Login() {
    const { handleUser } = useContext(ArtworkContext);
    const navigate = useNavigate();
    const initialFormData = {
        email: '',
        password: '',
    };
    const [formData, setFormData] = useState(initialFormData);

    const handleInput = (ev: SyntheticEvent) => {
        const element = ev.target as HTMLFormElement;
        setFormData({ ...formData, [element.name]: element.value });
    };

    const handleSubmit = async (ev: SyntheticEvent) => {
        ev.preventDefault();
        const userCredentials = await login(formData.email, formData.password);
        handleUser(userCredentials);
        navigate('/work');
        Swal.fire({
            title: 'Successfully logged in',
            icon: 'success',
            timer: 1200,
            showConfirmButton: false,
        });
    };

    return (
        <>
            <section className="login">
                <h2>Log in</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onInput={handleInput}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            value={formData.password}
                            onInput={handleInput}
                            required
                        />
                    </div>
                    <div className="div__btn">
                        <button type="submit">Sign in</button>
                    </div>
                </form>
            </section>
        </>
    );
}
