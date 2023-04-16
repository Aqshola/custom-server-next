import express from "express";

const Router = express.Router();

Router.get("/hello", (req, res) => {
  res.send("halo");
});

export default Router;
