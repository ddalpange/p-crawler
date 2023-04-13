import { dateToString } from "https://deno.land/x/date_format_deno@v1.1.0/mod.ts";
import { toDom } from "./toDom.ts";
import { getMetaTag } from "./getMetaTag.ts";

export const extractPublishedDate = (htmlStr?: string) => {
  if (!htmlStr) return "";
  const dateStr = getMetaTag(toDom(htmlStr), "article:published_time");
  return dateStr ? dateToString("yyyy/MM/dd", new Date(dateStr)) : "";
};
