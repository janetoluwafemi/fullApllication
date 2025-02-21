import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './routes/user_route.js';
import bucketRoutes from './routes/bucket_route.js';
import cardRoutes from './routes/card_route.js';

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

app.use('/api', userRoutes);
app.use('/api', cardRoutes);
app.use('/api', bucketRoutes);

app.listen(8082, () => {
    console.log('Server is running on http://localhost:8082');
});


