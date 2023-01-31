const books = [];
const RENDER_EVENT = "render-book";
const SAVED_EVENT = "saved-book";
const STORAGE_KEY = "BOOK_APPS";


function generateId(){
    return +new Date();
}

function generateBookObject(id, book, author, year, isComplete){
    return{
        id: +new Date(),
        book,
        author,
        year,
        isComplete
    }
}

function createBook(bookObject){

  const textTitle = document.createElement("h3");
  textTitle.innerText = bookObject.book;

  const textAuthor = document.createElement("p");
  textAuthor.innerText = bookObject.author;

  const textYear = document.createElement("p");
  textYear.innerText = bookObject.year;

  const textContainer = document.createElement("div");
  textContainer.classList.add("action")
  textContainer.append(textTitle,textAuthor,textYear);

  const container = document.createElement("div");
  container.classList.add("book_item")
  container.append(textContainer);
  container.setAttribute("id", `book-${bookObject.id}`);

  const trashButton = document.createElement("button");
  trashButton.classList.add("red");
  trashButton.innerText = "Hapus Buku";
  trashButton.addEventListener("click", function(){
      alert("anda ingin menghapus buku?");
      removeBookFromCompleted(bookObject.id);
  });



















document.addEventListener('DOMContentLoaded', function () {
  const submitForm = document.getElementById('inputBook');

  submitForm.addEventListener('submit', function (event) {
    event.preventDefault();
    addBookshelf();
  });

  if (isStorageIn()) {
    loadDataFromStorage();
  }
});

function addBookshelf() {
  const textJudul = document.getElementById('inputBookTitle').value;
  const textPenulis = document.getElementById('inputBookAuthor').value;
  const numberTahun = document.getElementById('inputBookYear').value;

  const generatedID = fgeneratedID();
  const BookshelfObject = generateBookshelfObject(generatedID, textJudul, textPenulis, numberTahun, false);
  bself.push(BookshelfObject);

  document.dispatchEvent(new Event(BOOKSHELF_EVENT));
  saveDataBookshelf();
}

function fgeneratedID() {
  return new Date();
}

function generateBookshelfObject(id, judul, penulis, tahun, isCompleted) {
  return {
    id,
    judul,
    penulis,
    tahun,
    isCompleted,
  };
}

const bself = [];
const BOOKSHELF_EVENT = 'render-bookshelf';

document.addEventListener(BOOKSHELF_EVENT, function () {
  console.log(bself);
  const newBookshelfList = document.getElementById('incompleteBookshelfList');
  newBookshelfList.innerHTML = '';

  const finishBookshelfList = document.getElementById('completeBookshelfList');
  finishBookshelfList.innerHTML = '';

  for (bookshelfItem of bself) {
    const bookshelfElement = makeBookshelf(bookshelfItem);
    if (bookshelfItem.isCompleted == false) newBookshelfList.append(bookshelfElement);
    else finishBookshelfList.append(bookshelfElement);
  }
});

function makeBookshelf(BookshelfObject) {
  const createJudul = document.createElement('h3');
  createJudul.innerText = BookshelfObject.judul;

  const createPenulis = document.createElement('p');
  createPenulis.innerText = `Penulis : ${BookshelfObject.penulis} `;

  const createTahun = document.createElement('p');
  createTahun.innerText = `Tahun : ${BookshelfObject.tahun} `;

  const createContainer = document.createElement('div');
  createContainer.append(createJudul, createPenulis, createTahun);

  const container = document.createElement('div');
  container.classList.add('book_item');
  container.append(createContainer);
  container.setAttribute('id', `${BookshelfObject.id}`);

  if (BookshelfObject.isCompleted) {
    const undoButton = document.createElement('button');
    undoButton.innerText = 'Belum Selesai dibaca';
    undoButton.classList.add('green');
    undoButton.addEventListener('click', function () {
      undoTaskFromCompleted(BookshelfObject.id);
    });

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Hapus Buku';
    deleteButton.classList.add('red');
    deleteButton.addEventListener('click', function () {
      removeTaskFromCompleted(BookshelfObject.id);
    });

    container.append(undoButton, deleteButton);
  } else {
    const deleteButton2 = document.createElement('button');
    deleteButton2.innerText = 'Hapus Buku';
    deleteButton2.classList.add('red');
    deleteButton2.addEventListener('click', function () {
      removeTaskFromCompleted(BookshelfObject.id);
    });

    const checkButton = document.createElement('button');
    checkButton.innerText = 'Selesai Dibaca';
    checkButton.classList.add('blue');
    checkButton.addEventListener('click', function () {
      addTaskToCompleted(BookshelfObject.id);
    });

    container.append(checkButton, deleteButton2);
  }

  return container;
}

function addTaskToCompleted(bookshelfId) {
  const bookselfTarget = findBookshelf(bookshelfId);
  if (bookselfTarget == null) return;

  bookselfTarget.isCompleted = true;
  document.dispatchEvent(new Event(BOOKSHELF_EVENT));
  saveDataBookshelf();
}

function findBookshelf(bookshelfId) {
  for (bookshelfItem of bself) {
    if (bookshelfItem.id === bookshelfId) {
      return bookshelfItem;
    }
  }
  return null;
}

function removeTaskFromCompleted(bookshelfId) {
  const bookselfTarget = findTodoIndex(bookshelfId);
  if (bookselfTarget === -1) return;
  bself.splice(bookselfTarget, 1);

  document.dispatchEvent(new Event(BOOKSHELF_EVENT));
  saveDataBookshelf();
}

function findTodoIndex(bookshelfId) {
  for (index in bself) {
    if (bself[index].id === bookshelfId) {
      return index;
    }
  }
  return -1;
}

function undoTaskFromCompleted(bookshelfId) {
  const bookselfTarget = findBookshelf(bookshelfId);
  if (bookselfTarget == null) return;

  bookselfTarget.isCompleted = false;
  document.dispatchEvent(new Event(BOOKSHELF_EVENT));
  saveDataBookshelf();
}

function saveDataBookshelf() {
  if (isStorageIn()) {
    const parsedStorage = JSON.stringify(bself);
    localStorage.setItem(STORAGE_KEY, parsedStorage);
    document.dispatchEvent(new Event(SAVED_STORAGE));
  }
}

const SAVED_STORAGE = 'saved_Bookshelf';
const STORAGE_KEY = 'BOOKSHELF_APP';

function isStorageIn() {
  if (typeof Storage === undefined) {
    alert('Browser Tidak mendukung local Storage');
    return false;
  }
  return true;
}

document.addEventListener(SAVED_STORAGE, function () {
  console.log(localStorage.getItem(STORAGE_KEY));
});

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);

  let data = JSON.parse(serializedData);

  if (data !== null) {
    for (todo of data) {
      bself.push(todo);
    }
  }

  document.dispatchEvent(new Event(BOOKSHELF_EVENT));
}
