const app = require('./src/app');

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`People and Math app running on http://localhost:${port}`);
});
