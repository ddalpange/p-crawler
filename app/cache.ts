import * as cheerio from "https://esm.sh/cheerio@1.0.0-rc.12";

export const cache = new Map<string, {
  html: string;
  dom: cheerio.CheerioAPI;
}>();

export const getHtml = (url: string) => {
  const result = cache.get(url);
  return result?.html;
};

export const getDom = (url: string) => {
  const result = cache.get(url);
  return result?.dom;
};
