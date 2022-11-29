const express = require("express");
const app = express();

app.use(express.static("public"));
app.use("/api", require("./routes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App running at http://localhost:${PORT}`));