// loads environment variables from a .env file into process.env
import dotenv from "dotenv";
dotenv.config();

// Import necessary NPM packages
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";

import errorHandler from "./lib/error_handler"; //  error handling middleware
import auth from "./lib/passport_startegy"; // passport authentication middleware

// Import routes files
import userRoutes from "./routes/user_routes";
import postRoutes from "./routes/post_routes";
import commentRoutes from "./routes/comment_routes";

// instantiate express application object
const app = express();

// set CORS headers on response from this API using the `cors` NPM package
// `CLIENT_ORIGIN` is an environment variable that will be set on Heroku
app.use(cors());
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

// define port for API to run on
const port = process.env.PORT;

/* The method `.use` sets up middleware for the Express application */

// register passport authentication middleware
app.use(auth);

// add `bodyParser` middleware which will parse JSON requests into
// JS objects before they reach the route files.
app.use(bodyParser.json());

// Parse Cookie header and populate req.cookies
app.use(cookieParser());

// this parses requests sent by `fetch`, which use a different content type
app.use(bodyParser.urlencoded({ extended: true }));

// register route files
app.use(userRoutes);
app.use(postRoutes);
app.use(commentRoutes);

// register error handling middleware
// note that this comes after the route middlewares, because it needs to be
// passed any error messages from them
app.use(errorHandler);

// run API on designated port (4741 in this case)
app.listen(port, () => {
  console.log("listening on port " + port);
});

// needed for testing
export default app;
