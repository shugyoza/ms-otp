import http from 'http';

const { responseStatus } = require('./constants/response-status.constant');

// middleware

export function checkApiKey(req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>, key = 'x-api-key') {
  const fetchedApiKeyFromDb = 'blah';
  
  if (!(key in req.headers)) {
    res.writeHead(responseStatus.unAuthorized, 'Missing API Key.');
    res.end();

    return false;
  }

  // check if key format is valid, 

  if (req.headers[key] !== fetchedApiKeyFromDb) {
    res.writeHead(responseStatus.forbidden, 'Wrong API Key.');
    // We don't want to expose to hacker that this is the correct resource, yet wrong API Key.
    res.writeHead(responseStatus.notFound, 'Resource not found'); 
    res.end();

    return false;
  }

  return true;
}

export function isListening(_req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>, message = '') {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(message);
}
