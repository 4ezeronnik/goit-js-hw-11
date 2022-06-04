export default class ApiService {
    constructor() {
        this.searchQuery = '';
       
    }
    
    fetchPictures() {
        console.log(this);
          const API_KEY = '16846852-36d31872340aa79693bfa0a07';
  return  fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=1`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
            return response.json();
        })
    }
    get query() {
        return this.searchQuery;
    }
    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}