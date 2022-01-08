// Импорты
import {activityCoefficient, maintainNormative, weightGainPercentage, weightLossPercentage, } from './normatives.js';

// HTML-элементы формы:
const form = document.querySelector('.form');
const submitBtn = form.querySelector('.form__submit-button');
const resetButton = form.querySelector('.form__reset-button');
const inputsGroup = form.querySelector('.inputs-group');
const ageInput = form.querySelector('#age');
const heightInput = form.querySelector('#height');
const weightInput = form.querySelector('#weight');
// HTML-элементы блока вывода:
const resultBlock = document.querySelector('.counter__result');
const caloriesNormValue = resultBlock.querySelector('#calories-norm');
const caloriesMinValue = resultBlock.querySelector('#calories-minimal');
const caloriesMaxValue = resultBlock.querySelector('#calories-maximal');

// Переменные:
let ageValue = null;
let heightValue = null;
let weightValue = null;

// Сбрасывает значения формы в начальные:
const resetForm = () => {
  form.reset;
  resultBlock.classList.add('counter__result--hidden');
};

// Обработчик ввода в числовые поля:
const inputsGroupInputHandler = (evt) => {
  ageValue = ageInput.value;
  heightValue = heightInput.value;
  weightValue = weightInput.value;

  // Переключает состояние кнопки "Очистить поля":
  if (ageValue !== '' || heightValue !== '' || weightValue !== '') {
    resetButton.disabled = false;
  } else {
    resetButton.disabled = true;
  }

  // Переключает состояние кнопки "Рассчитать":
  if (ageValue !== '' && heightValue !== '' && weightValue !== '') {
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;
  }
};

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
  // Вешает обработчик на группу инпутов:
  inputsGroup.addEventListener('input', inputsGroupInputHandler);
};

// Вызов стартовой ф-ции:
init();
