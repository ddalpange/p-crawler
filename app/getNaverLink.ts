export const getNaverLink = (query: string, pageIndex?: number) => {
  const result =
    "https://search.naver.com/search.naver?&where=news&sm=tab_opt&sort=1&photo=0&field=0&pd=0&ds=&de=&docid=&related=0&mynews=0&office_type=0&office_section_code=0&news_office_checked=&nso=so%3Add%2Cp%3Aall&is_sug_officeid=0&query=" +
    encodeURI(query);
  return pageIndex ? result + "&start=" + (pageIndex * 10 + 1) : result;
};
