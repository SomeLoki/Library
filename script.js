const myLibrary = [];

function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call this constructor");
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
  this.favorite = false;
}

Book.prototype.info = function() {
  return `${this.title} by ${this.author}, ${this.pages} pages, ` + (this.read ? "have read" : "have not read yet");
};

Book.prototype.createBookElement = function(){
  createElement( "div", "bookInfo", this.info(), ".book-card", this.id);
}

const createElement = function( element, elementClass, textContent, appendTo, associateBook) {
  const elem = document.createElement(element);
  // this is to always select the last book-card
  const parent = document.querySelector(`${appendTo}:last-of-type`);
  if (elementClass) {
    elem.classList.add(elementClass);
  }
  if (associateBook) {
    elem.setAttribute("data-related-book", associateBook);
  }
  elem.textContent = textContent;
  parent.appendChild(elem);
}

function displayLibrary() {
  for ( const book in myLibrary) {
    // check if the book already is displayed
    const currentBook = myLibrary[book];
    const elem = document.querySelector(`[data-related-book="${currentBook.id}"]`)
    if (elem) {
      continue
    }
    createBookCard(currentBook.id);
    currentBook.createBookElement();
    createRemoveButton(currentBook.id);
    createFavButton(currentBook.id);
  }
}

function addBookToLibrary( title, author, pages, read) {
  const newBook = new Book( title, author, pages, read);
  myLibrary.push(newBook);
  displayLibrary();
};

function displayLibrary() {
  for ( const book in myLibrary) {
    // check if the book already is displayed
    const currentBook = myLibrary[book];
    const elem = document.querySelector(`[data-related-book="${currentBook.id}"]`)
    if (elem) {
      continue
    }
    createBookCard(currentBook.id);
    currentBook.createBookElement();
    createRemoveButton(currentBook.id);
    createRemoveListener(currentBook.id);
    createFavButton(currentBook.id);
    createFavListener(currentBook.id);
  }
}

function createBookCard(associateBook) {
  createElement( "div", "book-card", "", ".bookshelf", associateBook)
}

function createRemoveButton(associateBook) {
  createElement( "button", "removeButton", "Remove Book", ".book-card", associateBook)
}

function createRemoveListener(associateBook) {
  const removeButton = document.querySelector(`.removeButton[data-related-book="${associateBook}"]`);
  removeButton.addEventListener("click", () => {
      removeBookFromArray(associateBook)
    })
}

function createFavListener(associateBook) {
  const favButton = document.querySelector(`.favButton[data-related-book="${associateBook}"]`);
  favButton.addEventListener("click", () => {
      const index = findBookInArray(associateBook);
      const book = myLibrary[index];
      book.favorite = (!book.favorite);
    })
}

function createFavButton(associateBook) {
  createElement( "button", "favButton", "PLACEHOLDER", ".book-card", associateBook)
}

function removeBookFromArray(bookIdToRemove) {
  const index = findBookInArray(bookIdToRemove);
  if (index === -1) {
    console.log(`${bookIdToRemove} was not found in myLibrary`);
    return;
  }
  myLibrary.splice(index, 1);
  removeBookFromDisplay(bookIdToRemove)
}

function findBookInArray(bookId) {
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

// these are tests to remove later
const theHobbit = addBookToLibrary("The Hobbit", "J.R.R Tolkien", 295, false);
const the = addBookToLibrary("The ", "J.R.R Tolkien", 295, false);
const hobbit = addBookToLibrary("Hobbit", "J.R.R Tolkien", 295, false);
const obbit = addBookToLibrary("The test", "J.R.R Tolkien", 295, false);

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