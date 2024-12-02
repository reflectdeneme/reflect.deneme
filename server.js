/* eslint-disable */
const { onRequest } = require("firebase-functions/v2/https");
const next = require("next");
const parse = require("url").parse;

const appMain = next({
  dev: false, // Development modu kapalı
  conf: { distDir: "build" },
});

const appRelease = next({
  dev: false, // Production modu
  conf: { distDir: "build" },
});

const nextjsHandleMain = appMain.getRequestHandler();
const nextjsHandleRelease = appRelease.getRequestHandler();

exports.ssrMain = onRequest({ memory: "1GiB" }, async (req, res) => {
  await appMain.prepare();
  const parsedUrl = parse(req.url, true);
  nextjsHandleMain(req, res, parsedUrl);
});

exports.ssrreflect = onRequest({ memory: "1GiB" }, async (req, res) => {
  await appRelease.prepare();
  const parsedUrl = parse(req.url, true);
  nextjsHandleRelease(req, res, parsedUrl);
});
