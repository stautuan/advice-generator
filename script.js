'use strict';

// Selectors
const adviceContainer = document.querySelector('main');
const adviceBtn = document.querySelector('.advice__btn');
const adviceNumber = document.querySelector('.advice__number');
const adviceText = document.querySelector('.advice__text');
const loader = document.querySelector('.loader');

function showError(
  message = 'Failed to fetch advice. Please try again later.'
) {
  adviceNumber.innerHTML = '';
  adviceText.innerHTML = message;
}

function displayLoading() {
  loader.classList.remove('hidden');
  adviceContainer.classList.add('hidden');

  setTimeout(() => {
    loader.classList.add('hidden');
    adviceContainer.classList.remove('hidden');
  }, 2000);
}

async function getAdvice() {
  displayLoading();

  try {
    const response = await fetch('https://api.adviceslip.com/advice');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const advice = data.slip;

    if (!data) {
      showError();
    } else {
      setTimeout(() => {
        adviceNumber.innerHTML = `Advice #${advice.id}`;
        adviceText.innerHTML = `"${advice.advice}"`;
      }, 1000);
    }
  } catch (error) {
    showError();
  }
}

adviceBtn.addEventListener('click', getAdvice);
