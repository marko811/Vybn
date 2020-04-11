const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
var bodyParser = require("body-parser");
const { ApolloServer, gql } = require("apollo-server-express");
const typeDefs = require("./typedefs");
const resolvers = require("./resolvers");
const { MnoApi } = require('./dataSources/mnoApi');
const mnoApi = new MnoApi();

var multer = require("multer");
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, `${__dirname}/public/images/`);
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});
var upload = multer({ storage });

const fileUpload = require("express-fileupload");
const getLoggedInUser = req => {
  if (req.headers["x-auth-token"]) {
    try {
      let token = jwt.verify(req.headers["x-auth-token"], "toor");
      return token;
    } catch (err) {
      console.log('get logged user fail', err);
      return false;
    }
  } else {
    return false;
  }
};

app.use(bodyParser.json());
app.use(express.static("public"));

app.post("/token", (req, res, next) => {
  console.log(req.body);
  res.send("done");
});

app.post("/uploadfile", upload.single("pic"), (req, res, next) => {
  console.log(req.file);

  res.send("done");
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({ mnoApi }),
  context: ({ req }) => ({
    user: getLoggedInUser(req)
  })
});

app.listen(3000, () => console.log("listening"));
server.applyMiddleware({ app });
