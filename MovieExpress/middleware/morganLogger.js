const morgan = require('morgan');

// Add a custom token to log response headers
morgan.token('res-headers', (req, res) => {
  const headers = {};
  res.getHeaderNames().forEach((name) => {
    headers[name] = res.getHeader(name);
  });
  return JSON.stringify(headers);
});

// Add a custom token to log the response body
morgan.token('response-body', (req, res) => {
    if (res.statusCode === 404) {
        return '404 Not Found'; // Log something simpler for 404 responses
      }
      if (res.locals.responseBody) {
        // Limit the body size if it's too large
        const body = res.locals.responseBody;
        return body.length > 200 ? body.substring(0, 200) + '...' : body; // Truncate large bodies
      }
    return 'No Response Body';
  });

function captureResponseBody(req, res, next) {
const originalSend = res.send;
res.send = function (body) {
    res.locals.responseBody = body;
    return originalSend.apply(this, arguments);
};
next();
}

// Define a custom format for logging
morgan.format('minimal', ':method :url :status :response-time ms- Response: :response-body');

module.exports = {
    morganMiddleware: morgan('minimal'),
    captureResponseBody,
};