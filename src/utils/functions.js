

function convertToDayMonthYear(dat) {
    const date = new Date(dat);
    const currentDate = new Date();

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();

    if (
      date.getDate() === currentDate.getDate() &&
      date.getMonth() === currentDate.getMonth() &&
      date.getFullYear() === currentDate.getFullYear()
    ) {
      // Calculate the difference in hours
      const diffInMs = currentDate.getTime() - date.getTime();
      const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

      if (diffInHours === 0) {
        return "now";
      } else {
        return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
      }
    }

    return `${day}/${month}/${year}`;
  }


  function formatTimeAndDate(dat) {
    const date = new Date(dat);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
  
    return `${hours}:${minutes} - ${day}/${month}/${year}`;
  }
  function formatTimeByUTC(dat) {
    const utcOffset = -new Date().getTimezoneOffset() * 60000;
    const date = new Date(dat);
    const formattedDate = new Date(date.getTime() + utcOffset);
    const hours = formattedDate.getUTCHours().toString().padStart(2, '0');
    const minutes = formattedDate.getUTCMinutes().toString().padStart(2, '0');
    const day = formattedDate.getUTCDate().toString().padStart(2, '0');
    const month = (formattedDate.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = formattedDate.getUTCFullYear().toString();
  
    return `${hours}:${minutes} - ${day}/${month}/${year}`;
  }
  

  function getDay(dat){
    const date = new Date(dat);
    const day = date.getDay();
    return day;
  }

  const HelpFunctions = {convertToDayMonthYear,formatTimeAndDate, getDay, formatTimeByUTC};

  export default HelpFunctions;