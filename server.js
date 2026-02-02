const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const dbConnection = require("./config/db");
const serverError = require("./utils/serverError");
const globalErrorHandler = require("./middleware/globalErrorHandler");
const catchAsyncError = require("./utils/catchAsync");
const authRouter = require("./routes/auth")
dotenv.config();

const app = express();

//middleware
app.use(cors());
app.use(express.json());

//Routes
app.get(
  "/",
  catchAsyncError(async (req, res, next) => {
    // replicate error
    const simulateError = true;
    if (simulateError) {
      throw new serverError("Something went wrong in async route", 500);
    }
    res.send("Api Running.....");
  }),
);

app.use("/api/auth", authRouter)

// Catch unknown routes
app.use((req, res, next) => {
    next(new serverError(`Cannot find ${req.originalUrl}`, 404))
})

// Global error handler
app.use(globalErrorHandler)
//connect to database
dbConnection();


//app connects to port
const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
  console.log(`Sever Running on port: ${PORT}`);
});
