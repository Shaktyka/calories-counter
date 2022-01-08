// Импорты
import {activityCoefficient, maintainNormative, weightGainPercentage, weightLossPercentage, } from './normatives.js';

// HTML-элементы формы:
const form = document.querySelector('.form');
const submitBtn = form.querySelector('.form__submit-button');
const resetButton = form.querySelector('.form__reset-button');
const inputsGroups = form.querySelector('.inputs-group');
// HTML-элементы блока вывода:
const resultBlock = document.querySelector('.counter__result');
const caloriesNormValue = resultBlock.querySelector('#calories-norm');
const caloriesMinValue = resultBlock.querySelector('#calories-minimal');
const caloriesMaxValue = resultBlock.querySelector('#calories-maximal');

// Сбрасывает значения формы в начальные:
const resetForm = () => {
  form.reset;
};

// Разблокирует кнопку сброса, если введено какое-то значение в поля:
inputsGroups.addEventListener('input', (evt) => {
  const target = evt.target;
  if (target.value !== '') {
    resetButton.disabled = false;
  } else {
    resetButton.disabled = true;
  }
});

// Обработчик отправки формы:
const formSubmitHandler = (evt) => {
  evt.preventDefault();
};

// Стартовая функция:
const init = () => {
  resetForm();
  // показывает\скрывает нужное
  // устанавливает дефолтные значения

  // Вешает обработчик на форму:
  form.addEventListener('submit', formSubmitHandler);
};

// Вызов стартовой ф-ции:
init();
