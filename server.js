import express from "express";
import bodyParser from "body-parser";
import localParse from "./lib/localParse";
import graphqlParse from './lib/graphqlParse'
import json_data from "./data/data";

const app = express();
const jsonParser = bodyParser.json();

app.get("/", (req, res) => res.send("post to /link with data"));

// post end-point for local file testing
app.post("/local-link", jsonParser, (req, res) => {
  localParse(req, res, json_data);
});

// post end-point for graphql testing 
app.post("/link", jsonParser, (req, res) => {
  graphqlParse(req, res);
});

app.listen(3000, () => console.log("app running on port 3000"));
