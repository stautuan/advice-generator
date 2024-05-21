'use strict';

// Selectors
const adviceBtn = document.querySelector('.advice__btn');
const adviceNumber = document.querySelector('.advice__number');
const adviceText = document.querySelector('.advice__text');

async function getAdvice() {
  try {
    const response = await fetch('https://api.adviceslip.com/advice');
    if (!response.ok)
      throw new Error(`HTTP error! 💥 status: ${response.status}`);
    const data = await response.json();
    const advice = data.slip;

    adviceNumber.innerHTML = `${advice.id}`;
    adviceText.innerHTML = `"${advice.advice}"`;
  } catch (error) {
    console.error(error);
  }
}

adviceBtn.addEventListener('click', getAdvice);
