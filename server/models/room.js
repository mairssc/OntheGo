const mongoose = require('mongoose');
const calendarSchema = require('./calendar.js');
const url = 'mongodb://127.0.0.1:27017/node-mongo-hw' // change this as needed

const Schema = mongoose.Schema;

const roomSchema = new Schema({
    token: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    calendar: {
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
    },
    

    posts: {
        type: Array,
        required: false
    }, 
    
    purchases: {
        type: Array,
        required: false
    },
    users: {
        type: Array,
        required: false
    }
})

module.exports = mongoose.model('room', roomSchema);