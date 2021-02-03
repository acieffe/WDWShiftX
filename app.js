if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}
const express = require('express'); // Get Express
const path = require('path'); // Help find folder and linked pages
const mongoose = require('mongoose'); // Get Mongoose
const ejsMate = require('ejs-mate'); // Get EJS Mate
const session = require('express-session'); // Get express-session for sessions
const flash = require('connect-flash');
const methodOverride = require('method-override');
const AppError = require('./utils/AppError');
const passport = require('passport'); // Get Passport for Auth
const LocalStrategy = require('passport-local'); // Get Passport-Local for Auth
const User = require('./models/user'); // Get the User model
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const { MongoStore } = require('connect-mongo');
const MongoDBStore = require('connect-mongo')(session);

const userRoutes = require('./routes/users');
const campgroundRoutes = require('./routes/campgrounds');
const reviewRoutes = require('./routes/reviews');

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/yelp-camp';

// Connecting Mongoose
mongoose.connect(dbUrl, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('Database connected');
});

const app = express(); // Connect Express

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs'); // Allow ejs files
app.set('views', path.join(__dirname, 'views')); // Where ejs files are

app.use(express.urlencoded({ extended: true })); // Allow to pull from the url
app.use(methodOverride('_method')); // Allow to Override the Post method
app.use(express.static(path.join(__dirname, 'public'))); // Allow access to public folder
app.use(
	mongoSanitize({
		replaceWith: '_',
	})
);

const secret = process.env.SECRET || 'Poopforbreakfast';

const store = new MongoDBStore({
	url: dbUrl,
	secret,
	touchAfter: 24 * 3600,
});

store.on('error', function (e) {
	console.log('SESSION STORE ERROR!', e);
});

const sessionConfig = {
	store,
	name: 'Poopfordinner',
	secret,
	resave: false,
	saveUninitialized: true,
	cookie: {
		httpOnly: true,
		//secure: true,
		expires: Date.now() + 60000 * 60 * 12 * 24 * 7,
		maxAge: 60000 * 60 * 12 * 24 * 7,
	},
};
app.use(session(sessionConfig));
app.use(flash());
app.use(helmet());

const scriptSrcUrls = [
	'https://stackpath.bootstrapcdn.com/',
	'https://api.tiles.mapbox.com/',
	'https://api.mapbox.com/',
	'https://kit.fontawesome.com/',
	'https://cdnjs.cloudflare.com/',
	'https://cdn.jsdelivr.net',
];
const styleSrcUrls = [
	'https://kit-free.fontawesome.com/',
	'https://stackpath.bootstrapcdn.com/',
	'https://api.mapbox.com/',
	'https://api.tiles.mapbox.com/',
	'https://fonts.googleapis.com/',
	'https://use.fontawesome.com/',
	'https://cdn.jsdelivr.net/',
];
const connectSrcUrls = ['https://api.mapbox.com/', 'https://a.tiles.mapbox.com/', 'https://b.tiles.mapbox.com/', 'https://events.mapbox.com/'];
const fontSrcUrls = [];
app.use(
	helmet.contentSecurityPolicy({
		directives: {
			defaultSrc: [],
			connectSrc: ["'self'", ...connectSrcUrls],
			scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
			styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
			workerSrc: ["'self'", 'blob:'],
			objectSrc: [],
			imgSrc: ["'self'", 'blob:', 'data:', 'https://res.cloudinary.com/acieffe/', 'https://images.unsplash.com/'],
			fontSrc: ["'self'", ...fontSrcUrls],
		},
	})
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	res.locals.success = req.flash('success');
	res.locals.error = req.flash('error');
	next();
});

app.use('/', userRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/reviews', reviewRoutes);

// Main page
app.get('/', function (req, res) {
	res.render('home');
	//res.send('YESSSSS')
});

// THIS WAS A TEST TO CREATE A SINGLE CAMPGROUND
// app.get('/makecampground', async (req, res) => {
//     const camp = new Campground({title: 'My Backyard', price: "32.50", description: 'Dirt Cheap Camping', location: "backyard"});
//     await camp.save();
//     res.send(camp)
// })

// 404 Error Handling
app.all('*', (req, res, next) => {
	next(new AppError("404! What are you looking for? Well, it's not here! Go away!", 404));
});

// The Error Handler!
app.use((err, req, res, next) => {
	const { status = 500 } = err;
	if (!err.message) err.message = 'You are so naughty.';
	res.status(status).render('error', { err });
});

const port = process.env.PORT || 3000;
// Connecting to localhost:3000
app.listen(port, () => {
	console.log(`LISTENING ON PORT ${port}`);
});
