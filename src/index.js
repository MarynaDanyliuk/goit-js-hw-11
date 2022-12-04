import axios from 'axios';
// const axios = require('axios');
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const API_KEY = '31808257-b1d1bead71ab6681d9f118ecf';
const BASE_URL = 'https://pixabay.com/api/';

const refs = {
  form: document.querySelector(`.form`),
  button: document.querySelector(`.search-button`),
  gallery: document.querySelector(`.gallery`),
};

refs.form.addEventListener(`submit`, onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  const word = refs.form.searchQuery.value;

  console.log(word);

  getUser(word);

  async function getUser(word) {
    try {
      const response = await axios.get(
        `` +
          BASE_URL +
          `?key=` +
          API_KEY +
          `&q=${word}&image_type=photo&orientation=horizontal&safesearch=true`
      );

      if (response.data.hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      } else if (response.data.hits !== 0) {
        console.log(response.data.hits);
      }
    } catch (error) {
      Notiflix.Notify.failure('Error');
    }
  }
}

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

https: `<div class="photo-card">
  <img src="" alt="" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
    </p>
    <p class="info-item">
      <b>Views</b>
    </p>
    <p class="info-item">
      <b>Comments</b>
    </p>
    <p class="info-item">
      <b>Downloads</b>
    </p>
  </div>
</div>`;
