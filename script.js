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

// use this later for creating buttons
/* function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call this constructor");
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
} */

Book.prototype.info = function() {
  return `${this.title} by ${this.author}, ${this.pages} pages, ` + (this.read ? "have read" : "have not read yet");
};

const createElement = function( element, elementClass, textContent, appendTo, associateBook) {
  const elem = document.createElement(element);
  // this is to always select the last book-card
  const parent = document.querySelector(`${appendTo}:last-of-type`);
  if (!textContent) {
    textContent = "";
  }
  if (elementClass) {
    elem.classList.add(elementClass);
  }
  if (associateBook) {
    elem.setAttribute("data-related-book", associateBook);
  }
  elem.textContent = textContent;
  parent.appendChild(elem);
}

function addBookToLibrary( title, author, pages, read) {
  const newBook = new Book( title, author, pages, read);
  myLibrary.push(newBook);
};

function displayLibrary() {
  for ( const book in myLibrary) {
  
    createBookCard(myLibrary[book].id);
    createElement( "div", "", myLibrary[book].info(), ".book-card", myLibrary[book].id);
  }
}

function removeBook(bookToRemove) {
  const removeList = document.querySelectorAll(`[data-related-book="${bookToRemove}"]`);
  for (let element of removeList) {
    element.remove();
}
}

function createBookCard(associateBook) {
  createElement( "div", "book-card", "", ".bookshelf", associateBook)
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
 const title = document.querySelector(`#book-title`).value
 const author = document.querySelector(`#book-author`).value
 const pages = document.querySelector(`#book-pages`).value
 const read = document.querySelector(`#book-read`).value
 if (!title || !author || !pages) {
  return;
 }
  addBookToLibrary( title, author, pages, read);
  newBookDialog.close();
  e.preventDefault();
});

displayLibrary()