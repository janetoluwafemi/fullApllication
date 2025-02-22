import React, { useState } from 'react';
import axios from 'axios';
import '../styles/CreateBucket.css';

function CreateBucket() {
    const [name, setName] = useState('');
    const [userId, setUserId] = useState('');
    const [type, setType] = useState('entertainmentVideos');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const bucketTypes = [
        { value: 'entertainmentVideos', label: 'Entertainment Videos' },
        { value: 'educationVideos', label: 'Education Videos' },
        { value: 'liveVideos', label: 'Live Videos' },
        { value: 'promotionVideos', label: 'Promotional Videos' }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name) {
            alert("Please enter a bucket name.");
            return;
        }

        setLoading(true);
        setError('');

        setUserId(sessionStorage.getItem('userId'));

        setUserId(localStorage.getItem('userId'))
        const newBucket = { name, type , userId};

        if (!userId) {
            setError('User is not logged in. Please log in first.');
            setLoading(false);
            return;
        }

        axios.post('http://localhost:8082/api/buckets', newBucket)
            .then(response => {
                const bucketId = response.data.bucketId;
                sessionStorage.setItem('bucketId', bucketId);
                localStorage.setItem('bucketId', bucketId)
                console.log('Bucket created:', response.data);
                alert("Bucket created successfully!");
                window.location.href = "/create_card";
                console.log(sessionStorage, 'hiiii')
            })
            .catch(error => {
                console.error('There was an error creating the bucket!', error);
                setError('Failed to create bucket. Please try again.');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="bucket-create-container">
            <h1>Create New Bucket</h1>
            <form onSubmit={handleSubmit} className="bucket-form">
                <div className="form-group">
                    <label htmlFor="name">Bucket Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter bucket name"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="type">Bucket Type:</label>
                    <select
                        id="type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        {bucketTypes.map((bucket) => (
                            <option key={bucket.value} value={bucket.value}>
                                {bucket.label}
                            </option>
                        ))}
                    </select>
                </div>

                {error && <div className="error-message">{error}</div>}

                <button type="submit" disabled={loading}>
                    {loading ? 'Creating...' : 'Create Bucket'}
                </button>
            </form>
        </div>
    );
}

export default CreateBucket;
