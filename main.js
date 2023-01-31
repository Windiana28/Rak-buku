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

  if(bookObject.isComplete){

    const undoButton = document.createElement("button");
    undoButton.classList.add("green");
    undoButton.innerText = "Belum selesai dibaca";
    undoButton.addEventListener("click", function(){
        undoBookFromCompleted(bookObject.id);
    });

    container.append(undoButton,trashButton);
} else {
    
    const checkButton = document.createElement("button");
    checkButton.classList.add("green");
    checkButton.innerText = "Selesai Dibaca";
    checkButton.addEventListener("click", function(){
        addBookToCompleted(bookObject.id);
    });
    container.append(checkButton, trashButton);
}

return container;
}

function addBook(){
    
  const titleBook = document.getElementById("inputBookTitle").value;
  const authorBook = document.getElementById("inputBookAuthor").value;
  const yearBook = document.getElementById("inputBookYear").value;
  const checkBox = document.getElementById("inputBookIsComplete").checked;

  const generatedId = generateId();
  const bookObject = generateBookObject(generateId,titleBook,authorBook, +yearBook,checkBox);
  books.push(bookObject);

  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}




















