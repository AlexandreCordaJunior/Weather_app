console.log("Client-side javascript is loaded");

// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     });
// });

function apiCall(address) {
    messageOne.textContent = "Loading ...";
    messageTwo.textContent = "";
    fetch("/weather?address=" + address).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        });
    });
}

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#messageOne");
const messageTwo = document.querySelector("#messageTwo");

weatherForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const location = search.value;

    apiCall(location);
});