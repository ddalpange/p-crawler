import { Post } from "./Post.ts";

export const convertPostsToTSV = (posts: Post[]) => {
  const rows = [
    "제목\t회사\tLink\t기자\t날짜",
    ...posts.map((post) =>
      post.title + "\t" + post.company + "\t" + post.link + "\t" +
      post.author + "\t" +
      post.date
    ),
  ];
  return rows.join("\n");
};
