const express = require("express");
const dotenv = require("dotenv");
const swaggerConfig = require("./src/config/swagger.config");
const mainRouter = require("./src/app.routes");
const notFoundHandler = require("./src/common/exception/not-found.handler");
const AllExceptionHandler = require("./src/common/exception/all-exception.handler");
const cookieParser = require('cookie-parser');
dotenv.config()

async function main() {
    const app = express()
    const port = process.env.PORT || 3000;
    require("./src/config/mongoose.config")
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use(cookieParser(process.env.COOKIE_SECRET_KEY))
    app.use(mainRouter)
    swaggerConfig(app)
    notFoundHandler(app)
    AllExceptionHandler(app)
    app.listen(port, () => {
        console.log("Server running on port 3000");
    })
}

main();