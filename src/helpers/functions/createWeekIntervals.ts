export const weekIntervals = (startMonth: string, endMonth: string) => {
  if (startMonth && endMonth) {
    const currentMonthDates = (start: Date, end: Date) => {
      const result = [];
      while (start <= end) {
        result.push(new Date(String(start)));
        start.setDate(start.getDate() + 1);
      }
      return result;
    };
    const weekArray = [];

    const firstDayNumber =
      currentMonthDates(new Date(startMonth), new Date(endMonth))[0].getDay() -
      1;
    currentMonthDates(new Date(startMonth), new Date(endMonth))[0].getDay() - 1;

    const dataShift = firstDayNumber >= 0 ? 7 - firstDayNumber : 1;

    const firstWeek = currentMonthDates(
      new Date(startMonth),
      new Date(endMonth)
    ).splice(0, dataShift);
    weekArray.push(firstWeek);
    const lastPartMonth = currentMonthDates(
      new Date(startMonth),
      new Date(endMonth)
    ).splice(
      dataShift,
      currentMonthDates(new Date(startMonth), new Date(endMonth)).length
    );
    for (let i = 0; i <= 3; i += 1) {
      weekArray.push(lastPartMonth.splice(0, 7));
    }
    return weekArray;
  } else return "";
};
