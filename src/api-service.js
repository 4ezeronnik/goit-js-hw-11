const API_KEY = '16846852-36d31872340aa79693bfa0a07';

export default class ApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.per_page = 40;
       
    };
    
    fetchPictures() {
       
  return  fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${this.per_page}&page=${this.page}`)
      .then(response => {
        
      if (!response.ok) {
        throw new Error(response.statusText);
        } 
        
        this.incrementPage();

        return response.json()
    })
    };
       getCalculatePages() {
           return (this.page -1) * this.per_page;

      }
    
    incrementPage() {
        this.page += 1;
    };


    resetPage() {
        this.page = 1;
    };

    get query() {
        return this.searchQuery;
    };

    set query(newQuery) {
        this.searchQuery = newQuery;
    };
}