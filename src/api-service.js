export default class ApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
       
    }
    
    fetchPictures() {
        console.log(this);
          const API_KEY = '16846852-36d31872340aa79693bfa0a07';
  return  fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
        } this.page += 1;
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