// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const refsElemets = {
  dateTimePicker: document.querySelector('#datetime-picker'),
  butnStart: document.querySelector('[data-start]'),
  daySpan: document.querySelector('[data-days]'),
  hoursSpan: document.querySelector('[data-hours]'),
  minutesSpan: document.querySelector('[data-minutes]'),
  secondsSpan: document.querySelector('[data-seconds]'),
};

const {
  dateTimePicker,
  butnStart,
  daySpan,
  minutesSpan,
  hoursSpan,
  secondsSpan,
} = refsElemets;

let intervalId = null;
let userSelectedDate = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate <= new Date()) {
      iziToast.show({
        // title: 'Hey',
        message: 'Please choose a date in the future',
      });
      butnStart.disabled = true;
    } else {
      butnStart.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

butnStart.addEventListener('click', onStartBtnClick);

function onStartBtnClick(event) {
  if (intervalId) {
    clearInterval(intervalId);
  }
  butnStart.disabled = true;
  dateTimePicker.disabled = true;
  intervalId = setInterval(() => {
    const now = Date.now();
    const timeDifference = userSelectedDate - now;
    if (timeDifference <= 0) {
      clearInterval(intervalId);
      updateTimerDisplay(0, 0, 0, 0);
      dateTimePicker.disabled = false;
      return;
    }
    const timeComplete = convertMs(timeDifference);
    updateTimerDisplay(
      timeComplete.days,
      timeComplete.hours,
      timeComplete.minutes,
      timeComplete.seconds
    );
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateTimerDisplay(days, hours, minutes, seconds) {
  daySpan.textContent = addLeadingZero(days);
  hoursSpan.textContent = addLeadingZero(hours);
  minutesSpan.textContent = addLeadingZero(minutes);
  secondsSpan.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
