import React, { useState } from 'react';
import '../styles/DeleteCard.css'
import axios from 'axios';

function DeleteCard() {
    const [cardId, setCardId] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    console.log(localStorage.getItem('cardId'), 'hiiii')

    const handleDelete = async (e) => {
        e.preventDefault();

        if (!cardId) {
            alert("Please enter a card ID.");
            return;
        }
        setLoading(true);
        setError('');
        setMessage('');
        setCardId(localStorage.getItem('cardId'));

        try {
            const response = await axios.delete(`http://localhost:8082/api/cards/${cardId}`);
            setMessage(response.data.message);  // Show success message
        } catch (error) {
            console.error('There was an error deleting the card!', error);
            setError('Failed to delete the card. Please try again.');  // Show error message
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="delete-card-container">
            <h1>Delete Card</h1>
            <form onSubmit={handleDelete} className="delete-card-form">
                <div className="form-group">
                    <label htmlFor="cardId">Card ID:</label>
                    <input
                        type="text"
                        id="cardId"
                        value={cardId}
                        onChange={(e) => setCardId(e.target.value)}
                        placeholder="Enter card ID to delete"
                        required
                    />
                </div>
                {error && <div className="error-message">{error}</div>}
                {message && <div className="success-message">{message}</div>}
                <button type="submit" disabled={loading}>
                    {loading ? 'Deleting...' : 'Delete Card'}
                </button>
            </form>
        </div>
    );
}

export default DeleteCard;
