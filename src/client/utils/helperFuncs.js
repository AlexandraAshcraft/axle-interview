export function cleanTime(date) {
  const newDate = new Date();
  const dateStr = newDate.toDateString().split(' ').slice(1, 3).join(' ');
  const time = newDate.toLocaleTimeString();
  return dateStr + ' ' + time;
}

export function monthDayYear(date) {
  console.log(date);
  const year = date.slice(0, 4);
  const month = date.slice(5, 7);
  const day = date.slice(8);

  return `${month}-${day}-${year}`;
}

export function getCurrentWeekRange() {
  let curr = new Date();
  let week = [];

  for (let i = 0; i < 7; i++) {
    let first = curr.getDate() - curr.getDay() + i;
    let day = new Date(curr.setDate(first)).toISOString().slice(0, 10);
    week.push(monthDayYear(day));
  }
  return week;
}
