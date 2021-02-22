const User = require('../models/user');

module.exports.renderRegisterForm = (req, res) => {
    res.render('users/register');
}

module.exports.register = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        const { name = username } = registeredUser;
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', `Hello, Mr. ${name} Welcome to the yelpcamp`);
            res.redirect('/campgrounds');
        });
    } catch (err) {
        req.flash('error', err.message);
        res.redirect('/register');
    }
}

module.exports.renderLoginForm = (req, res) => {
    res.render('users/login');
}

module.exports.login = (req, res) => {
    const { user } = req.session.passport;
    req.flash('success', `${user}, welcome back!`);
    const returnUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(returnUrl);
}

module.exports.logout = (req, res) => {
    req.logout();
    req.flash('success', 'log out done, goodbye!');
    res.redirect('/campgrounds');
}