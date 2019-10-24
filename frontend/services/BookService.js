class BookService{
    constructor(){
        this.URI='http://localhost:4000/api/books';        
    }
    async getBooks(){
        const response=await fetch(this.URI);
        const books=response.json();
        return books;
    }   
    async postBook (book){
        const res=await fetch(this.URI,{
            method:'POST',
            body:book
        });
        const data=await res.json();
        console.log(data);
    }
    async deleteBook(bookid){
        console.log(`${this.URI}/${bookid}`);
        const res=await fetch(`${this.URI}/${bookid}`,{
            headers:{
                'Content-Type':'application/json'
            },
            method:'DELETE'
        });
        const data=await res.json();
        console.log(data)
    }
}
export default BookService;