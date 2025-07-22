const FormattedDate = ({ timezone }) => {
  const utcNow = Date.now();
  const offset = 5 * 60 * 60;
  const localTime = new Date(utcNow + (timezone - offset) * 1000);

  const options = { weekday: "long" };
  const weekday = localTime.toLocaleDateString("en-US", options);
  const time = localTime.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const day = localTime.getDate();
  const month = localTime.toLocaleString("en-US", { month: "long" });
  const year = localTime.getFullYear().toString().slice(-2);

  return <span className="weather__left-date">{`${time} - ${weekday}, ${day} ${month} '${year}`}</span>;
};

export default FormattedDate;
