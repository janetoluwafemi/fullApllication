const bucketModel = require('../models/bucket_model');

class BucketService {
    async createTypeBucket() {
        try {
            const newBucket = new bucketModel({
                name: 'Entertainment Videos',
                type: 'entertainmentVideos',
            });
            const savedBucket = await newBucket.save();

            if (!savedBucket._id) {
                return new Error('Bucket creation failed, _id not found');
            }
            console.log('Bucket created:', savedBucket);
            return await bucketModel.find();
        } catch (error) {
            console.error('Error creating bucket:', error);
            throw error;
        }
    }
    async createAnotherTypeBucket() {
        const newBucket = new bucketModel({
            name: 'Education Videos',
            type: 'educationVideos',
        })
        const savedBucket = await newBucket.save();
        if (!savedBucket._id) {
            return new Error('Bucket creation failed, _id not found');
        }
        console.log('Bucket created:', savedBucket);
        return bucketModel.find();
    } catch (error) {
        console.error('Error creating bucket:', error);
        throw error;

    }
    async createAnotherTypeBucketAgain() {
        try {
            const newBucket = new bucketModel({
                name: 'Live Videos',
                type: 'liveVideos',
            });
            const savedBucket = await newBucket.save();

            if (!savedBucket._id) {
                return new Error('Bucket creation failed, _id not found');
            }
            console.log('Bucket created:', savedBucket);
            return await bucketModel.find();
        } catch (error) {
            console.error('Error creating bucket:', error);
            throw error;
        }
    }    async createLastTypeBucket() {
        try {
            const newBucket = new bucketModel({
                name: 'Promotion Videos',
                type: 'promotionVideos',
            });
            const savedBucket = await newBucket.save();

            if (!savedBucket._id) {
                return new Error('Bucket creation failed, _id not found');
            }
            console.log('Bucket created:', savedBucket);
            return await bucketModel.find();
        } catch (error) {
            console.error('Error creating bucket:', error);
            throw error;
        }
    }

    async deleteBucket() {}

    async getBuckets() {
        return bucketModel.find();
    }
}

module.exports = new BucketService();