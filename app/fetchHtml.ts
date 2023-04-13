import { cache } from "./cache.ts";
import { toDom } from "./toDom.ts";

export const fetchHtml = async (url: string) => {
  const response = await fetch(
    url,
  );
  const html = await response.text();
  const $ = toDom(html);
  cache.set(url, {
    html,
    dom: $,
  });
  return html;
};
