const path = require("path");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
module.exports = app;

// May need the following global Mocha hook:
// if (process.env.NODE_ENV === 'test') {
//     after('close the session store', () => sessionStorage.stopExpiringSessions())
// }

//secrets file can go here if one is needed

const createApp = () => {
  //logging middle ware can go here
  //body parsing
  //compression
  //passport
  //auth and api routes

  app.use(express.static(path.join(__dirname, "..", "public")));

  //404 error catching

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
