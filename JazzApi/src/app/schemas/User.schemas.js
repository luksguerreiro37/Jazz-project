const validate = require("validate.js");
const constraints = require("./Constraints");

class UserSchemas {
    createUserSchema(userType, name, mail, password, username) {
        const userConstraints = constraints[userType];

        const userData = { name, mail, password, username };

        const isInvalid = validate(userData, userConstraints);

        return isInvalid;
    }

    editUserSchema(userType, name, mail, password, username) {
        const userConstraints = constraints[userType];

        const userData = { name, mail, password, username };

        const filteredUserData = Object.fromEntries(
            Object.entries(userData).filter(([_, value]) => value !== "")
        );

        const isInvalid = validate(filteredUserData, userConstraints);

        return isInvalid;
    }
}

module.exports = new UserSchemas();
