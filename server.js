const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (CSS, JS, Images)
app.use(express.static("public"));

// API route to fetch blog posts
app.get("/api/posts", (req, res) => {
    fs.readFile(path.join(__dirname, "data", "posts.json"), "utf8", (err, data) => {
        if (err) {
            res.status(500).json({ error: "Error reading posts.json" });
        } else {
            res.json(JSON.parse(data));
        }
    });
});

// Serve the blog page
app.get("/blog", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "blog.html"));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
