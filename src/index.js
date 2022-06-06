import Notiflix from "notiflix";
import ApiService from "./api-service";
import LoadMoreBtn from "./load-more-btn";
import { renderMarkup } from "./renderMarkup";
import { cardList } from "./renderMarkup";
import axios from "axios";


const formRef = document.querySelector('form#search-form');
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
  
  fetchFirstPictures();

  async function fetchFirstPictures() {
    const fetchOneOfThePictures = await apiService.fetchPictures();
    console.log(fetchOneOfThePictures);
    const { hits, totalHits } = fetchOneOfThePictures;
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
    }
          
  }
  }


function onLoadMore() {
  loadMoreBtn.hide();

  fetchMorePictures();

  async function fetchMorePictures() {
    const oneOfTheOtherPictures = await apiService.fetchPictures();
    const { hits, totalHits } = oneOfTheOtherPictures;
    
        if (apiService.getCalculatePages() > totalHits) {
          renderMarkup(hits);
          loadMoreBtn.hide();
          Notiflix.Notify.warning(`We're sorry, but you've reached the end of search results.`);
        }
        else {
          renderMarkup(hits);
          loadMoreBtn.show();
        }
      }
  }
  


function clearPicturesContainer() {
    cardList.innerHTML = "";
}