import express from 'express';
import cors from 'cors';
import routes from './routes/api.js';

const app = express();
app.use(cors());
app.use('/', routes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

const PORT = process.env.PORT || 3001;

app.listen(PORT, console.log('Server started!'));
