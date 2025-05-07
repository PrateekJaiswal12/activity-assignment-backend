import Save from '../models/savedActivity.model.js';
import Activity from '../models/activity.model.js'; 


export const allActivities = async(_req, res) => {
    try {
        const activities = await Activity.find({});
        if(!activities) {
            return res.status(404).json({
                message: "No activities found"
            });
        }
    
        res.status(200).json(activities);
    } catch (error) {
        throw new Error(500, 'Error Fetching Activities', error);
    }
}



export const bookActivity = async (req, res) => {
    try {
        const { activityId } = req.body;
        const userId = req.user?.userId;

        if (!userId) {
            return res.status(401).json({
                message: 'Unauthorized Access: No user ID' 
            });
        }

        if (!activityId) {
            return res.status(400).json({
                message: 'Activity ID is required' 
            });
        }

        // console.log('Booking activity:', { userId, activityId });

        const tempSave = await Save.create({
            savedBy: userId
        });

        const activity = await Activity.findById(activityId);
        if (!activity) {
            return res.status(404).json({
                message: 'Activity not found' 
            });
        }

        await activity.save();

        res.status(200).json({
            success: true,
            message: 'Added to saved collection',
            tempSave
        });

    } catch (error) {
        console.error('Error in bookActivity:', error); 
        res.status(500).json({
            message: 'Error in booking activity', 
            error: error.message 
        });
    }
};


export const savedActivity = async(req, res) => {
    const userId = req.user?.userId;
    // console.log(userId);

    if(!userId) {
        return res.status(401).json({
            message: 'Unauthrorized access'
        });
    }

    try {
        const allActivities = await Activity.find({}).populate({
            path: 'savedActivity',
            match: { savedBy: userId }
        });

        // Filter activities that have at least one save by this user
        const userActivities = allActivities.filter(act => act.save.length > 0);

        res.status(200).json({
            success: true,
            activities: userActivities
        });
    } catch (error) {
        console.error("Error in savedActivity:", error);
        return res.status(500).json({
            message: 'Error fetching saved activities',
            error: error.message
        });
    }    
}