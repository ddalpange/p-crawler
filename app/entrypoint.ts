import { Post } from "./Post.ts";
import { dateToString } from "https://deno.land/x/date_format_deno@v1.1.0/mod.ts";
import { fetchHtml } from "./fetchHtml.ts";
import { extractKoreanAuthor } from "./extractKoreanAuthor.ts";
import { getNaverLink } from "./getNaverLink.ts";
import { getDom, getHtml } from "./cache.ts";
import { rollbackRelativeFormat } from "./rollbackRelativeFormat.ts";
import { convertPostsToTSV } from "./convertPostsToTSV.ts";
import { slack } from "./slack.ts";

const scrapNaver = async (url: string) => {
  await fetchHtml(url);
  const posts: Post[] = [];
  const $ = getDom(url)!;
  const list = $(".list_news").find("> li");
  for (const item of list) {
    const title = $(item).find(".news_area .news_tit").text();
    const link = $(item).find(".news_area .news_tit").attr("href") ?? "";
    const company = $(item).find(".info.press").text().replace(
      "언론사 선정",
      "",
    );
    const date = rollbackRelativeFormat($(item).find("span.info:last").text());
    try {
      if (link) await fetchHtml(link);
    } catch (e) {
      console.warn(e);
    }
    const postHtml = getHtml(link);
    posts.push({
      title,
      company,
      link,
      author: extractKoreanAuthor(postHtml),
      date: dateToString("yyyy/MM/dd", date),
    });
  }

  return posts;
};

const searchNaver = async (query: string) => {
  const posts = [
    ...(await scrapNaver(getNaverLink(query, 0))),
    ...(await scrapNaver(getNaverLink(query, 1))),
    ...(await scrapNaver(getNaverLink(query, 2))),
    ...(await scrapNaver(getNaverLink(query, 3))),
    ...(await scrapNaver(getNaverLink(query, 4))),
    ...(await scrapNaver(getNaverLink(query, 5))),
  ].filter((post) => post.title.includes(query));
  const content = convertPostsToTSV(posts);

  // helped by https://api.slack.com/methods/files.upload
  await slack.files.upload({
    channels: "test-slackbot",
    filename: `${dateToString("yyyy-MM-dd")} ${query}.tsv`,
    content: content,
  });
};

await searchNaver("강북삼성병원");
