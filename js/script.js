// Импорты
import {
  activityCoefficient,
  maintainNormative,
  weightGainPercentage,
  weightLossPercentage
} from './normatives.js';

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
const caloriesNormElement = resultBlock.querySelector('#calories-norm');
const caloriesLossElement = resultBlock.querySelector('#calories-minimal');
const caloriesGainElement = resultBlock.querySelector('#calories-maximal');

// Данные из полей:
let genderValue = null;
let ageValue = null;
let heightValue = null;
let weightValue = null;
let activityValue = null;

// Сбрасывает значения формы в начальные:
const resetForm = () => {
  form.reset;
  resultBlock.classList.add('counter__result--hidden');
};

// Обработчик ввода в числовые поля:
const inputsGroupInputHandler = () => {
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

// Рассчитывает норму калорий:
const calculateCaloriesNorm = (data) => {
  genderValue = data.get('gender');
  activityValue = data.get('activity');
  let caloriesNorm = 0;

  if (genderValue === 'male') {
    caloriesNorm = 
      (maintainNormative.weight.male * weightValue) 
      + (maintainNormative.height.male * heightValue) 
      - (maintainNormative.age.male * ageValue) 
      + maintainNormative.coefficient.male;
  } else if (genderValue === 'female') {
    caloriesNorm = 
      (maintainNormative.weight.female * weightValue) 
      + (maintainNormative.height.female * heightValue) 
      - (maintainNormative.age.female * ageValue) 
      - maintainNormative.coefficient.female;
  }

  return caloriesNorm * activityCoefficient[activityValue];
};

// Отрисовывает результат:
const showResult = (normCalories = 0, lossCalories = 0, gainCalories = 0) => {
  // Добавляет пробел между тысячами и отрисовывает данные:
  caloriesNormElement.textContent = normCalories.toLocaleString('ru-RU');
  caloriesLossElement.textContent = lossCalories.toLocaleString('ru-RU');
  caloriesGainElement.textContent = gainCalories.toLocaleString('ru-RU');
  
  // Открывает блок:
  if (resultBlock.classList.contains('counter__result--hidden')) {
    resultBlock.classList.remove('counter__result--hidden')
  }
};

// Обработчик submit:
const formSubmitHandler = (evt) => {
  evt.preventDefault();
  const formData = new FormData(form);

  // Рассчитывает нормы калорий:
  const caloriesNorm = Math.round(calculateCaloriesNorm(formData));
  const caloriesLossValue = Math.round(caloriesNorm - caloriesNorm * weightLossPercentage);
  const caloriesGainValue = Math.round(caloriesNorm + caloriesNorm * weightGainPercentage);

  // Отрисовывает блок результата:
  showResult(caloriesNorm, caloriesLossValue, caloriesGainValue);
};

// Обработчик клика по кнопке очистки:
const resetButtonClickHandler = () => {
  resetForm();
};

// Стартовая функция:
const init = () => {
  // Вешает обработчик на форму:
  form.addEventListener('submit', formSubmitHandler);
  // Вешает обработчик на группу инпутов:
  inputsGroup.addEventListener('input', inputsGroupInputHandler);
  // Обработчик на кнопку очистки:
  resetButton.addEventListener('click', resetButtonClickHandler);
};

// Вызов стартовой ф-ции:
init();
