// Описанный в документации
import iziToast from 'izitoast';
// Дополнительный импорт стилей
import 'izitoast/dist/css/iziToast.min.css';

const refsElement = {
  formEl: document.querySelector('.form'),
  inputDelay: document.querySelector('[name="delay"]'),
  inputFulfiled: document.querySelector('[value="fulfilled"]'),
  inputRejected: document.querySelector('[value="rejected"]'),
  btnSubmit: document.querySelector('[type="submit"]'),
};

const { formEl, inputDelay, inputFulfiled, inputRejected, btnSubmit } =
  refsElement;

formEl.addEventListener('submit', fetchUserPutDelay);

function fetchUserPutDelay(event) {
  event.preventDefault();
  const form = event.target;
  const delay = parseInt(form.delay.value);
  const state = form.state.value;
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  })
    .then(delay => {
      iziToast.success({
        title: '✅ Fulfilled',
        message: `Fulfilled promise in ${delay} ms`,
      });
    })
    .catch(delay => {
      iziToast.error({
        title: '❌ Rejected',
        message: `Rejected promise in ${delay} ms`,
      });
    });
}
