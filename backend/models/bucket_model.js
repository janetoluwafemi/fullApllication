const mongoose = require('mongoose');
const { Schema } = mongoose;

const BucketType = {
    ENTERTAINMENTVIDEOS: 'entertainmentVideos',
    EDUCATIONVIDEOS: 'educationVideos',
    LIVEVIDEOS: 'liveVideos',
    PROMOTIONALVIDEOS: 'promotionVideos'
};

const bucketSchema = new Schema({
    name: { type: String, required: true },
    type: {
        type: String,
        enum: Object.values(BucketType),
        required: true
    },
    id: { type: String, unique: true },
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

const Bucket = mongoose.model('Bucket', bucketSchema);
module.exports = Bucket ;
