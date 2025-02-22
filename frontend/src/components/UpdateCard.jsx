import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UpdateCard({ onUpdate }) {
    const [cardData, setCardData] = useState({ name: '', type: '', link: '', bucketId: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [cardId, setCardId] = useState('');

    console.log(localStorage.getItem('cardId'), 'hiiii')

    useEffect(() => {
        if (cardId) {
            axios.get(`http://localhost:8082/api/cards/${cardId}`)
                .then(response => {
                    setCardData(response.data);
                })
                .catch(err => {
                    console.error("Error fetching card:", err);
                    setError('Failed to load card data');
                });
        }
    }, [cardId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!cardData.name || !cardData.type || !cardData.link || !cardData.bucketId) {
            alert("Please fill in all fields.");
            return;
        }

        setLoading(true);
        setError('');
        setMessage('');

        setCardId(localStorage.getItem('cardId'));


        try {
            const response = await axios.put(`http://localhost:8082/api/cards/${cardId}`, cardData);
            setMessage(response.data.message);
            sessionStorage.setItem('cardId', cardId);
            localStorage.setItem('cardId', cardId)
            console.log('Card updated successfully:', response.data);
            console.log(sessionStorage, 'hiiii')
            onUpdate();
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

                {/*<div className="form-group">*/}
                {/*    <label htmlFor="type">Bucket Type:</label>*/}
                {/*    <select*/}
                {/*        id="type"*/}
                {/*        value={cardData.type}*/}
                {/*        onChange={(e) => setCardData(prevData => ({ ...prevData, type: e.target.value }))}*/}
                {/*    >*/}
                {/*        <option value="entertainmentVideos">Entertainment Videos</option>*/}
                {/*        <option value="educationVideos">Education Videos</option>*/}
                {/*        <option value="liveVideos">Live Videos</option>*/}
                {/*        <option value="promotionVideos">Promotional Videos</option>*/}
                {/*    </select>*/}
                {/*</div>*/}

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

                {/*<div className="form-group">*/}
                {/*    <label htmlFor="bucketId">Bucket ID:</label>*/}
                {/*    <input*/}
                {/*        type="text"*/}
                {/*        id="bucketId"*/}
                {/*        value={cardData.bucketId}*/}
                {/*        onChange={(e) => setCardData(prevData => ({ ...prevData, bucketId: e.target.value }))}*/}
                {/*        placeholder="Enter bucket ID"*/}
                {/*    />*/}
                {/*</div>*/}

                <button type="submit" disabled={loading}>
                    {loading ? 'Updating...' : 'Update Card'}
                </button>
            </form>
        </div>
    );
}

export default UpdateCard;
