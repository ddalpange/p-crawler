import * as cheerio from "https://esm.sh/cheerio@1.0.0-rc.12";

export const getMetaTag = ($: cheerio.CheerioAPI, name: string) => {
  return $("meta[property=" + name + "]").attr("content");
};
