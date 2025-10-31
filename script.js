console.clear();

const form = document.getElementById("voteForm");
const loadingMessage = document.getElementById("loadingMessage");
const responseMessage = document.getElementById("responseMessage");
const pumpkins = document.getElementById("pumpkinId");

let myChoice = 0; // declare this locally?

const choices = document.getElementById("pumpkinId");

form.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent the default form submission

  // loadingMessage.style.display = 'block'; // Show loading message
  // responseMessage.textContent = ''; // Clear previous response message

  // local storage, key + values
  if (localStorage.getItem("hasVoted")) {
    // get their choice that they already submitted
    myChoice = localStorage.getItem("choice");

    Swal.fire({
      title: "Oops!",
      text: `A vote was already submitted.\nYou selected pumpkin ${myChoice}.`,
      icon: "error",
      confirmButtonText: "Ok"
    });
    return; // Stop submission if they already voted
  }

  fetch(form.action, {
    method: "POST",
    body: new FormData(form)
  }).then((response) => {
    Swal.fire({
      title: "Thank you!",
      text: `You voted for pumpkin ${
        pumpkins.options[pumpkinId.selectedIndex].value
      } ☺︎`,
      icon: "success",
      confirmButtonText: "Ok"
    });
    // Mark the user as having voted
    localStorage.setItem("hasVoted", true);
    localStorage.setItem("choice", choices.value);
    form.reset();
  });

  // .then(data => {
  //     responseMessage.textContent = 'Vote submitted successfully!';
  //     form.reset(); // Reset the form
  // })
  // .catch(error => {
  //     console.error('Error:', error);
  //     responseMessage.textContent = 'There was an error submitting your vote. Please try again.';
  // })
  // .finally(() => {
  //     loadingMessage.style.display = 'none'; // Hide loading message
  // });
});

const nextBtn = document.getElementById("next");

let current = 0;

const setImg = () => {
  document.getElementById(
    "pumpkinImg"
  ).src = `https://assets.codepen.io/4671541/${current + 1}.jpg?`;
  nextBtn.innerText = `Tap to see next (${current + 1}/14)`;
};

document.getElementById("pumpkinImg").addEventListener("click", () => {
  if (current == 13) {
    current = 0;
  } else {
    current++;
  }
  setImg();
});
//ik this is redundant asf !! let me live and learn.
nextBtn.addEventListener("click", () => {
  if (current == 13) {
    current = 0;
  } else {
    current++;
  }
  setImg();
});

pumpkins.addEventListener("change", (e) => {
  let selected = parseInt(pumpkins.options[pumpkinId.selectedIndex].value) - 1;
  console.log(selected);
  current = selected;
  setImg();
});

// image carousel

// i tried bro

// Global variables
// const SLIDES = document.querySelectorAll(".slide");
// const NEXT = document.querySelector("#next");
// const PREV = document.querySelector("#prev");

// let count = 0;

// // Transition function that makes it slide
// const TRANSITION = () => {
//   if (count == SLIDES.length) {
//     count = 0;
//   } else if (count < 0) {
//     count = SLIDES.length - 1;
//   }
//   SLIDES.forEach((slide) => {
//     slide.style.transform = `translateX(-${count * 110}%)`;
//   });
// };

// // Puts the slides in the right positions
// SLIDES.forEach((slide, index) => {
//   slide.style.left = `${index * 110}%`;
// });

// // Move forward or backward in the slide (next and previous buttons)
// NEXT.addEventListener("click", () => {
//   count++;
//   TRANSITION();
// });
// PREV.addEventListener("click", () => {
//   count--;
//   TRANSITION();
// });

// document.getElementById('voteForm').addEventListener('submit', function(event) {
//     event.preventDefault();
//     const pumpkinId = event.target.pumpkinId.value;
//     const studentId = 'uniqueStudentId'; // Ensure to use a unique identifier for each student

//     // Send vote to Google Sheets API
//     fetch('https://sheetdb.io/api/v1/lh84cc9tcwqsb', {
//         method: 'POST',
//         body: JSON.stringify({ studentId, pumpkinId }),
//         headers: { 'Content-Type': 'application/json' }
//     }).then(response => {
//         // Handle response
//         alert('Vote submitted!');
//     });
// });

// function countVotes() {
//     const votesSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Votes');
//     const countsSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Counts');

//     const votesData = votesSheet.getDataRange().getValues();
//     const counts = {};

//     // Iterate over votes and count them
//     for (let i = 1; i < votesData.length; i++) { // Start from 1 to skip header
//         const pumpkinId = votesData[i][2]; // Column C for Pumpkin ID
//         counts[pumpkinId] = (counts[pumpkinId] || 0) + 1;
//     }

//     // Clear previous counts
//     countsSheet.getRange('B2:B').clear();

//     // Update counts
//     for (let j = 0; j < countsSheet.getLastRow() - 1; j++) {
//         const pumpkinId = countsSheet.getRange(j + 2, 1).getValue(); // Column A for Pumpkin ID
//         if (counts[pumpkinId]) {
//             countsSheet.getRange(j + 2, 2).setValue(counts[pumpkinId]); // Column B for Vote Count
//         }
//     }
// }

// let form = document.getElementById('voteForm');
//   form.addEventListener("submit", e => {
//     e.preventDefault();
//     fetch(form.action, {
//         method : "POST",
//         body: new FormData(document.getElementById("voteForm")),
//     }).then(
//         response => response.json()
//     ).then((html) => {
//       // you can put any JS code here
//       alert('success')
//     });
//   });

//https://sheetdb.io/api/v1/lh84cc9tcwqsb

// fetch('https://sheetdb.io/api/v1/lh84cc9tcwqsb')
//     .then(response => response.json())
//     .then(data => {
//         const countsDiv = document.getElementById('counts');
//         data.forEach(item => {
//             countsDiv.innerHTML += `<p>Pumpkin ${item['Pumpkin ID']}: ${item['Vote Count']} votes</p>`;
//         });
//     })
//     .catch(error => {
//         console.error('Error fetching counts:', error);
//     });