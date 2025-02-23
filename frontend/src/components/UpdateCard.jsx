import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UpdateCard({ onUpdate }) {
    const [cardData, setCardData] = useState({ name: '', cardId: '', link: '' });
    const [cardId, setCardId] = useState('');  // Keep the state for cardId
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Try to load cardId from localStorage when the component mounts
        const storedCardId = localStorage.getItem('cardId');
        if (storedCardId) {
            setCardId(storedCardId); // Set cardId if it exists
        } else {
            setError("Card ID is missing.");
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError('');
        setMessage('');

        if (!cardId) {
            setError("Card ID is missing.");
            setLoading(false);
            return;
        }

        const updatedCard = { name: cardData.name, link: cardData.link };

        try {
            // Make the PUT request with the correct URL and request body
            const response = await axios.put(`http://localhost:8082/api/update/${cardId}`, updatedCard);

            setMessage(response.data.message);
            sessionStorage.setItem('cardId', cardId); // Storing cardId in sessionStorage
            localStorage.setItem('cardId', cardId); // Storing cardId in localStorage
            console.log('Card updated successfully:', response.data);
            onUpdate(); // Assuming this function is passed down as a prop to update the parent component

        } catch (error) {
            console.error('There was an error updating the card!', error);
            setError('Failed to update the card. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Update Card {cardId}</h1>
            {error && <div className="error-message">{error}</div>}
            {message && <div className="success-message">{message}</div>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Card Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={cardData.name}
                        onChange={(e) => setCardData(prevData => ({ ...prevData, name: e.target.value }))}
                        placeholder="Enter card name"
                    />
                </div>


                <div className="form-group">
                    <label htmlFor="link">Card Link:</label>
                    <input
                        type="text"
                        id="link"
                        value={cardData.link}
                        onChange={(e) => setCardData(prevData => ({ ...prevData, link: e.target.value }))}
                        placeholder="Enter card link"
                    />
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? 'Updating...' : 'Update Card'}
                </button>
            </form>
        </div>
    );
}

export default UpdateCard;
