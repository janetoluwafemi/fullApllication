import mongoose, {Schema} from 'mongoose';

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
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

const Bucket = mongoose.model('Bucket', bucketSchema);
export default Bucket ;