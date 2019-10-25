emailValidator = (email) => {
    if (email.length <= 10) {
        return false;
    } else {
        return true;
    }
};

module.exports = {
    emailValidator
}