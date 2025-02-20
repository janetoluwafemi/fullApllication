import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BucketList() {
    const [buckets, setBuckets] = useState([]);

    useEffect(() => {
        const fetchBuckets = async () => {
            try {
                const response = await axios.get('http://localhost:8081/api/buckets');
                setBuckets(response.data);
            } catch (error) {
                console.error('Error fetching buckets:', error);
            }
        };
        useEffect(() => {
            fetchBuckets().then(data => {
                setBuckets(data);
            });
        }, []);      }, []);

    return (
        <div>
            <h1>Bucket List</h1>
            <div className="bucket-list">
                {buckets.map(bucket => (
                    <div key={bucket._id} className="bucket">
                        <h2>{bucket.name}</h2>
                        <p>Type: {bucket.type}</p>
                        <div className="card-list">
                            <h3>Cards:</h3>
                            {bucket.cards && bucket.cards.length > 0 ? (
                                <ul>
                                    {bucket.cards.map((card, index) => (
                                        <li key={index}>
                                            <h4>{card.title}</h4>
                                            <p>{card.description}</p>
                                            {card.imageUrl && <img src={card.imageUrl} alt={card.title} />}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No cards added yet.</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BucketList;
