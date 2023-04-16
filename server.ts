import path from "path";
import next from "next";
import express from "express";
import { config as dotenv } from "dotenv";
import nextBuild from "next/dist/build";
import API from "./api";
// const path = require("path");
// const next = require("next");
// const express = require("express");
// const dotenv = require("dotenv");
// const nextBuild = require("next/dist/build");
dotenv();

const DEV = process.env.NODE_ENV != "production";
const server = express();

const start = async () => {
  if (process.env.NEXT_BUILD) {
    server.listen(process.env.PORT, async () => {
      console.log("----- NEXTJS IS BUILDING -----");
      await nextBuild(path.join(__dirname, "../"));
      process.exit();
    });
  } else {
    const nextApp = next({ dev: DEV });
    const nextHandler = nextApp.getRequestHandler();

    server.use("/api", API);
    server.get("*", (req, res) => nextHandler(req, res));

    await nextApp.prepare();
    console.log("NEXT CUSTOM SERVER STARTED");
    server.listen(process.env.PORT);
    console.log(`${process.env.NODE_ENV} in ${process.env.PORT}`);
  }
};

start();
