// load the typedefs
const UserSchema = require("./user");
const ComponentSchema = require("./component");

const DefaultSchema = require("./default");

module.exports = [
    UserSchema,
    ComponentSchema,
    DefaultSchema
];
