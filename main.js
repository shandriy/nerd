"use strict";

window.addEventListener("load", function() {
  let rows = 5;
  const words = [
    "antidisestablishmentarianisms",
    "cyclotrimethylenetrinitramine",
    "floccinaucinihilipilification",
    "trinitrophenylmethylnitramine",
    "hexakosioihexekontahexaphobic",
    "hexakosioihexekontahexaphobes",
    "quinquagintaquadringentillion",
    "octylphenoxypolyethoxyethanol",
    "quinquagintatrecentilliardths",
    "polytetrafluorchloroethylenes",
    "tetraphenylcyclopentadienones",
    "hexakosioihexekontahexaphobia",
    "pyrrolidinomethyltetracycline",
    "methylenedioxymethamphetamine",
    "acetylglucosaminyltransferase",
    "acetylmannosaminyltransferase",
    "acylphosphatidylethanolamines",
    "alkylacetylglycerophosphatase",
    "aminocyclopropanecarboxylates",
    "antidisestablishmentarianists",
    "benzyltetrahydroisoquinolines",
    "bromoacetylalprenololmenthane",
    "cholangiopancreatographically",
    "dehydroepiandrosteronesulfate",
    "diisopropylfluorophosphatases",
    "dimethylallyltranstransferase",
    "distearoylphosphatidylcholine",
    "dodecamethylcyclohexasiloxane",
    "floccinaucinihilipilificating",
    "gastropancreaticoduodenectomy",
    "glycerophosphonoethanolamines",
    "glycosylphosphatidylinositols",
    "hepatopancreatoduodenectomies",
    "hexachlorocyclotriphosphazene",
    "hydroxypropylmethylcelluloses",
    "lysophosphatidylethanolamines",
    "mannosylphosphoryltransferase",
    "methylenedioxyphenethylamines",
    "monogalactosyldiacylglycerols",
    "oesophagogastroduodenoscopies",
    "paradimethylaminobenzaldehyde",
    "perfluorodecyltrichlorosilane",
    "phenylmethanesulfonylfluoride",
    "psychopharmacotherapeutically",
    "stereoelectroencephalographic",
    "sulfoquinovosyldiacylglycerol",
    "trihydroxymethylanthraquinone"
  ];
  const length = words.length;
  if (rows > length) {
    rows = length;
  };
  let date = new Date();
  const letters = words[0].length;
  const boxes = document.getElementById("boxes");
  const chosenWord = words[(date.getDate() + date.getDay() + date.getFullYear() + date.getMonth()) % length].toString().toUpperCase();
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const qwerty = "QWERTYUIOPASDFGHJKLZXCVBNM";
  for (let i = 0; i < rows; i++) {
    const line = document.createElement("div");
    line.setAttribute("class", "line");
    for (let j = 0; j < letters; j++) {
      const box = document.createElement("div");
      const div = document.createElement("div");
      box.setAttribute("class", "box");
      div.setAttribute("class", "size_box");
      div.appendChild(box);
      line.appendChild(div);
    };
    boxes.appendChild(line);
  };
  const guessBoxes = document.getElementsByClassName("box");
  let cursor = 0;
  let line = 0;
  let locked = false;
  let done = false;
  window.addEventListener("keydown", function(event) {
    const modulo = letters + 1;
    const key = event.key.toString().toUpperCase();
    let index = cursor + line * letters;
    if (key.length === 1 && alphabet.indexOf(key) !== -1
    && !locked && cursor % modulo !== letters) {
      guessBoxes[index].innerHTML = key;
      guessBoxes[index].style.animationDuration = "0s";
      guessBoxes[index].style.animationName = "empty";
      window.setTimeout(function() {
        guessBoxes[index].style.border = "2px solid #999";
        guessBoxes[index].style.animationTimingFunction = "ease-out";
        guessBoxes[index].style.animationDuration = "0.2s";
        guessBoxes[index].style.animationName = "shrink";
      }, 5);
      let former = cursor % modulo;
      cursor++;
      cursor = cursor % modulo;
      if (former > cursor) {
        cursor = former;
      };
    } else {
      if ((key === "BACKSPACE" || key === "BACK") && cursor > 0 && !locked) {
        guessBoxes[index - 1].innerHTML = "";
        guessBoxes[index - 1].style.border = "2px solid #ddd";
        cursor--;
      };
      if ((key === "ENTER" || key === "RETURN") && !locked) {
        if (cursor === letters) {
          index -= cursor;
          let string = "";
          for (let i = 0; i < letters; i++) {
            const letter = guessBoxes[index + i].innerHTML;
            string += letter;
          };
          let upperCaseWords = [];
          for (let i = 0; i < length; i++) {
            const word = words[i].toUpperCase();
            upperCaseWords.push(word);
          };
          if (upperCaseWords.indexOf(string) !== -1) {
            line++;
            cursor = 0;
            if (line >= rows) {
              locked = true;
              done = true;
            };
            let allGreen = true;
            function flip(count) {
              locked = true;
              if (count < letters) {
                const flipSwitch = count + (line - 1) * letters;
                const letterForColor = guessBoxes[flipSwitch].innerHTML;
                let color;
                if (letterForColor === chosenWord[count]) {
                  color = "green";
                } else {
                  if (chosenWord.indexOf(letterForColor) !== -1) {
                    color = "yellow";
                    allGreen = false;
                  } else {
                    color = "grey";
                    allGreen = false;
                  };
                };
                guessBoxes[flipSwitch].style.animationTimingFunction = "linear";
                guessBoxes[flipSwitch].style.animationDuration = "0.3s";
                if (color === "green") {
                  const keyboardKey = document.getElementsByClassName("key")[qwerty.indexOf(letterForColor)];
                  keyboardKey.classList.add("green");
                  if (keyboardKey.classList.contains("yellow")) {
                    keyboardKey.classList.remove("yellow");
                  };
                  guessBoxes[flipSwitch].style.animationName = "flip_green";
                  guessBoxes[flipSwitch].style.backgroundColor = "#6aaa64";
                  guessBoxes[flipSwitch].style.borderColor = "#6aaa64";
                } else {
                  if (color === "yellow") {
                    const keyboardKey = document.getElementsByClassName("key")[qwerty.indexOf(letterForColor)];
                    if (!keyboardKey.classList.contains("green")) {
                      keyboardKey.classList.add("yellow");
                    };
                    guessBoxes[flipSwitch].style.animationName = "flip_yellow";
                    guessBoxes[flipSwitch].style.backgroundColor = "#c9b458";
                    guessBoxes[flipSwitch].style.borderColor = "#c9b458";
                  } else {
                    document.getElementsByClassName("key")[qwerty.indexOf(letterForColor)].classList.add("grey");
                    guessBoxes[flipSwitch].style.animationName = "flip_grey";
                    guessBoxes[flipSwitch].style.backgroundColor = "#787c7e";
                    guessBoxes[flipSwitch].style.borderColor = "#787c7e";
                  };
                };
                guessBoxes[flipSwitch].style.color = "#fff";
                window.setTimeout(function() {
                  flip(count + 1);
                }, 150);
              } else {
                if (!allGreen) {
                  locked = false;
                };
              };
            };
            flip(0);
          } else {
            console.log("Not in word list");
          };
        } else {
          if (!locked) {
            console.log("Not enough letters");
          };
        };
      };
    };
  });
});