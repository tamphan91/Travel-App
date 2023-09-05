const travelPlannerList = document.getElementById("travel-planner-list");
const generateBtn = document.getElementById("generate");

const getTravelPlanner = async (location, departing) => {
  const res = await fetch("http://localhost:8081/travel-planner", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ location, departing }),
  });
  const data = await res.json();
  return data;
};

const removeTrip = (id) => {
  const child = document.getElementById(id);
  travelPlannerList.removeChild(child);
};

const updateUI = (data) => {
  const {
    id,
    name,
    countryName,
    valid_date,
    daysAway,
    min_temp,
    max_temp,
    description,
    largeImageURL,
  } = data;
  const newElement = document.createElement("div");
  newElement.setAttribute("class", "travel-planner");
  newElement.setAttribute("id", id);
  newElement.innerHTML = `
  <div class="title">Travel Planner</div>
  <div class="body">
    <img
      src="${largeImageURL}"
    />
    <section>
      <p class="bold">My trip to: ${name}, ${countryName} </br> Departing : ${valid_date}</p>
      <div class="flex"><button onClick="return Client.removeTrip('${id}')">remove trip</button></div>
      <p>${name}, ${countryName} is ${
    daysAway === 0
      ? "now"
      : daysAway === 1
      ? "one day away"
      : `${daysAway} days away`
  }. </p>
      <p>
        Typical weather for then is:</br>
        Low: ${min_temp} °C, High: ${max_temp} °C</br>
        ${description}.
      </p>
    </section>
  </div>`;
  travelPlannerList.appendChild(newElement);
};

const handleSubmit = async (e) => {
  e.preventDefault();
  generateBtn.disabled = true;
  const location = e.target[0].value;
  const departing = e.target[1].value;
  try {
    const result = await getTravelPlanner(location, departing);
    if (result.data) {
      updateUI(result.data);
    } else {
      alert(result.message);
    }
  } catch (error) {
    console.error(error);
  } finally {
    generateBtn.disabled = false;
  }
};

export { handleSubmit, removeTrip, getTravelPlanner };
