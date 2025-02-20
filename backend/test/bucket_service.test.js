const mongoose = require('mongoose');
const BucketService = require('../services/bucket_service');
const bucketModel = require('../models/bucket_model');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('BucketService', () => {
    it('should create a new bucket and return all buckets', async () => {
        const buckets = await BucketService.createTypeBucket();
        console.log('Buckets:', buckets);
        expect(Array.isArray(buckets)).toBe(true);
        const bucketNames = buckets.map(bucket => bucket.name);
        console.log(bucketNames);
        expect(bucketNames).toContain('Entertainment Videos');
    });
    it('should create another type of bucket and return all buckets', async () => {
        const buckets = await BucketService.createAnotherTypeBucket();
        console.log('Buckets:', buckets);
        expect(Array.isArray(buckets)).toBe(true);
        const bucketNames = buckets.map(bucket => bucket.name);
        console.log(bucketNames);
        expect(bucketNames).toContain('Education Videos');
    });
    it('should create another type of bucket again and return all buckets', async () => {
        const buckets = await BucketService.createAnotherTypeBucketAgain();
        console.log('Buckets:', buckets);
        expect(Array.isArray(buckets)).toBe(true);
        const bucketNames = buckets.map(bucket => bucket.name);
        console.log(bucketNames);
        expect(bucketNames).toContain('Live Videos');
    });
    it('should create last type of bucket and return all buckets', async () => {
        const buckets = await BucketService.createLastTypeBucket();
        console.log('Buckets:', buckets);
        expect(Array.isArray(buckets)).toBe(true);
        const bucketNames = buckets.map(bucket => bucket.name);
        console.log(bucketNames);
        expect(bucketNames).toContain('Promotion Videos');
    });
});