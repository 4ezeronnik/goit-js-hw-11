import Notiflix from "notiflix";
import ApiService from "./api-service";


const formRef = document.querySelector('form#search-form');
const loadMoreButton = document.querySelector('.load-more');
const cardList = document.querySelector('.gallery');
const apiService = new ApiService();


formRef.addEventListener('submit', onFormSubmit);
loadMoreButton.addEventListener('click', onLoadMore);


function onFormSubmit(evt) {
    evt.preventDefault();

    apiService.query = evt.currentTarget.elements.searchQuery.value;
    apiService.resetPage();
    apiService.fetchPictures()
        .then(({ hits }) => {
            if (hits.length === 0) {
                Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
                cardList.innerHTML = "";
                return
            }
            else {
                clearPicturesContainer()
              renderMarkup(hits);
              console.log(hits);
                
            }

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

    cardList.insertAdjacentHTML('beforeend', markup);
}

function onLoadMore() {
    apiService.fetchPictures()
        .then(({ hits }) => renderMarkup(hits))
};

function clearPicturesContainer() {
    cardList.innerHTML = "";
}