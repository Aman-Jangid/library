/* eslint-disable no-unused-vars */
// container elements
const containerEl = document.getElementById('container');
const bookListEl = containerEl.querySelector('.books_list');

// preview existing
const previewPanelEl = containerEl.querySelector('.preview_panel.see_existing');
// add book
const addBookPanelEl = containerEl.querySelector('.preview_panel.add_new');

// INPUT ELEMENTS
const imageInput = addBookPanelEl.querySelector('.get_imageUrl');
const bookTitleInput = document.getElementById('get_bookTitle');
const bookAuthorInput = document.getElementById('get_bookAuthor');
const bookLengthInput = document.getElementById('get_bookLength');
const bookPublishDateInput = document.getElementById('get_bookPublishDate');
const bookRatingInput = document.getElementById('get_bookRating');
const bookTagsInput = document.getElementById('get_bookTags');
// FORM BUTTONS
const addBookBtn = document.getElementById('addBook');
const statusBtns = addBookPanelEl.querySelectorAll('.get_status');

// INITIAL VALUES
let newStatus = 2;

const bookAdderEl = `<li class="book addnew">
<span>⊕</span>
<img src="images/AddNew.jpg" alt="add new book" />
</li>`;

statusBtns.forEach((statusBtn) =>
  statusBtn.addEventListener('click', () => {
    newStatus = statusBtn.value;
  })
);

statusBtns[newStatus - 1].style.cssText = 'color:red;';

let index = 1;

function Book(
  index,
  imageUrl,
  title,
  author,
  length,
  publishDate,
  rating,
  status,
  tags
) {
  this.index = index;
  this.imageUrl = imageUrl;
  this.title = title;
  this.author = author;
  this.length = length;
  this.publishDate = publishDate;
  this.rating = rating;
  this.status = status;
  this.tags = tags;
}

const books = [
  new Book(
    0,
    'https://upload.wikimedia.org/wikipedia/en/9/90/One_Piece%2C_Volume_61_Cover_%28Japanese%29.jpg',
    'One piece',
    'Eiichiro Oda',
    '1080 Chapters',
    1998,
    5,
    2,
    ['Action', 'Adventure', 'Fiction', 'Comedy']
  ),
  new Book(
    1,
    'https://m.media-amazon.com/images/I/A1E+USP9f8L.jpg',
    'The Hobbit',
    'J.R.R Tolkien',
    '300 Pages',
    1937,
    4,
    3,
    ['Adventure', 'High-Fantasy', 'Novel', 'Fiction']
  ),
];

//TO RENDER ALREADY EXISTING BOOKS
function renderBooks(books) {
  books.forEach((book, i) => {
    const bookEl = `<li class="book existing" data-index="${i}">
          <img
            src="${book.imageUrl}"
            alt="${book.title} coverArt"
          />
        </li>
          `;
    bookListEl.innerHTML += bookEl;
  });
}

// RENDERS EXISTING BOOKS
renderBooks(books);
bookListEl.innerHTML += bookAdderEl;

// GETS CALLED WHEN ADD-BOOK IS CLICKED ON..
addBookBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const tagsArr = [bookTagsInput.value.split(',')];

  //  pushing new book object to the books array
  books.push(
    new Book(
      books.length,
      imageInput.value,
      bookTitleInput.value,
      bookAuthorInput.value,
      bookLengthInput.value,
      parseInt(bookPublishDateInput.value),
      parseInt(bookRatingInput.value),
      parseInt(newStatus),
      tagsArr
    )
  );

  //  empties the array
  bookListEl.innerHTML = '';
  //   RENDER THE MODIFIED BOOKS ARRAY
  renderBooks(books);
  bookListEl.innerHTML += bookAdderEl;
});

const bookAddEl = bookListEl.querySelector('.book.addnew');
const booksEl = bookListEl.querySelectorAll('.book.existing');

let rating = '';

bookAddEl.addEventListener('click', () => {
  if (previewPanelEl.classList.contains('show')) {
    previewPanelEl.classList.remove('show');
    previewPanelEl.classList.add('hidden');
  }
  if (addBookPanelEl.classList.contains('hidden')) {
    addBookPanelEl.classList.remove('hidden');
    addBookPanelEl.classList.add('show');
  }
});

booksEl.forEach((book) =>
  book.addEventListener('click', () => {
    if (addBookPanelEl.classList.contains('show')) {
      addBookPanelEl.classList.remove('show');
      addBookPanelEl.classList.add('hidden');
    }
    if (previewPanelEl.classList.contains('hidden')) {
      previewPanelEl.classList.remove('hidden');
      previewPanelEl.classList.add('show');
    }

    previewPanelEl.innerHTML = '';
    rating = '';
    index = book.getAttribute('data-index');

    for (let i = 0; i < books[index].rating; i++) {
      rating += ' ★ ';
    }

    previewBook(books[book.getAttribute('data-index')]);
  })
);

let statusOf = 'hobbit';

function previewBook(book) {
  const appendBookInfo = `
<div class="preview_container">
            <div class="coverArt_container">
              <img
                class="brace"
                src="images/left_brace.webp"
                alt="left_brace"
              />
              <img
                src="${book.imageUrl}"
                alt="book cover art"
                class="cover_art"
              />
              <img
                class="brace"
                src="images/right_brace.webp"
                alt="right_brace"
              />
            </div>
            <div class="book_info">
              <span class="info_field book_title"
                >Title : <span>${book.title}</span></span>
              <span class="info_field book_author"
                >Author : <span>${book.author}</span></span>
              <span class="info_field book_length"
                >Length : <span>${book.length}</span></span>
              <span class="info_field book_release"
                >Published in : <span>${book.publishDate}</span></span>
              <span class="info_field book_rating"
                >Rating : <span>${rating}</span></span>
              <span>STATUS</span>
              <div class="book_read_status">
                <button id="completed" class="${
                  book.status === 1 ? 'active' : ''
                }">Completed</button>
                <button id="reading" class="${
                  book.status === 2 ? 'active' : ''
                }">Reading</button>
                <button id="wantToRead" 
                class="${
                  book.status === 3 ? 'active' : ''
                }">Want to read</button>
              </div>
              <span>TAGS</span>
              <div class="book_tags">
                ${book.tags
                  .map((tag) => `<span class='book_tag'>${tag}</span>`)
                  .join('')}
              </div>
            </div>
          </div>
`;

  previewPanelEl.innerHTML = appendBookInfo;
}

previewBook(books[index]);
