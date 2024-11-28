/* eslint-disable */
const { onRequest } = require("firebase-functions/v2/https");
const { logger } = require("firebase-functions/v2");
const next = require("next");
const parse = require("url").parse;

const dev = process.env.NODE_ENV !== "production";

const appMain = next({
  dev: false,
  conf: { distDir: "build-main" }, // Main branch için build dizini
});
const appRelease = next({
  dev: false,
  conf: { distDir: "build-release" }, // Release branch için build dizini
});

const nextjsHandleMain = appMain.getRequestHandler();
const nextjsHandleRelease = appRelease.getRequestHandler();

// SSR Function for Main branch
exports.ssrMain = onRequest({ memory: "1GiB" }, (req, res) => {
  return appMain.prepare().then(() => {
    const parsedUrl = parse(req.url, true);
    return nextjsHandleMain(req, res, parsedUrl);
  });
});

// SSR Function for Release branch
exports.ssrRelease = onRequest({ memory: "1GiB" }, (req, res) => {
  return appRelease.prepare().then(() => {
    const parsedUrl = parse(req.url, true);
    return nextjsHandleRelease(req, res, parsedUrl);
  });
});
