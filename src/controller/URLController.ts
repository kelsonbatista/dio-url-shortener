import { Request, Response } from 'express';
import { config } from '../config/Constants';
import shortid from 'shortid';
import { URLModel } from '../database/model/URL';

export class URLController {

  public async shorten(req: Request, res: Response): Promise<void> {
    // verificar se a url nao existe
    const { originURL } = req.body;
    const url = await URLModel.findOne({ originURL });
    if(url) {
      res.json(url);
      return
    }
    // criar a hash para a url
    const hash = shortid.generate();
    const shortURL = `${config.API_URL}/${hash}`;
    const newURL = await URLModel.create({ originURL, hash, shortURL });
    // salvar a a url no banco
    // retornar a url salva
    res.json(newURL);
  }

  public async redirect(req: Request, res: Response): Promise<void> {
    // pegar o hash da URL
    const { hash } = req.params;
    // encontrar a URL original pelo hash
    const url = await URLModel.findOne({ hash });

    if(url) {
      res.redirect(url.originURL);
      return
    }
    // const url = {
    //   "originURL": "https://g1.globo.com/rj/rio-de-janeiro/carnaval/2022/noticia/2022/04/24/princesa-da-tuiuti-nega-que-tenha-ficado-com-genitalia-desnuda-na-sapucai-calcinha-marrom.ghtml",
    //   "hash": "rdK15_3gt",
    //   "shortURL": "http://localhost:3001/rdK15_3gt"
    // }
    // redirecionar para a URL original a partir do que foi encontrado no banco
    res.status(404).json({ message: "URL not found!" });
  }
}
