const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

function getDaysBetweenDates(d0, d1) {
  var msPerDay = 8.64e7;

  // Copy dates so don't mess them up
  var x0 = new Date(d0);
  var x1 = new Date(d1);

  // Set to noon - avoid DST errors
  x0.setHours(12, 0, 0);
  x1.setHours(12, 0, 0);

  // Round to remove daylight saving errors
  return Math.round((x1 - x0) / msPerDay);
}

async function fetchData(url, method = 'GET') {
  console.log('url', url);
  const resData = await fetch(url, { method });
  return await resData.json();
}

module.exports = { getDaysBetweenDates, fetchData };
