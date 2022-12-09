import axios from 'axios';
// const axios = require('axios');
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// import {getImagesApiService} from `./apiService`;
import GetImagesApiService from './apiService';

const API_KEY = '31808257-b1d1bead71ab6681d9f118ecf';
const BASE_URL = 'https://pixabay.com/api/';

const getImagesApiService = new GetImagesApiService();

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

  showButtonLoad();
  // refs.buttonLoadMore.classList.remove(`not-visible`);
  // clearGallery();

  // getImagesApiService.query = refs.form.searchQuery.value;
  getImagesApiService.query = event.currentTarget.elements.searchQuery.value;

  if (getImagesApiService.query === ``) {
    clearGallery();
    return;
  }
  getImagesApiService.resetPage();
  getImagesApiService.fetchImages(word).then(renderGallary);
  // .then(smoothScrolling);
}

function renderGallary(images) {
  const markup = images
    .map(image => {
      return `<div class="galery__card">
    <a class="gallery__link" href="${image.largeImageURL}">
    <img class="gallery__image" src="${image.webformatURL}" alt="${image.tags}" title="${image.tags}" loading="lazy" />
    <div class="info">
      <p class="info__item">
        <b class="info__item-name">Likes</b>${image.likes}
      </p>
      <p class="info__item">
        <b class="info__item-name">Views</b>${image.views}
      </p>
      <p class="info__item">
        <b class="info__item-name">Comments</b>${image.comments}
      </p>
      <p class="info__item">
        <b class="info__item-name">Downloads</b>${image.downloads}
      </p>
    </div>
    </a>
  </div>`;
    })
    .join(``);
  refs.gallery.innerHTML = markup;
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

var lightbox = new SimpleLightbox(`.gallery a`, {
  captionsData: `alt`,
  captionPosition: `bottom`,
  captionDelay: `250 ms`,
});

refs.buttonLoadMore.addEventListener(`click`, onButtonLoadMoreClick);

function onButtonLoadMoreClick(event) {
  event.preventDefault();
  console.log(`Жмем кнопку`);
  getImagesApiService.resetPage();
  getImagesApiService
    .fetchImages(word)
    .then(renderGallary)
    .then(smoothScrolling);

  if (getImagesApiService.query === ``) {
    clearGallery();
    return;
  }
  // const buttonLoadMoreHidden = document.querySelector(`.not-visible`);
}

function showButtonLoad() {
  refs.buttonLoadMore.classList.remove(`not-visible`);
  // clearGallery();
  lightbox.refresh();
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}

// ___________FUNCTIONS__________________________

// async function getImages(word) {
//   try {
//     const response = await axios.get(
//       `` +
//         BASE_URL +
//         `?key=` +
//         API_KEY +
//         `&q=${word}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`
//       // options
//     );

//     if (response.data.hits.length === 0) {
//       Notiflix.Notify.failure(
//         'Sorry, there are no images matching your search query. Please try again.'
//       );
//       clearGallery();
//       return;
//     }
//     const images = response.data.hits;
//     return images;
//     //   console.log(images);
//   } catch (error) {
//     Notiflix.Notify.failure('Error');
//   }
// }

// const {
//   webformatURL,
//   largeImageURL,
//   tags,
//   likes,
//   views,
//   comments,
//   downloads,
// } = images;
// console.log(images);

//   console.log(images);

// var API_KEY = '31808257-b1d1bead71ab6681d9f118ecf';
// var URL =
//   'https://pixabay.com/api/?key=' +
//   API_KEY +
//   '&q=' +
//   encodeURIComponent('red roses');
// $.getJSON(URL, function (data) {
//   if (parseInt(data.totalHits) > 0)
//     $.each(data.hits, function (i, hit) {
//       console.log(hit.pageURL);
//     });
//   else console.log('No hits');
// });

// axios
//   .get(
//     `pixabay.com/api/?key=31808257-b1d1bead71ab6681d9f118ecf&q=yellow+flowers&image_type=photo`
//   )
//   .then(function (response) {
//     // handle success
//     console.log(response);
//   })
//   .catch();

// my api key: 31808257-b1d1bead71ab6681d9f118ecf

// key;
// q;
// image_type -  "type": "photo"
// orientation - horizontal;
// safesearch - true;

// webformatURL - посилання на маленьке зображення для списку карток.
// largeImageURL - посилання на велике зображення.
// tags - рядок з описом зображення. Підійде для атрибуту alt.
// likes - кількість лайків.
// views - кількість переглядів.
// comments - кількість коментарів.
// downloads - кількість завантажень.

// https: `<div class="photo-card">
//   <img src="" alt="" loading="lazy" />
//   <div class="info">
//     <p class="info-item">
//       <b>Likes</b>
//     </p>
//     <p class="info-item">
//       <b>Views</b>
//     </p>
//     <p class="info-item">
//       <b>Comments</b>
//     </p>
//     <p class="info-item">
//       <b>Downloads</b>
//     </p>
//   </div>
// </div>`;

// _____________NOTES_______________________
// const listImages = images.map(
//   ({
//     webformatURL,
//     largeImageURL,
//     tags,
//     likes,
//     views,
//     comments,
//     downloads,
//   }) => ({
//     webformatURL,
//     largeImageURL,
//     tags,
//     likes,
//     views,
//     comments,
//     downloads,
//   })
// );
// console.log(listImages);
