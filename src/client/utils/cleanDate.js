export function cleanTime(date) {
    const newDate = new Date();
    const dateStr = newDate.toDateString().split(' ').slice(1, 3).join(' ');
    const time = newDate.toLocaleTimeString();
    return dateStr + ' ' + time;
  }