/* eslint-disable */
const { onRequest } = require("firebase-functions/v2/https");
const { logger } = require("firebase-functions/v2");
const next = require("next");
const parse = require("url").parse;

const dev = process.env.NODE_ENV !== "production";

const appRelease = next({
  dev: false,
  conf: { distDir: "build" },
});

const nextjsHandleRelease = appRelease.getRequestHandler();

exports.ssrreflect = onRequest({ memory: "1GiB" }, (req, res) => {
  return appRelease.prepare().then(() => {
    const parsedUrl = parse(req.url, true);
    return nextjsHandleRelease(req, res, parsedUrl);
  });
});
