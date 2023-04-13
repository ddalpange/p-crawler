/**
 * @param str ex: 1일전, 1시간전, 2022.12.12 2023.06.12.
 * @returns Date
 */

const dayRegexp = /일 ?전$/;
const hourRegexp = /시간 ?전$/;
const minuteRegexp = /분 ?전$/;

function isValidDate(d: any) {
  return d instanceof Date && !isNaN(d.valueOf());
}

export const rollbackRelativeFormat = (str?: string) => {
  if (!str) return undefined;
  const date = new Date();
  if (dayRegexp.test(str)) {
    const day = str.replace(dayRegexp, "").trim();
    date.setDate(date.getDate() - parseInt(day));
  } else if (hourRegexp.test(str)) {
    const hour = str.replace(hourRegexp, "").trim();
    date.setHours(date.getHours() - parseInt(hour));
  } else if (minuteRegexp.test(str)) {
    const minute = str.replace(minuteRegexp, "").trim();
    date.setMinutes(date.getMinutes() - parseInt(minute));
  } else {
    const [year, month, day] = str.split(".");
    date.setFullYear(parseInt(year));
    date.setMonth(parseInt(month) - 1);
    date.setDate(parseInt(day));
  }
  if (!isValidDate(date)) console.log(str);

  return date;
};
