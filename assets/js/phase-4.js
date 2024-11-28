apiKey = "3cWjRqTlEUGJklzehxPanw==XJ0qAKdWcbb2WXKK";

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("myForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const catCheckbox = document.getElementById("catCheckbox").checked;
      const historyCheckbox =
        document.getElementById("historyCheckbox").checked;
      const textBoxValue = document.getElementById("textBox").value;

      if (catCheckbox && textBoxValue) {
        fetch(`https://api.api-ninjas.com/v1/cats?name=${textBoxValue}`, {
          method: "GET",
          headers: {
            "X-Api-Key": apiKey,
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(
                "Network response was not ok " + response.statusText
              );
            }
            return response.json();
          })
          .then((result) => {
            console.log(result);
            if (result.length > 0) {
              document.getElementById("results").innerHTML = "";
              result.forEach((item, index) => {
                const formattedResult = formatResult(item, [
                  "image_link",
                  "name",
                  "origin",
                  "length",
                ]);
                const resultDiv = document.createElement("div");
                resultDiv.innerHTML = `<strong>RESULT ${
                  index + 1
                }:</strong><br><br>${formattedResult}<br>`;
                document.getElementById("results").appendChild(resultDiv);
              });
            } else {
              document.getElementById("results").innerText =
                "No results found.";
            }
          })
          .catch((error) => {
            console.error(
              "There was a problem with the fetch operation:",
              error
            );
            document.getElementById("results").innerText =
              "Error: " + error.message;
          });
      }
      if (historyCheckbox && textBoxValue) {
        fetch(
          `https://api.api-ninjas.com/v1/historicalevents?text=${textBoxValue}`,
          {
            method: "GET",
            headers: {
              "X-Api-Key": apiKey,
              "Content-Type": "application/json",
            },
          }
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error(
                "Network response was not ok " + response.statusText
              );
            }
            return response.json();
          })
          .then((result) => {
            console.log(result);
            if (result.length > 0) {
              document.getElementById("results").innerHTML = "";
              result.forEach((item, index) => {
                const formattedResult = formatResult(item, ["year", "event"]);
                const resultDiv = document.createElement("div");
                resultDiv.innerHTML = `<strong>RESULT ${
                  index + 1
                }:</strong><br><br>${formattedResult}<br>`;
                document.getElementById("results").appendChild(resultDiv);
              });
            } else {
              document.getElementById("results").innerText =
                "No results found.";
            }
          })
          .catch((error) => {
            console.error(
              "There was a problem with the fetch operation:",
              error
            );
            document.getElementById("results").innerText =
              "Error: " + error.message;
          });
      } else {
        document.getElementById("results").innerText =
          "Please select a checkbox and enter a category.";
      }
    });

  function formatResult(obj, keys) {
    let formattedResult = "";
    keys.forEach((key) => {
      if (obj.hasOwnProperty(key)) {
        if (key === "image_link") {
          formattedResult += `<img src="${obj[key]}" alt="Cat Image" class="image"><br>`;
        } else {
          formattedResult += `<strong>${
            key.charAt(0).toUpperCase() + key.slice(1)
          }:</strong> ${obj[key]}<br>`;
        }
      }
    });
    return formattedResult;
  }
});
