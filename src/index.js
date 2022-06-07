import Notiflix from "notiflix";
import ApiService from "./js/api-service";
import LoadMoreBtn from "./js/load-more-btn";
import { renderMarkup } from "./js/renderMarkup";
import { cardList } from "./js/renderMarkup";
import { clearPicturesContainer } from "./js/clearPictureContainer";
import simpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
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
    const itemPictures = await apiService.fetchPictures();
  
    const { hits, totalHits } = itemPictures;
    if (hits.length === 0) {
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      clearPicturesContainer();
      return
    }
         
    else {
      clearPicturesContainer()
      renderMarkup(hits);
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`)
      console.log(hits);
      console.log(totalHits);
      loadMoreBtn.show();

      const lightbox = new SimpleLightbox('.gallery a', { /* options */ });
     
      
    }
          
    if (apiService.getCalculatePages() > totalHits) {
      loadMoreBtn.hide();
    }
          
  }
  }


function onLoadMore() {
  const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
});
  
  loadMoreBtn.hide();

  fetchMorePictures();

  async function fetchMorePictures() {
    const itemPictures = await apiService.fetchPictures();
    const { hits, totalHits } = itemPictures;
    
        if (apiService.getCalculatePages() > totalHits) {
          renderMarkup(hits);
          loadMoreBtn.hide();
          Notiflix.Notify.warning(`We're sorry, but you've reached the end of search results.`);
          const lightbox = new SimpleLightbox('.gallery a', { /* options */ });
      lightbox.refresh();
        }
        else {
          renderMarkup(hits);
          loadMoreBtn.show();
          const lightbox = new SimpleLightbox('.gallery a', { /* options */ });
      lightbox.refresh();
        }
      }
  }
  