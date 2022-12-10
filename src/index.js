import axios from 'axios';

import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import GetImagesApiService from './apiService';

const API_KEY = '31808257-b1d1bead71ab6681d9f118ecf';
const BASE_URL = 'https://pixabay.com/api/';

const getImagesApiService = new GetImagesApiService();

const lightbox = new SimpleLightbox(`.gallery a`, {
  captionsData: `alt`,
  captionPosition: `bottom`,
  captionDelay: `250 ms`,
});

const refs = {
  form: document.querySelector(`.form`),
  button: document.querySelector(`.search-button`),
  gallery: document.querySelector(`.gallery`),
  buttonLoadMore: document.querySelector(`.load-more`),
};

refs.form.addEventListener(`submit`, onFormSubmit);

let word = ``;

function onFormSubmit(event) {
  event.preventDefault();

  clearGallery();
  hideButtonLoad();

  getImagesApiService.query =
    event.currentTarget.elements.searchQuery.value.trim();

  getImagesApiService.resetPage();

  if (getImagesApiService.query === ``) {
    return;
  }

  getImagesApiService.fetchImages(word).then(images => {
    if (images.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      hideButtonLoad();
      clearGallery();
      return;
    }

    if ((getImagesApiService.page = 1 && images.length !== 0)) {
      Notiflix.Notify.success(
        `Hooray! We found ${getImagesApiService.totalHits} images.`
      );
    }

    getImagesApiService.incrementPage();

    renderGallary(images);
    showButtonLoad();
    console.log(`После запроса, если все ок - наш объект`, getImagesApiService);
  });
}

refs.buttonLoadMore.addEventListener(`click`, onButtonLoadMoreClick);

function onButtonLoadMoreClick(event) {
  const limit = getImagesApiService.totalHits;

  // console.log(getImagesApiService.page * getImagesApiService.per_page);

  // console.log(getImagesApiService.page);

  getImagesApiService.fetchImages(word).then(images => {
    if (getImagesApiService.page * getImagesApiService.per_page >= limit) {
      Notiflix.Notify.info(
        `We're sorry, but you've reached the end of search results.`
      );
      console.log(`Вы достигли лимита`);
      hideButtonLoad();
    }

    getImagesApiService.incrementPage();
    console.log(`После запроса, если все ок - наш объект`, getImagesApiService);
    renderGallary(images);
    smoothScrolling();
  });
}

refs.gallery.addEventListener(`click`, onGalleryClick);

let ImgActive = null;

function onGalleryClick(event) {
  event.preventDefault();

  if (event.target.nodeName !== `IMG`) {
    return;
  }

  const CurrentActiveImg = document.querySelector(`.img--active`);
  console.log(CurrentActiveImg);

  if (CurrentActiveImg) {
    event.target.classList.remove(`.img--active`);
  }

  const nextImgActive = event.target;
  nextImgActive.classList.add(`.img--active`);
  console.log(event.target);

  ImgActive = nextImgActive.getAttribute(`src`);
  console.log(ImgActive);
}

// ___________FUNCTIONS_______________

function renderGallary(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        likes,
        views,
        comments,
        tags,
        downloads,
        largeImageURL,
      }) => {
        return `<div class="galery__card">
    <a class="gallery__link" href="${largeImageURL}">
    <img class="gallery__image" src="${webformatURL}" alt="${tags}" title="${tags}" loading="lazy" />
    <div class="info">
      <p class="info__item">
        <b class="info__item-name">Likes</b>${likes}
      </p>
      <p class="info__item">
        <b class="info__item-name">Views</b>${views}
      </p>
      <p class="info__item">
        <b class="info__item-name">Comments</b>${comments}
      </p>
      <p class="info__item">
        <b class="info__item-name">Downloads</b>${downloads}
      </p>
    </div>
    </a>
  </div>`;
      }
    )
    .join(``);
  refs.gallery.insertAdjacentHTML(`beforeend`, markup);
  lightbox.refresh();
}

function smoothScrolling() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

function showButtonLoad() {
  refs.buttonLoadMore.classList.remove(`not-visible`);
  // lightbox.refresh();
}

function hideButtonLoad() {
  refs.buttonLoadMore.classList.add(`not-visible`);
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}
