import axios from 'axios';
// const axios = require('axios');
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

var lightbox = new SimpleLightbox(`.gallery a`, {
  captionsData: `alt`,
  captionPosition: `bottom`,
  captionDelay: `250 ms`,
});

export default class GetImagesApiService {
  constructor() {
    this.word = ``;
    this.page = 1;
    this.per_page = 40;
    this.totalHits = 500;
  }

  async fetchImages(word) {
    console.log(`До запроса наш объект`, this);
    const API_KEY = '31808257-b1d1bead71ab6681d9f118ecf';
    const BASE_URL = 'https://pixabay.com/api/';
    const response = await axios.get(
      `` +
        BASE_URL +
        `?key=` +
        API_KEY +
        `&q=${this.word}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${this.per_page}&page=${this.page}`
    );

    const images = response.data.hits;

    return images;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.word;
  }

  set query(newWord) {
    return (this.word = newWord);
  }

  get totalPages() {
    return this.totalPages;
  }
}

// if (this.page === 1 && response.data.hits.length !== 0) {
//   Notiflix.Notify.success('Hooray! We found 500 images.');
// }

// if ((response.data.hits = [])) {
//   Notiflix.Notify.failure(
//     'Sorry, there are no images matching your search query. Please try again.'
//   );
//   hideButtonLoad();
//   clearGallery();
//   return;
// }
// const limitImages = response.data.totalHits;

// console.log(this.page * this.per_page === limitImages);

// if (this.page * this.per_page >= limitImages) {
//   // console.log(`Вы достигли лимита`);
//   hideButtonLoad();
//   Notiflix.Notify.info(
//     `We're sorry, but you've reached the end of search results.`
//   );
// }

// renderGallery(images) {
//   const markup = images
//     .map(image => {
//       return `<div class="galery__card">
//   <a class="gallery__link" href="${image.largeImageURL}">
//   <img class="gallery__image" src="${image.webformatURL}" alt="${image.tags}" title="${image.tags}" loading="lazy" />
//   <div class="info">
//     <p class="info__item">
//       <b class="info__item-name">Likes</b>${image.likes}
//     </p>
//     <p class="info__item">
//       <b class="info__item-name">Views</b>${image.views}
//     </p>
//     <p class="info__item">
//       <b class="info__item-name">Comments</b>${image.comments}
//     </p>
//     <p class="info__item">
//       <b class="info__item-name">Downloads</b>${image.downloads}
//     </p>
//   </div>
//   </a>
// </div>`;
//     })
//     .join(``);
//   refs.gallery.insertAdjacentHTML(`beforeend`, markup);
//   // refs.gallery.innerHTML = markup;
//   lightbox.refresh();
// }

// showButtonLoad() {
//   refs.buttonLoadMore.classList.remove(`not-visible`);
//   lightbox.refresh();
// }
// catch(error) {
//   Notiflix.Notify.failure('Error');
// }

// function hideButtonLoad() {
//   refs.buttonLoadMore.classList.add(`not-visible`);
// }

// function clearGallery() {
//   refs.gallery.innerHTML = '';
// }

// smoothScrolling() {
//   const { height: cardHeight } = document
//     .querySelector('.gallery')
//     .firstElementChild.getBoundingClientRect();

//   window.scrollBy({
//     top: cardHeight * 2,
//     behavior: 'smooth',
//   });
// }

// console.log(document.querySelector('.gallery'));

// console.log(document.querySelector('.gallery').getBoundingClientRect());

// export async function getImages(word) {
//   try {
//     // const options = {
//     //   headers: {
//     //     key: '31808257-b1d1bead71ab6681d9f118ecf',
//     //   },
//     // };
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
