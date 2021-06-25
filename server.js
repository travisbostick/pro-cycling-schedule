import express from 'express';
import cors from 'cors';
import path from 'path';
import routes from './routes/api.js';

const app = express();
app.use(cors());
app.use('/', routes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// if (!dev) {
//   app.use(express.static(path.resolve(__dirname, 'build')));
//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
//   });
// }

const PORT = process.env.PORT || 3001;

app.listen(PORT, console.log('Server started!'));
