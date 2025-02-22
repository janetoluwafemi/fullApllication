import mongoose, {Schema} from 'mongoose';

const cardSchema = new Schema({
    name: { type: String, required: true },
    link: { type: String, required: true },
    bucketId: { type: Schema.Types.ObjectId, ref: 'Bucket', required: true }  // Reference to the Bucket model
}, { timestamps: true });

const Card = mongoose.model('Card', cardSchema);
export default Card;
