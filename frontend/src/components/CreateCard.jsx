import React, { useState } from 'react';
import axios from 'axios';
import '../styles/CreateCard.css'

function CreateCard() {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');
    const [bucketId, setBucketId] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const cardData = {
            name: name,
            link: link,
            bucketId: bucketId,
        };

        try {
            const response = await axios.post('http://localhost:8081/api/cards', cardData);
            console.log('Card created successfully:', response.data);
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

                <div className="form-group">
                    <label htmlFor="bucketId">Select Bucket:</label>
                    <input
                        type="text"
                        id="bucketId"
                        value={bucketId}
                        onChange={(e) => setBucketId(e.target.value)}
                        placeholder="Enter bucket ID"
                        required
                    />
                </div>

                <button type="submit">Create Card</button>
            </form>
        </div>
    );
}

export default CreateCard;
