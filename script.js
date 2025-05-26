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
}

Book.prototype.info = function() {
  return `${this.title} by ${this.author}, ${this.pages} pages, ` + (this.read ? "have read" : "have not read yet");
};

Book.prototype.createBookElement = function(){
  createDomElement( "div", "bookInfo", this.info(), ".book-card", this.id);
}

Book.prototype.updateBookDisplay = function(){
  const element = document.querySelector(`.bookInfo[data-related-book="${this.id}"]`);
  element.textContent = this.info();
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
      removeBookFromArray(bookId)
    })
}

function createReadListener(bookId) {
  const readButton = document.querySelector(`.readButton[data-related-book="${bookId}"]`);
  readButton.addEventListener("click", () => {
      const index = findBookInArray(bookId);
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
  const index = findBookInArray(bookId);
  const book = myLibrary[index];
  return (book.read) ? "Mark as unread" : "Mark as read";
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