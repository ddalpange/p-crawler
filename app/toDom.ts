import * as cheerio from "https://esm.sh/cheerio@1.0.0-rc.12";

export const toDom = (htmlStr: string) => cheerio.load(htmlStr);
