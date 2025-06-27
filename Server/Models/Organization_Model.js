const mongoose = require('mongoose');


const OrganizationSchema = new mongoose.Schema({

    username: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },


    organization_name: {

        type: String,
        required: [true, 'Name is required'],

    },
    phoneNo: {
        type: String,
        default: ""
    },
    website: {
        type: String,
        default: ""
    },
    logo: {
        type: String,
        default: ""
    },
    departments: {
        type: [String]

    },
    office_address: {
        type: String,
        default: ""
    },
    office_city: {
        type: String,
        default: ""
    },
    office_country: {
        type: String,
        default: ""
    },

    fb_url: {
        type: String,
        default: ""
    },
    linkedIn_url: {
        type: String,
        default: ""
    },
    insta_url: {
        type: String,
        default: ""
    },
    yt_url: {
        type: String,
        default: ""
    },
    // team_members: [

    //     {
    //         name: String,
    //         email: String,
    //         role: String
    //     }
    // ]
    team_members: [{

        name: { type: String, required: true },
        email: { type: String, required: true, max: 20 },
        role: { type: String, required: true }

    }]

})


const OrganizationModal = mongoose.model('organization', OrganizationSchema);

module.exports = OrganizationModal;