const UserResolver = require("./user");
const ProfileResolver = require("./profile");
const ChannelResolver = require("./channel");
const ComponentResolver = require("./component");

module.exports = [
    UserResolver, 
    ProfileResolver, 
    ChannelResolver,
    ComponentResolver
];
