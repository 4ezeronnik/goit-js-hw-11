export const cardList = document.querySelector('.gallery');

export function renderMarkup(data) {
    const markup = data
        .map(
          ({ tags, webformatURL, largeImageURL, likes, views, comments, downloads }) => `
  <a class="photo-card" href="${largeImageURL}">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
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
    `).join('');

    cardList.insertAdjacentHTML('beforeend', markup);
}