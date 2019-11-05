emailValidator = (req, res, next) => {
    if (req.body.email.length <= 6 || !req.body.email.includes("@") || !req.body.email.includes(".com")) {
        var error = new Error("Invalid email");
        error.status = 401;
        next(error);
    } else {
        next();
    }
};

checkIsOlderThan18 = (req, res, next) => {
    if (req.body.age < 18) {
        var error = new Error("you can sign in if you are older than 18");
        error.status = 401;
        next(error);
    } else {
        next();
    }
};

module.exports = {
    emailValidator,
    checkIsOlderThan18
}