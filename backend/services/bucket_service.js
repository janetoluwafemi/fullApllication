import Bucket from "../models/bucket_model.js";
import {Types} from "mongoose";

class BucketService {
    async createTypeBucket(userId, bucketDetails) {
        try {
            console.log(bucketDetails);
            await Bucket.deleteMany()
            const existingBucketByName = await Bucket.findOne({ name: bucketDetails.name });

            console.log(existingBucketByName, 'got here')

            if (existingBucketByName) {
                return new Error('Name already in use. You Can Enter Bucket And Create A Card');
            }
            const newBucket =
                new Bucket({name: bucketDetails.name, type: bucketDetails.type, userId: new Types.ObjectId(userId)});
            const savedBucket = await newBucket.save();

            if (!savedBucket._id) {
                return new Error('Bucket creation failed, _id not found');
            }
            console.log('Bucket created:', savedBucket);
            return savedBucket._id;
        } catch (error) {
            console.error('Error creating bucket:', error);
            throw error;
        }
    }

    async getAllBuckets(userId) {
        return Bucket.find({ userId });
    }

    async getBucketById(id) {
        return Bucket.findOne({ id });
    }
}

export default BucketService;