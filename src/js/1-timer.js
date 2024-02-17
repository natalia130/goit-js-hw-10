import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const inputDate = document.querySelector("#datetime-picker");
const startButton = document.querySelector("[data-start]");
const dataDays = document.querySelector("[data-days]");
const dataHours = document.querySelector("[data-hours]");
const dataMinutes = document.querySelector("[data-minutes]");
const dataSeconds = document.querySelector("[data-seconds]");
let userSelectedDate;
startButton.disabled = true;
inputDate.disabled = false;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0].getTime() <= Date.now()) {
            startButton.disabled = true;
            iziToast.warning({
                title: "Warning!",
                message: "Please choose a date in the future",
                position: 'topCenter',
            });
        } else {
            userSelectedDate = new Date(selectedDates[0]);
            startButton.disabled = false;
        }
    },
};
flatpickr(inputDate, options);

startButton.addEventListener("click", () => {
    timer.start();
});

class Timer {
    constructor(tick) {
        this.intervalId = null;
        this.tick = tick;
    }
    start() {
        this.intervalId = setInterval(() => {
            inputDate.disabled = true;
            startButton.disabled = true;
            const diff = userSelectedDate - Date.now();
            const time = this.convertMs(diff);
            this.tick(time);
        }, 1000);
    } 
    stop() {
        clearInterval(this.intervalId);
    }
    convertMs(ms) {
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
}

const timer = new Timer(onTick);

function onTick({ days, hours, minutes, seconds }) {
    if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) {
        timer.stop();
    }
    dataDays.textContent = addLeadingZero(days);
    dataHours.textContent = addLeadingZero(hours);
    dataMinutes.textContent = addLeadingZero(minutes);
    dataSeconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
    return value.toString().padStart(2, "0");
}