import { URLController } from './controller/URLController';
import express, { Request, Response } from 'express';
import { MongoConnection } from './database/MongoConnection';
const port = 3001;
const api = express();

api.use(express.json());

const database = new MongoConnection();
database.connect();

const urlController = new URLController();
api.post('/shorten', urlController.shorten);
api.get('/:hash', urlController.redirect);

api.get('/test', (req, res) => {
  return res.status(200).json({ message: "Api successfully configurated" });
})

api.listen(port, () => console.log(`Api running at port ${port}`));
