const http = require('http');

const PORT = 1338;

const USERS = [
  { id: 1, name: 'Alice', role: 'admin' },
  { id: 2, name: 'Bob', role: 'viewer' },
];

function json(res, status, body) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(body));
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const method = req.method;
  const path = url.pathname;

  if (method === 'GET' && path === '/ping') {
    return json(res, 200, { message: 'pong' });
  }

  if (method === 'GET' && path === '/users') {
    return json(res, 200, USERS);
  }

  if (method === 'GET' && path.startsWith('/users/')) {
    const id = Number(path.split('/')[2]);
    const user = USERS.find((u) => u.id === id);
    return user ? json(res, 200, user) : json(res, 404, { error: 'Not found' });
  }

  if (method === 'POST' && path === '/echo') {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => {
      try {
        return json(res, 200, JSON.parse(body));
      } catch {
        return json(res, 400, { error: 'Invalid JSON' });
      }
    });
    return;
  }

  json(res, 404, { error: 'Not found' });
});

server.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`);
});
