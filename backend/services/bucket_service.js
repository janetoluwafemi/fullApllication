import Bucket from "../models/bucket_model.js";

class BucketService {
    async createTypeBucket(bucketDetails) {
        try {
            const existingBucketByName = await Bucket.findOne({ type: bucketDetails.type });
            if (existingBucketByName) {
                return new Error('Name already in use.');
            }
            const newBucket = new Bucket(bucketDetails);
            const savedBucket = await newBucket.save();

            if (!savedBucket._id) {
                return new Error('Bucket creation failed, _id not found');
            }
            console.log('Bucket created:', savedBucket);
            return await Bucket.find();
        } catch (error) {
            console.error('Error creating bucket:', error);
            throw error;
        }
    }

    async getBuckets() {
        return Bucket.find({}, '_id');
    }
}

export default BucketService;