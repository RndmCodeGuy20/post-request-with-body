const randomise = require("randomatic");
const bcrypt = require("bcryptjs");

const generateHash = plainTextPassword => {
    const salt = bcrypt.genSaltSync(12);
    return bcrypt.hashSync(plainTextPassword, salt);
};

const generatePassword = () => {
    return randomise("Aa0!", 10);
};

module.exports = {
    generateHash, generatePassword
}