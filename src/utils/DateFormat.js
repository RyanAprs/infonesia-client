export const DateFormat = (isoString) => {
  const date = new Date(isoString);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    // hour: "2-digit",
    // minute: "2-digit",
    timeZone: "Asia/Jakarta",
  };

  return date.toLocaleString("id-ID", options);
};
