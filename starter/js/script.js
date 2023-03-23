// A global variable which we pass into every function that needs it to keep
// them more pure.
const ROOT_URL = "http://localhost:3000/";

const sendRequest = async (method, root_url, url_part = "", body = false) => {
  // In geval een "GET" method gebruikt wordt, stuur dan geen 'body' of 'headers'
  let response;
  if (method != "GET") {
    response = await fetch(root_url + url_part, {
      method: method,
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    });
  } else {
    response = await fetch(root_url + url_part, {
      method: method,
    });
    // console.log(root_url + url_part + method);
  }

  // Server response handling
  let result;

  switch (response.status) {
    case 200:
    case 201:
      result = await response.json();
      break;

    default:
      console.log(`The backend responded with ${response.status}`);
      result = undefined;
      break;
  }

  return result;
};

const showReservations = async (root_url) => {
  let reservations = await sendRequest("GET", root_url, "reservations");

  // Only show reservations in 2024 to make it easier to see the reservations
  // we care about.
  reservations = reservations.filter((r) => r.date.includes("2024"));
  console.table(reservations);
};

///////////////////////////////////////////////////////////////////////////////
// Show all reservations
await showReservations(ROOT_URL);

///////////////////////////////////////////////////////////////////////////////
// Create a new reservation.
const reservationOne = await sendRequest({
  root_url: ROOT_URL,
  method: "POST",
  url_part: "reservations",
  body: {
    name: "Yayoi Kusama",
    people: 3,
    date: "05/05/2024",
    time: "20:00",
  },
});

//idCheckOne = reservationOne.id;
//console.log(idCheckOne);

//////////////////////////////////////////////////////////////////////////////
// Create another new reservation.

///////////////////////////////////////////////////////////////////////////////
// Update Yayoi Kusama's reservation using PUT.

///////////////////////////////////////////////////////////////////////////////
// Update Shirin's reservation using PATCH.
