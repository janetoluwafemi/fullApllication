import React, { useState } from 'react';
import axios from 'axios';

function GetCardByName() {
    const [name, setName] = useState('');
    const [cardId, setCardId] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted with name:', name);

        if (!name) {
            alert("Please enter a card name.");
            return;
        }

        setLoading(true);
        setError('');
        setMessage('');
        setCardId('');

        try {
            const url = `http://localhost:8082/api/card/${name}`;
            console.log('Making API request to:', url);

            const response = await axios.get(url);
            console.log('API Response:', response);

            if (response.data && response.data.cardId) {
                setCardId(response.data.cardId);
                setMessage(`Card ID found: ${response.data.cardId}`);

                localStorage.setItem('cardId', response.data.cardId);
                console.log('Card found successfully:', response.data);
                window.location.href = "/delete_card";
                console.log(sessionStorage, 'hiiii')
            } else {
                setError('Card not found.');
            }
        } catch (error) {
            console.error('There was an error finding the card!', error);
            setError(`Failed to find the card. ${error.message || 'Please try again.'}`);
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
