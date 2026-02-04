const express = require('express');
const serverless = require('serverless-http');
const userRoutes = require('./routes/user.routes');

const app = express();

app.use(express.json());
app.use('/', userRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'OK' , message:"you are checking health"});
});

if (process.env.IS_OFFLINE || process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports.handler = serverless(app);
