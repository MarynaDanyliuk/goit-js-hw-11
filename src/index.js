import axios from 'axios';
// const axios = require('axios');
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

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
  async function getUser(word) {
    try {
      const response = await axios.get(
        `pixabay.com/api/?key=31808257-b1d1bead71ab6681d9f118ecf&q=${word}&image_type=photo&orientation=horizontal&safesearch=true`
      );
      console.log(response);
    } catch (error) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
  }
  getUser();
}

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
