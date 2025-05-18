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
/*   this.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
  }; */
}

Book.prototype.info = function() {
  return `${this.title} by ${this.author}, ${this.pages} pages, ` + (this.read ? "have read" : "have not read yet");
};

const createElement = function( element, ElementID, textContent, appendTo) {
  if (!textContent) {
    textContent = "";
  }
  const elem = document.createElement(element);
  const parent = document.querySelector(`${appendTo}`);
  elem.id = `${ElementID}`;
  elem.textContent = textContent;
  parent.appendChild(elem);
}

function addBookToLibrary( title, author, pages, read) {
  const newBook = new Book( title, author, pages, read);
  console.log(newBook);
  myLibrary.push(newBook);
  return;
};



function displayLibrary() {
  for ( book of myLibrary) {
    createElement("div"

  }

}


const theHobbit = addBookToLibrary("The Hobbit", "J.R.R Tolkien", 295, false);


console.log(theHobbit);
console.log(myLibrary);
console.log(myLibrary[0].info());