/**
 *  * create a class named Book
 * constructor
 * build below props :
 * title , author, isbn
 * method change(key, value)
 ** create a class named BookList
 * constructor
 * build below props :
 * books // (meant to contain elemnts from Type Book)
 * methods :
 * addBookToList(book)
 * deleteBook(isbn)
 *
 *
 */

class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;

    }
}

class UI {
    addBookToList(book) {
        const tbody = document.querySelector('#book-list');
        //Create tr element
        const row = document.createElement('tr');
        // Insert cols
        row.innerHTML = `
<td>${book.title}</td>
<td>${book.author}</td>
<td>${book.isbn}</td>
<td><a href = "#" class="delete">X</a></td>
`;
        tbody.appendChild(row);
    }
    deleteBook(target) {
        if (target.className == 'delete') {
            target.parentElement.parentElement.remove();
        }
    }
    showAlert(message, className) {
        //Create a div
        const error = document.createElement('div');
        // Add classes
        error.className = `alert ${className}`;
        // Add text
        error.appendChild(document.createTextNode(message));
        //Get parent
        const container = document.querySelector('.container');
        //Get form
        const form = document.querySelector('#form-book');
        //Insert Alert
        container.insertBefore(error, form);

        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 3000);
    }
    clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';

    }
}
// LocalStorage Class
class Store{

    static getBooks(){
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static displayBooks(){
        const books = Store.getBooks();

        books.forEach = (book) => {
            const ui = new UI;

            ui.addBookToList(book);
        }
    }
    static addBook(book){
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books',JSON.stringify(books));

    }

    static removeBook(isbn){
        const books = Store.getBooks();

        books.forEach = (book,index) => {
            if (book.isbn === isbn) {
              books.splice(index,1);  
            }
        };
        localStorage.setItem('books',JSON.stringify(books));

    }
}
//DOM Load Event
window.addEventListener('DOMContentLoaded',Store.displayBooks);

// Add Event Listener
document.querySelector('input[type=submit]').addEventListener('click', function (e) {
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    const book = new Book(title, author, isbn);

    const ui = new UI();

    // Validate
    if (title === '' || author === '' || isbn === '') {
        ui.showAlert('Please fill in all fields', 'error');
    } else {
        ui.addBookToList(book);
        
        Store.addBook(book);

        ui.showAlert('Book Added', 'validate');

        ui.clearFields();
    }
    e.preventDefault();

});

// Event Listener for delete books
document.querySelector('#book-list').addEventListener('click', function (e) {
    const ui = new UI();

    ui.deleteBook(e.target);

    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    ui.showAlert('Book Removed', 'validate');

    e.preventDefault();

})