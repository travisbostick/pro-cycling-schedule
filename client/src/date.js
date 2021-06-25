export default function dateFormat(date) {
  date = new Date(date);
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let formattedDate =
    days[date.getDay()] + ' ' + months[date.getMonth()] + ' ' + date.getDate();
  return formattedDate;
}
