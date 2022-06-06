import Notiflix from "notiflix";
import ApiService from "./api-service";
import LoadMoreBtn from "./load-more-btn";


const formRef = document.querySelector('form#search-form');
// const loadMoreButton = document.querySelector('.load-more');
const cardList = document.querySelector('.gallery');
const apiService = new ApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  hidden: true,
})


formRef.addEventListener('submit', onFormSubmit);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);


function onFormSubmit(evt) {
    evt.preventDefault();

  apiService.query = evt.currentTarget.elements.searchQuery.value.trim();
  if (!apiService.query) {
    return
  }

    apiService.resetPage();
    apiService.fetchPictures()
        .then(({ hits, totalHits }) => {
            if (hits.length === 0) {
                Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
              cardList.innerHTML = "";
                return
            }
         
            else {
              clearPicturesContainer()
              renderMarkup(hits);
              console.log(hits);
              console.log(totalHits);
              loadMoreBtn.show();
            }
          
           if (apiService.getCalculatePages() > totalHits) {
             loadMoreBtn.hide();
              Notiflix.Notify.warning(`We're sorry, but you've reached the end of search results.`);
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
  loadMoreBtn.hide();
    apiService.fetchPictures()
      .then(({ hits, totalHits }) => {
           if (apiService.getCalculatePages() > totalHits) {
             loadMoreBtn.hide();
             Notiflix.Notify.warning(`We're sorry, but you've reached the end of search results.`);
           }
        else {
             renderMarkup(hits);
              loadMoreBtn.show();
        }
      }
        )

  
};

function clearPicturesContainer() {
    cardList.innerHTML = "";
}