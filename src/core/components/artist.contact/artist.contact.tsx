import { useState, SyntheticEvent, useContext } from 'react';
import { ArtworkContext } from '../../context/artworks.context';
import { useNavigate } from 'react-router-dom';
import './artist.contact.scss';
import Swal from 'sweetalert2';
import { User } from '../../../features/models/user.model';
export function ArtistContact() {
    const { handleAddUser } = useContext(ArtworkContext);
    const navigate = useNavigate();

    const initialFormData = {
        name: '',
        email: '',
        address: '',
        phone: '',
        subject: '',
        description: '',
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleInput = (ev: SyntheticEvent) => {
        const element = ev.target as HTMLFormElement;
        setFormData({ ...formData, [element.name]: element.value });
    };

    const handleSubmit = (ev: SyntheticEvent) => {
        ev.preventDefault();
        const user = new User(formData.name, formData.email,formData.address,formData.phone,formData.subject,formData.description )
        handleAddUser(user)
        navigate('/work');
        Swal.fire({
            title: 'Thanks for submitting!',
            icon: 'success',
            timer: 1000,
            showConfirmButton: false,
        });
    };

    return (
        <div className="artist-contact">
            <h3>Let's talk</h3>
            <p>
                For work inquiries, commissions or just to say hi, please
                contact me at:{' '}
                <span>
                    <a href="mailto:marinaf.labella@gmail.com">
                        marinaf.labella@gmail.com
                    </a>
                </span>{' '}
                <br />
                <br />
                or just use the form and I will get back to you.
            </p>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Name"
                        value={formData.name}
                        onInput={handleInput}
                        required
                    />
                    <input
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Email"
                        value={formData.email}
                        onInput={handleInput}
                        required
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="phone"
                        id="phone"
                        placeholder="Phone"
                        value={formData.phone}
                        onInput={handleInput}
                        required
                    />
                    <input
                        type="text"
                        name="address"
                        id="address"
                        placeholder="Address"
                        value={formData.address}
                        onInput={handleInput}
                        required
                    />
                </div>
                <div>
                    <input
                        className="subject"
                        type="text"
                        name="subject"
                        id="subject"
                        placeholder="Subject"
                        value={formData.subject}
                        onInput={handleInput}
                        required
                    />
                </div>
                <div>
                    <input
                        className="description"
                        type="text"
                        name="description"
                        id="description"
                        placeholder="Type your message here..."
                        value={formData.description}
                        onInput={handleInput}
                        required
                    />
                </div>
                <div className="div__btn">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}
