import axios from 'axios';
const axios = require('axios');
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export default class GetImagesApiService {
  constructor() {
    this.word = ``;
    this.page = 1;
  }

  async fetchImages(word) {
    console.log(this);
    const API_KEY = '31808257-b1d1bead71ab6681d9f118ecf';
    const BASE_URL = 'https://pixabay.com/api/';
    const response = await axios.get(
      `` +
        BASE_URL +
        `?key=` +
        API_KEY +
        `&q=${this.word}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`
    );
    if (response.data.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      clearGallery();
      return;
    }

    if (response.data.hits) {
      this.page += 1;
    }
    const images = response.data.hits;
    return images;
  }
  catch(error) {
    Notiflix.Notify.failure('Error');
  }

  get query() {
    return this.word;
  }

  set query(newWord) {
    return (this.word = newWord);
  }
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
