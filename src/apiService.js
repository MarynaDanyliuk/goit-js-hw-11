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
