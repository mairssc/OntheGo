const mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1:27017/node-mongo-hw' // change this as needed

const Schema = mongoose.Schema;

// example calendar
// {
//     "summary": "Test 123",
//     "start": {
//       "dateTime": "2022-01-14T20:00:00.000Z",
//       "timeZone": "America/Los_Angeles"
//     },
//     "end": {
//       "dateTime": "2022-01-14T22:00:00.000Z",
//       "timeZone": "America/Los_Angeles"
//     }
//   }



const calendarSchema = new Schema({
    summary: {
        type: String,
        required: false
    },
    location: {
        type: String,
        required: false
    },
    start: {
        dateTime: {
            type: String,
            required: true
        },
        timeZone: {
            type: String,
            required: true
        },
    },
    end: {
        dateTime: {
            type: String,
            required: true
        },
        timeZone: {
            type: String,
            required: true
        },
    },
    recurrence: {
        type: Array,
        required: false
    },
    attendees: {
        type: Array,
        required: false
    },
    reminders: {
        useDefault: {
            type: Boolean,
            required: false
        },
        overrides: {
            type: Array,
            required: false
        }
    }
})

module.exports = mongoose.model('calendar', calendarSchema);