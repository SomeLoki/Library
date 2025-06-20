const myLibrary = [];

class Book {

  constructor(title, author, pages, read){
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
  }

  info = function() {
  return `${this.title} by ${this.author}, ${this.pages} pages, ` + (this.read ? "have read" : "have not read yet");
  };

  createBookElement = function(){
  createDomElement( "div", "bookInfo", this.info(), ".book-card", this.id);
  }

  updateBookDisplay = function(){
  const element = document.querySelector(`.bookInfo[data-related-book="${this.id}"]`);
  element.textContent = this.info();
  }
}

const createDomElement = function( element, elementClass, textContent, appendTo, bookId) {
  const newElement = document.createElement(element);
  // this is to always select the last book-card
  const parent = document.querySelector(`${appendTo}:last-of-type`);
  if (elementClass) {
    newElement.classList.add(elementClass);
  }
  if (bookId) {
    newElement.setAttribute("data-related-book", bookId);
  }
  newElement.textContent = textContent;
  parent.appendChild(newElement);
}

function addBookToLibrary( title, author, pages, read) {
  const newBook = new Book( title, author, pages, read);
  myLibrary.push(newBook);
  displayLibrary();
};

function displayLibrary() {
  for ( const book of myLibrary) {
    // check if the book already is displayed
    const element = document.querySelector(`[data-related-book="${book.id}"]`)
    if (element) {
      continue
    }
    createBookCard(book.id);
    book.createBookElement();
    createRemoveButton(book.id);
    createRemoveListener(book.id);
    createReadButton(book.id);
    createReadListener(book.id);
  }
}

function createBookCard(bookId) {
  createDomElement( "div", "book-card", "", ".bookshelf", bookId)
}

function createRemoveButton(bookId) {
  createDomElement( "button", "removeButton", "Remove Book", ".book-card", bookId)
}

function createRemoveListener(bookId) {
  const removeButton = document.querySelector(`.removeButton[data-related-book="${bookId}"]`);
  removeButton.addEventListener("click", () => {
      removeBookFromLibrary(bookId)
    })
}

function createReadListener(bookId) {
  const readButton = document.querySelector(`.readButton[data-related-book="${bookId}"]`);
  readButton.addEventListener("click", () => {
      const index = findBookInLibrary(bookId);
      const book = myLibrary[index];
      book.read = (!book.read);
      book.updateBookDisplay();
      readButton.textContent = checkReadStatus(bookId);
    })
}

function createReadButton(bookId) {
  const readStatus = checkReadStatus(bookId);
  createDomElement( "button", "readButton", readStatus, ".book-card", bookId)
}

function checkReadStatus(bookId) {
  const index = findBookInLibrary(bookId);
  const book = myLibrary[index];
  return (book.read) ? "Mark as unread" : "Mark as read";
}


function removeBookFromLibrary(bookIdToRemove) {
  const index = findBookInLibrary(bookIdToRemove);
  if (index === -1) {
    console.log(`${bookIdToRemove} was not found in myLibrary`);
    return;
  }
  myLibrary.splice(index, 1);
  removeBookFromDisplay(bookIdToRemove)
}

function findBookInLibrary(bookId) {
  // UUID should be unique to each book
  const bookToFind = (book) => book.id === bookId;
  return myLibrary.findIndex(bookToFind);
}

function removeBookFromDisplay(bookIdToRemove) {
  const removeList = document.querySelectorAll(`[data-related-book="${bookIdToRemove}"]`);
  for (let element of removeList) {
    element.remove();
  }
}

// these are just filler books to display something
const intoTheWoods = addBookToLibrary("Into the Woods", "Stephen Sondheim", 138, false);
const nineteenEightyFour = addBookToLibrary("1984", "George Orwell", 328, false);
const artemisFowl = addBookToLibrary("Artemis Fowl", "Eoin Colfer", 277, false);
const holes = addBookToLibrary("Holes", "Louis Sachar", 233, false);

const newBookDialog = document.querySelector("dialog");
const startNewButton = document.querySelector(".new-book");
const cancelButton = document.querySelector(".cancel");
const addNewButton = document.querySelector(".add-book");

// "Show the dialog" button opens the dialog modally
startNewButton.addEventListener("click", () => {
  newBookDialog.showModal();
});

// "Close" button closes the dialog
cancelButton.addEventListener("click", () => {
  newBookDialog.close();
});

addNewButton.addEventListener("click", (e) => {
 const title = document.querySelector(`#book-title`)
 const author = document.querySelector(`#book-author`)
 const pages = document.querySelector(`#book-pages`)
 const read = document.querySelector(`#book-read`)

// must do this check as .preventDefault() will bypass required if returned here. Returning here displays the correct errors.
 if (!title.value || !author.value || !pages.value) {
  return;
 }
  addBookToLibrary( title.value, author.value, pages.value, read.checked);
  newBookDialog.close();
  e.preventDefault();
 title.value = "";
 author.value = "";
 pages.value = "";
 read.checked = false;
});

displayLibrary()