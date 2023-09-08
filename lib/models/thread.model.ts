import mongoose from 'mongoose';

const ThreadSchema = new mongoose.Schema({
	text: {
		type: String,
		required: true,
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	parentId: {
		type: String,
	},
	community: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Community',
		},
	],
	children: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Thread',
		},
	],
});

const Thread = mongoose.models.Thread || mongoose.model('Thread', ThreadSchema);

export default Thread;
