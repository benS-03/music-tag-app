const {createUser} = require('../services/userService')

const ensureUser = async (req, res, next) => {
    try {
        const auth0Id = req.auth.payload.sub;

        const user = await createUser(auth0Id);

        req.user = user
        next()
    } catch (err) {
        console.error(err);
        next(err);
    }
}

module.exports = ensureUser;