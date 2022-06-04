import Notiflix from "notiflix";
import debounce from "lodash.debounce";

const DEBOUNCE_DELAY = 300;
const STORAGE_KEY = 'feedback-form-state';
const inputRef = document.querySelector('input');
const formRef = document.querySelector('form#search-form');
const cardList = document.querySelector('.gallery');



formRef.addEventListener('submit', onFormSubmit);
formRef.addEventListener('input', debounce(onFormInput, DEBOUNCE_DELAY));


function onFormInput(evt) {
    const formData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    formData[evt.target.name] = evt.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    console.log(formData);
}


function onFormSubmit(evt) {
    evt.preventDefault();
    const checkedData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || '';
    const itemData = checkedData.searchQuery.trim();
    if (!itemData) {
        return
    }
    fetchPictures(itemData)
        .then(({ hits }) => {
            if (hits.length === 0) {
                Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
                cardList.innerHTML = "";
                return
            }
            else {
                renderMarkup(hits);
            }

        })
    
}

function fetchPictures(name) {
    const API_KEY = '16846852-36d31872340aa79693bfa0a07';
  return  fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
            return response.json();
        })
}

function renderMarkup(data) {
    const markup = data
        .map(
            ({ tags, webformatURL, largeImageURL, likes, views, comments, downloads }) => `
   <div class="photo-card" href="${largeImageURL}">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>${likes}
    </p>
    <p class="info-item">
      <b>Views</b>${views}
    </p>
    <p class="info-item">
      <b>Comments</b>${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${downloads}
    </p>
  </div>
</div>
    `).join('');

    cardList.innerHTML = markup;
}