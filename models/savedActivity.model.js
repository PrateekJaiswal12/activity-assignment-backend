import mongoose from 'mongoose';

const savedSchema = new mongoose.Schema({
    savedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    savedAt: {
        type: Date,
        default: Date.now
    }
});

const Save = mongoose.model('Saved', savedSchema);
export default Save;
