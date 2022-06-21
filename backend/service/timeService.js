const getCurrentTime = () => {
  let time;
  const date = new Date();
  const day = date.getDate().toString();
  const month = (date.getMonth() + 1).toString();
  const year = date.getFullYear().toString();

  let currentDate = day + '.' + month + '.' + year;

  const hours = date.getHours().toString();
  const minutes = date.getMinutes().toString();

  let currentTime = hours + ':' + minutes;

  time = currentDate + ' at ' + currentTime;
  return time;
};

export default getCurrentTime;
