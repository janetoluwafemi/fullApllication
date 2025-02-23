import React, { useState, useEffect } from 'react';
import '../styles/DeleteCard.css'
import axios from 'axios';

function DeleteCard() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [cardId, setCardId] = useState('');

    console.log(sessionStorage.getItem('cardId'), 'yoyoy')

    const handleDelete = async (e) => {
        e.preventDefault();

        setCardId(sessionStorage.getItem('cardId'));
        console.log(cardId, 'hiii')

        if (!cardId) {
            alert("Please enter a card ID.");
            return;
        }

        setLoading(true);
        setError('');
        setMessage('');

        try {
            const response = await axios.delete(`http://localhost:8082/api/cards/${sessionStorage.getItem('cardId')}`);
            setMessage(response.data.message);
            console.log('Card deleted successfully:', response.data);
        } catch (error) {
            console.error('There was an error deleting the card!', error);
            setError('Failed to delete the card. Please try again.');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="delete-card-container">
            <h1>Delete Card</h1>
            <form onSubmit={handleDelete} className="delete-card-form">
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
