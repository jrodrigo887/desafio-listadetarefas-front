const express = require('express');
const path = require('path');
const nameApp = process.env.npm_package_name;

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(`${__dirname}/dist/app-todo`) );

app.get('/*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/dist/app-todo/index.html`));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: ${PORT}`);
});
