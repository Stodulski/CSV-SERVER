import app from "./config.js";

app.listen(process.env.PORT || 3000, () => {
    console.log("Server started");
});
