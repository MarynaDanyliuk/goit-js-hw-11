import axios from 'axios';
// const axios = require('axios');
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  form: document.querySelector(`.form`),
  button: document.querySelector(`.search-button`),
  gallery: document.querySelector(`.gallery`),
  buttonLoadMore: document.querySelector(`.load-more`),
};

export default class GetImagesApiService {
  constructor() {
    this.word = ``;
    this.page = 1;
    this.per_page = 40;
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
        `&q=${this.word}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`
    );
    // console.log(response.data.hits);
    if (response.data.hits) {
      this.incrementPage();
      console.log(`После запроса, если все ок - наш объект`, this);
    }

    if (response.data.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );

      clearGallery();
      return;
    }
    const limitImages = response.data.totalHits;

    console.log(this.page * this.per_page === limitImages);

    if (this.page * this.per_page >= limitImages) {
      // console.log(`Вы достигли лимита`);
      hideButtonLoad();
      Notiflix.Notify.info(
        `We're sorry, but you've reached the end of search results.`
      );
    }

    const images = response.data.hits;
    return images;
  }
  catch(error) {
    Notiflix.Notify.failure('Error');
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
}

function hideButtonLoad() {
  refs.buttonLoadMore.classList.add(`not-visible`);
}

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

function clearGallery() {
  refs.gallery.innerHTML = '';
}
