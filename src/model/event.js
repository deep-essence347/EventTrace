export const eventSchema = {
	id: String,
	name: String,
	desription: String,
	coverImage: String,
	categories: [String],
	type: String,
	participantLimit: Number,
	dateTime: {
		startDate: String,
		startTime: String,
		endDate: String,
		endTime: String,
	},
	location: {
		location: String,
		latitude: Number,
		longitude: Number,
	},
	fee: Number,
	eventLink: String,
	publish: Boolean,
	creator: {
		accountID: String,
		role: String,
	},
	soldTickets: [String],
};
