import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const formElem = document.querySelector(".form");

formElem.addEventListener("submit", onFormSubmit);

function onFormSubmit(event) {
    event.preventDefault();
    const delay = event.target.elements.delay.value;
    const state = event.target.elements.state.value;
    formElem.reset();
    const promise = new Promise((resolve, reject) => {
        if (state == "fulfilled") {
            setTimeout(() => {
                resolve(`✅ Fulfilled promise in ${delay}ms`);
            }, delay);
        } else if (state == "rejected") {
            setTimeout(() => {
                reject(`❌ Rejected promise in ${delay}ms`);
            }, delay);
        }
    });
    
    promise.then((result) => {
        iziToast.success({
                title: "Success!",
                message: result,
                position: 'topCenter',
            });
    }).catch((error) => {
        iziToast.warning({
                title: "Warning!",
                message: error,
                position: 'topCenter',
            });
    });
}