let music = new Audio("music.mp3");
let audioTurn = new Audio("ting.mp3");
let gameover = new Audio("gameover.mp3");
let turn = "X";
let isGameover = false;
const reset = document.getElementById("reset");
const boxes = document.getElementsByClassName("box");
let resetBoxtext = document.getElementsByClassName("boxtext");

// Function to change the turn
const changeTurn = () => {
  return turn === "X" ? "0" : "X";
};

// Function to check for a win
const checkWin = () => {
  let boxtexts = document.getElementsByClassName("boxtext");
  console.log(boxtexts);
  const wins = [
    [0, 1, 2, 5, 5, 0],
    [3, 4, 5, 5, 15, 0],
    [6, 7, 8, 5, 25, 0],
    [0, 3, 6, -5, 15, 90],
    [1, 4, 7, 5, 15, 90],
    [2, 5, 8, 15, 15, 90],
    [0, 4, 8, 5, 15, 45],
    [2, 4, 6, 5, 15, 135],
  ];
  wins.forEach((e) => {
    if (
      boxtexts[e[0]].innerText === boxtexts[e[1]].innerText &&
      boxtexts[e[1]].innerText === boxtexts[e[2]].innerText &&
      boxtexts[e[0]].innerText !== ""
    ) {
      document.querySelector(".info").innerText = `${
        boxtexts[e[0]].innerText
      } Won`;
      isGameover = true;
      document
        .querySelector(".imgBox")
        .getElementsByTagName("img")[0].style.width = "200px";
      document.querySelector(
        ".line"
      ).style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
      document.querySelector(".line").style.width = "20vw";
    }
  });
};

// Game Logic
Array.from(boxes).forEach((element) => {
  element.addEventListener("click", (e) => {
    e.preventDefault();
    let boxtext = element.querySelector(".boxtext");
    if (boxtext.innerText === "") {
      boxtext.innerText = turn;
      turn = changeTurn();
      audioTurn.play();
      checkWin();
      if (!isGameover) {
        document.getElementsByClassName(
          "info"
        )[0].innerText = `Turn for ${turn}`;
      }
    }
  });
});

// Add onclick listener to reset button
reset.addEventListener("click", (e) => {
  e.preventDefault();
  Array.from(resetBoxtext).forEach((e) => (e.innerText = ""));
  document.querySelector(".imgBox").getElementsByTagName("img")[0].style.width =
    "0px";
  turn = "X";
  document.getElementsByClassName("info")[0].innerText = `Turn for ${turn}`;
  document.querySelector(".line").style.width = "0vw";
  isGameover = false;
});
