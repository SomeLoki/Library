let myLibrary = [];

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

const createElement = function( element, elementClass, textContent, appendTo, elementId) {
  const elem = document.createElement(element);
  // this is to always select the last book-card
  const parent = document.querySelector(`${appendTo}:last-of-type`);
  if (!textContent) {
    textContent = "";
  }
  if (elementClass) {
    elem.classList.add(elementClass);
  }
  if (elementId) {
    elem.id = elementId;
  }
  elem.textContent = textContent;
  parent.appendChild(elem);
}

function addBookToLibrary( title, author, pages, read) {
  const newBook = new Book( title, author, pages, read);
  console.log(newBook);
  myLibrary.push(newBook);
};

function displayLibrary() {
  // rare instance of using for (...in...) need the index not the full book object
  for ( const book in myLibrary) {
    createBookCard();
    createElement( "div", "", myLibrary[book].info(), ".book-card", myLibrary[book].id);
  }
}

function createBookCard() {
  createElement( "div", "book-card", "", ".bookshelf")
}

const theHobbit = addBookToLibrary("The Hobbit", "J.R.R Tolkien", 295, false);
const the = addBookToLibrary("The ", "J.R.R Tolkien", 295, false);
const hobbit = addBookToLibrary("Hobbit", "J.R.R Tolkien", 295, false);
const obbit = addBookToLibrary("The test", "J.R.R Tolkien", 295, false);

console.log(theHobbit);
console.log(myLibrary);
console.log(myLibrary[0].info());

const newBookDialog = document.querySelector("dialog");
const newButton = document.querySelector(".new-book");
const cancelButton = document.querySelector(".cancel");

// "Show the dialog" button opens the dialog modally
newButton.addEventListener("click", () => {
  newBookDialog.showModal();
});

// "Close" button closes the dialog
cancelButton.addEventListener("click", () => {
  newBookDialog.close();
});