
const STORAGE_KEY = 'feedback-form-state';
const inputRef = document.querySelector('input');
const formRef = document.querySelector('form#search-form');


formRef.addEventListener('submit', onFormSubmit);
formRef.addEventListener('input', onFormInput)

function onFormInput(evt) {
    const formData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    formData[evt.target.name] = evt.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    console.log(formData);
}


function onFormSubmit(evt) {
    evt.preventDefault();
    const checkedData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || '';
    if (!checkedData.searchQuery) {
        return
    }
}



