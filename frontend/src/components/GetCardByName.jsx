import React, { useState } from 'react';
import axios from 'axios';

function GetCardByName() {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name) {
            alert("Please enter a card name.");
            return;
        }
        setLoading(true);
        setError('');
        setMessage('');

        try {
            const response = await axios.get(`http://localhost:8082/card/${name}`);

            // Successful API call
            setMessage(`Card ID found: ${response.data.cardId}`);
            const cardId = response.data.cardId;
            sessionStorage.setItem('cardId', cardId);
            localStorage.setItem('cardId', cardId);
            console.log('Card found successfully:', response.data);
        } catch (error) {
            console.error('There was an error finding the card!', error);
            setError('Failed to find the card. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Find Card</h1>
            <form onSubmit={handleSubmit}>
                <div className="find">
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
                {error && <div className="error-message">{error}</div>}
                {message && <div className="success-message">{message}</div>}
                <button type="submit" disabled={loading}>
                    {loading ? 'Finding Card...' : 'Find Card'}
                </button>
            </form>
        </div>
    );
}

export default GetCardByName;
