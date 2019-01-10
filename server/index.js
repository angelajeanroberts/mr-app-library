const path = require("path");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
module.exports = app;

//if necessary in the future, secrets file can be referenced here

const createApp = () => {
  //if a more robust backend is needed in the future, the following items can be placed here:
    // logging middleware
    // body parsing
    // compression
    // passport
    // auth and api routes
    // server error catching

  app.use(express.static(path.join(__dirname, "..", "public")));

  app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public/index.html"));
  });

  app.use((err, req, res, next) => {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || "Internal server error.");
  });
};

const startListening = () => {
  const server = app.listen(PORT, () =>
    console.log(`Listening on port ${PORT}`)
  );
};

async function bootApp() {
  await createApp();
  await startListening();
}

if (require.main === module) {
  bootApp();
} else {
  createApp();
}
