import http from 'http';
import { createServer } from 'node:http';

import { isListening } from  './utils';
import { createKeyForCipher, CipherAlgorithm, Cipher } from './cipher';
import { time } from './constants.ts/time.constant';

const hostname = '127.0.0.1';
const port = process.env.PORT ? +process.env.PORT : 3000;
const message = `Server is listening at http://${hostname}:${port}`;
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'OPTIONS, POST, GET, PUT, PATCH, DELETE, HEAD',
  'Access-Control-Max-Age': 30 * time.day * time.hour * time.minute * time.second
}

const server = createServer((req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>) => {
  const { method, url } = req;

  if (!method || !url) return;
  console.log({ method, url });

  // const validRequest = checkApiKey(req, res, 'x-api-key');
  // if (!validRequest) return;

  if (method === 'GET' && url === '/api/otp') {
    const header = { 'Content-Type': 'application/json'};

    const now = Date.parse(new Date().toString());
    const digits = 6;
    const code = ('' + now).slice(0, digits);

    const algorithm: CipherAlgorithm = 'aes-128-gcm';
    const numBytes = 128 / 8;
    const numAuthTagBytes = 16;
    const key = createKeyForCipher(algorithm, numBytes);
    const cipher = new Cipher(key, algorithm, numAuthTagBytes);
    const encrypted = cipher.encrypt('' + now);

    const body = JSON.stringify({
      code,
      pass_key: encrypted
    })
    res.writeHead(200, header);
    res.write(body);
    res.end();

    return;
  }

  // handle preflight call
  if (method === 'OPTIONS') {
    res.writeHead(204, headers);
    res.end();

    return;
  }

  if (method === 'GET' && url.match(/^(\/)$/)) {
    
    return isListening(req, res, message);
  };
});

server.listen(port, hostname, undefined, () => console.log(message));
