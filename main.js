let inputEl = document.getElementById("input");
let guideEl = document.getElementById("guide");
let titleEl = document.getElementById("title");
let meaningEl = document.getElementById("meaning");
let meaningTwo = document.getElementById("meaningTwo");
let theAudioEl = document.getElementById("audio");
async function apiFunction(word) {
  try {
    titleEl.style.display = "none";
    meaningEl.style.display = "none";
    meaningTwo.style.display = "none";
    theAudioEl.style.display = "none";

    guideEl.style.display = "block";
    guideEl.innerText = "Searching For The Meaning";
    const theResult = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    ).then((e) => e.json());
    console.log(theResult);
    let theMeaningIs = theResult[0].meanings[0].definitions[0].definition;
    let secondMeaning = theResult[0].meanings[0].definitions[1].definition;
    let audioSource = theResult[0].phonetics[0].audio;
    console.log(audioSource);
    guideEl.style.display = "none";
    titleEl.innerText = `Title : ${word}`;
    titleEl.style.display = "block";
    meaningEl.innerText = `Meaning (1) : ${theMeaningIs}`;
    meaningEl.style.display = "block";
    meaningTwo.innerText = `Meaning (2) : ${secondMeaning}`;
    meaningTwo.style.display = "block";
    if (audioSource) {
      theAudioEl.setAttribute("src", audioSource);
      theAudioEl.style.display = "block";
    }
  } catch (error) {
    guideEl.style.display = "block";
    guideEl.innerText = "No Definitions Found";
    console.log(Error("There Is SomeThing Wrong"));
  }
}

inputEl.addEventListener("keyup", (e) => {
  if (e.target.value && e.key === "Enter") {
    apiFunction(e.target.value);
  }
});

