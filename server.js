/* eslint-disable */
const { onRequest } = require('firebase-functions/v2/https');
const { logger } = require('firebase-functions/v2');
const next = require('next');
const parse = require('url').parse;

const dev = process.env.NODE_ENV !== 'production';

const app = next({
  dev: false,
  conf: { distDir: 'build' },
});
const nextjsHandle = app.getRequestHandler();

exports.ssrreflect = onRequest({ memory: '1GiB' }, (req, res) => {
  return app.prepare().then(() => {
    const parsedUrl = parse(req.url, true);

    return nextjsHandle(req, res, parsedUrl);
  });
});
