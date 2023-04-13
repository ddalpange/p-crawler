export const extractKoreanAuthor = (htmlStr?: string) => {
  const authorRegex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+ 기자/;
  return htmlStr?.match(authorRegex)?.map((item) => item.replace(" 기자", ""))
    ?.join(
      ", ",
    ) ?? "";
};
