'use strict';

// Selectors
const adviceBtn = document.querySelector('.advice__btn');
const adviceNumber = document.querySelector('.advice__number');
const adviceText = document.querySelector('.advice__text');

function showError(
  message = 'Failed to fetch advice. Please try again later.'
) {
  adviceNumber.innerHTML = '';
  adviceText.innerHTML = message;
}

async function getAdvice() {
  try {
    const response = await fetch('https://api.adviceslip.com/advice');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const advice = data.slip;

    if (advice) {
      adviceNumber.innerHTML = `Advice #${advice.id}`;
      adviceText.innerHTML = `"${advice.advice}"`;
    } else {
      showError();
    }
  } catch (error) {
    showError();
  }
}

adviceBtn.addEventListener('click', getAdvice);
