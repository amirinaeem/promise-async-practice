const singleNumber = 5;
const baseURL = "http://numbersapi.com";
const multipleNumbers = [1, 2, 3, 4, 5];
const numberOfFacts = 5; // How many facts to request for each number

/* --------Global Functions --------*/

// Function to make HTTP requests to get number facts
function getNumberFact(url, callback) {
  const httpRequest = new XMLHttpRequest();
  httpRequest.open("GET", url);
  httpRequest.onload = function () {
    if (httpRequest.status === 200) {
      const data = JSON.parse(httpRequest.responseText);
      callback(null, data);
    } else {
      callback(
        new Error(`Error ${httpRequest.status}: ${httpRequest.statusText}`)
      );
    }
  };
  httpRequest.onerror = function () {
    callback(new Error("Network Error"));
  };
  httpRequest.send();
}

// Helper callback function for handling requests
const callback = (err, data) => {
  if (err) {
    console.error(err);
  } else {
    console.log(data.text);
  }
};

/*-------------- Single Request ---------------*/

const requestForSingleNum = () => {
  console.log("Request for single number:");
  getNumberFact(`${baseURL}/${singleNumber}?json`, callback);
};

/*-------------- Multiple Requests ---------------*/

const requestForMultiNum = () => {
  console.log("Request for multiple numbers:");
  multipleNumbers.forEach((num) => {
    getNumberFact(`${baseURL}/${num}?json`, callback);
  });
};

/*---------- Request Multiple Facts for the Same Number -------------*/
const reqstMultiFactForSamNum = (numberOfFacts, number, factsArr = []) => {
  console.log(`Requesting ${numberOfFacts} facts for number: ${number}`);

  getNumberFact(`${baseURL}/${number}?json`, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      factsArr.push(`The number ${number} is a ${data.text}`);

      // Stop when we've collected enough facts
      if (factsArr.length === numberOfFacts) {
        console.log(`Facts for ${number}:`, factsArr);
      } else {
        // Continue fetching facts recursively
        reqstMultiFactForSamNum(numberOfFacts, number, factsArr);
      }
    }
  });
};

/*---------- Request Multiple Facts for Different Numbers -------------*/
const reqstMultiFactForDiffNum = (numberOfFacts, multipleNumbers) => {
  console.log("Requesting multiple facts for different numbers...");

  multipleNumbers.forEach((num) => {
    const factsArrForThisNum = [];
    reqstMultiFactForSamNum(numberOfFacts, num, factsArrForThisNum);
  });
};

// Example function calls
//requestForSingleNum();  // Uncomment to test single number request
//requestForMultiNum();   // Uncomment to test multiple numbers request
//reqstMultiFactForSamNum(numberOfFacts, singleNumber);  // Request multiple facts for the same number
//reqstMultiFactForDiffNum(numberOfFacts, multipleNumbers);  // Request multiple facts for different numbers
