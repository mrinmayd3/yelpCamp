const Campground = require('./models/campground');
const Review = require('./models/review');
const { campgroundSchema, reviewSchema } = require('./joiSchemas');
const ExpressError = require('./utils/ExpressError');


module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'You need to login first!');
        return res.redirect('/login');
    }
    next();
}


module.exports.validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        throw new ExpressError(error, 400);
    } else {
        next();
    }
}

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const camp = await Campground.findById(id);
    if (!camp.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}

module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}


module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        throw new ExpressError(error, 404);
    } else {
        next();
    }
}