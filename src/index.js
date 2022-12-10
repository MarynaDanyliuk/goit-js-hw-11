import axios from 'axios';
// const axios = require('axios');
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import InfiniteScroll from 'infinite-scroll';
// import InfiniteScroll from `infinite-scroll`;
import GetImagesApiService from './apiService';
// import OnlyScroll from 'only-scrollbar';

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

  // getImagesApiService.query = refs.form.searchQuery.value;
  getImagesApiService.query =
    event.currentTarget.elements.searchQuery.value.trim();
  hideButtonLoad();
  clearGallery();

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
    renderGallary(images);
  });
}

refs.buttonLoadMore.addEventListener(`click`, onButtonLoadMoreClick);

function onButtonLoadMoreClick(event) {
  event.preventDefault();
  // console.log(`Жмем кнопку`);
  getImagesApiService.fetchImages(word).then(images => {
    const limit = getImagesApiService.totalHits;
    if (getImagesApiService.page * getImagesApiService.per_page >= limit) {
      console.log(`Вы достигли лимита`);
      Notiflix.Notify.info(
        `We're sorry, but you've reached the end of search results.`
      );
    }
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
  showButtonLoad();
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

// refs.buttonLoadMore.classList.add(`not-visible`);

// let infScroll = new InfiniteScroll(refs.gallery, {
//   // options
//   // path: '.pagination__next',
//   path: '.pagination__next',
//   append: '.post',
//   history: false,
// });

// console.log(infScroll);

// console.log(refs.gallery);
// let elem = document.querySelector('.gallery');

// const scroll = new OnlyScroll(document.querySelector('.gallery'));

// function getImagePath() {
//   const nextPenSlugs = [
//     '3d9a3b8092ebcf9bc4a72672b81df1ac',
//     '2cde50c59ea73c47aec5bd26343ce287',
//     'd83110c5f71ea23ba5800b6b1a4a95c4',
//   ];

//   let slug = nextPenSlugs[this.loadCount];
//   if (slug) return `/desandro/debug/${slug}`;
// }

// // element argument can be a selector string
// //   for an individual element
// let infScroll = new InfiniteScroll('.gallery', {
//   // options
// });

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
