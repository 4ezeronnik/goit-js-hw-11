export const cardList = document.querySelector('.gallery');

export function renderMarkup(data) {
    const markup = data
        .map(
          ({ tags, webformatURL, largeImageURL, likes, views, comments, downloads }) => `
  <div class="photo-card">
  <a  href="${largeImageURL}">
  <img src="${webformatURL}" alt="${tags}" class="photo-card__preview" " loading="lazy" /></a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b><span class="info-item__span">${likes}</span>
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