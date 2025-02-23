import React, { useState } from 'react';
import axios from 'axios';
import '../styles/CreateCard.css'

function CreateCard() {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');
    const [bucketId, setBucketId] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    console.log(localStorage.getItem('bucketId'), 'hiiii')
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name) {
            alert("Please enter a card name.");
            return;
        }

        setLoading(true);
        setError('');

        setBucketId(localStorage.getItem('bucketId'));
        const cardData = {
            name: name,
            link: link,
            bucketId: bucketId,
        };


        try {
            const response = await axios.post('http://localhost:8082/api/cards', cardData);
            const cardId = response.data.bucketId;
            sessionStorage.setItem('cardId', cardId);
            localStorage.setItem('cardId', cardId)
            console.log('Card created successfully:', response.data);
            console.log(sessionStorage, 'hiiii')
        } catch (error) {
            console.error('Error creating card:', error);
        }
    };

    return (
        <div className="CreateCardContainer">
            <h1>Create New Card</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Card Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter card name"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="link">Card Link:</label>
                    <input
                        type="url"
                        id="link"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        placeholder="Enter card link"
                        required
                    />
                </div>

                <button type="submit">Create Card</button>
            </form>
        </div>
    );
}

export default CreateCard;
