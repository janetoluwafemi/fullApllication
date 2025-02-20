// const mongoose = require('mongoose');
// const { Schema } = mongoose;
//
// const cardSchema = new Schema({
//     id: { type: String, unique: true },
//     name: { type: String, required: true },
//     link: { type: String, required: true },
//     bucketId: { type: String, required: true },
// }, { timestamps: true });
//
// const Card = mongoose.model('Card', cardSchema);
// module.exports = Card;

const mongoose = require('mongoose');
const { Schema } = mongoose;

const cardSchema = new Schema({
    id: { type: String, unique: true },
    name: { type: String, required: true },
    link: { type: String, required: true },
    bucketId: { type: Schema.Types.ObjectId, ref: 'Bucket', required: true }  // Reference to the Bucket model
}, { timestamps: true });

const Card = mongoose.model('Card', cardSchema);
module.exports = Card;
