const bodyParser = require("body-parser");
const express = require("express");
const dbConnect = require("./config/dbConnect");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const cors=require("cors");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 4000;

const authRouter = require("./routes/authRoute");
const productRouter=require("./routes/productRoute");
const blogRouter=require("./routes/blogRoute");
const productcategoryRouter=require("./routes/productcategoryRoute");
const blogcategoryRouter=require("./routes/blogCatRoute");
const brandRoute=require("./routes/brandRoute");
const couponRoute=require("./routes/couponRoute");

const cookieParser = require("cookie-parser");
const morgan=require('morgan');
dbConnect();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/user", authRouter);
app.use("/api/product", productRouter);
app.use("/api/blog", blogRouter);
app.use("/api/category", productcategoryRouter);
app.use("/api/blogcategory", blogcategoryRouter);
app.use("/api/brand", brandRoute);
app.use("/api/coupon", couponRoute);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server is running at Port ${PORT}`);
});
