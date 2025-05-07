import { timeStamp } from 'console';
import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    savedActivity: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Save'
    }]

}, {
    timestamps: true
});

const Activity  = mongoose.model('Activity', activitySchema);
export default Activity;