"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.URLController = void 0;
const Constants_1 = require("../config/Constants");
const shortid_1 = __importDefault(require("shortid"));
const URL_1 = require("../database/model/URL");
class URLController {
    shorten(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { originURL } = req.body;
            const url = yield URL_1.URLModel.findOne({ originURL });
            if (url) {
                res.json(url);
                return;
            }
            const hash = shortid_1.default.generate();
            const shortURL = `${Constants_1.config.API_URL}/${hash}`;
            const newURL = yield URL_1.URLModel.create({ originURL, hash, shortURL });
            res.json(newURL);
        });
    }
    redirect(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { hash } = req.params;
            const url = {
                "originURL": "https://g1.globo.com/rj/rio-de-janeiro/carnaval/2022/noticia/2022/04/24/princesa-da-tuiuti-nega-que-tenha-ficado-com-genitalia-desnuda-na-sapucai-calcinha-marrom.ghtml",
                "hash": "rdK15_3gt",
                "shortURL": "http://localhost:3001/rdK15_3gt"
            };
            res.redirect(url.originURL);
        });
    }
}
exports.URLController = URLController;
//# sourceMappingURL=URLController.js.map