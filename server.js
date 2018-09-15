const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const PORT = 3000;

app.prepare()
  .then(() => {
    const server = express();

    server.get('/post/:id', (req, res) => {
      const actualPage = '/post';
      const queryParams = {
        id: req.params.id
      };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(PORT, (err) => {
      if (err)
        throw err;

      console.log(`server is ready on http://localhost:${PORT}`)
    });
  }).catch((error) => {
    console.error('error: ', error);
    process.exit(1);
  });