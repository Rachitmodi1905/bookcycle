let usersBooks = JSON.parse(localStorage.getItem('usersBooks')) || [];

function displayBooks(booksToDisplay) {
  const bookList = document.getElementById('books');
  bookList.innerHTML = '';

  booksToDisplay.forEach((book, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <img class="book-photo" src="${book.image}" alt="Book Image" />
      <div class="book-info">
        <strong>${book.title}</strong><br>
        Class: ${book.class}<br>
        Condition: ${book.condition}<br>
        Location: ${book.location}<br>
        Price: ₹${book.price}<br>
        <small>Seller: ${book.username}</small>
      </div>
      <button class="delete-btn" onclick="deleteBook(${index})">Delete</button>
    `;
    bookList.appendChild(li);
  });
}

function addBook() {
  const username = document.getElementById('username').value.trim();
  const title = document.getElementById('title').value.trim();
  const price = document.getElementById('price').value.trim();
  const classValue = document.getElementById('class').value;
  const condition = document.getElementById('condition').value;
  const location = document.getElementById('location').value.trim();
  const imageInput = document.getElementById('image');

  if (!username || !title || !price || !classValue || !condition || !location) {
    alert('Please fill all fields');
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    const image = reader.result;
    const newBook = { username, title, price, class: classValue, condition, location, image: image || "" };
    usersBooks.push(newBook);
    localStorage.setItem('usersBooks', JSON.stringify(usersBooks));
    displayBooks(usersBooks);
    resetForm();
  };
  if (imageInput.files[0]) {
    reader.readAsDataURL(imageInput.files[0]);
  }
}

function resetForm() {
  document.getElementById('username').value = '';
  document.getElementById('title').value = '';
  document.getElementById('price').value = '';
  document.getElementById('class').value = '';
  document.getElementById('condition').value = '';
  document.getElementById('location').value = '';
  document.getElementById('image').value = '';
}

function deleteBook(index) {
  if (confirm("Are you sure you want to delete this book?")) {
    usersBooks.splice(index, 1);
    localStorage.setItem('usersBooks', JSON.stringify(usersBooks));
    displayBooks(usersBooks);
  }
}

function applyFilters() {
  const titleFilter = document.getElementById('filterTitle').value.toLowerCase();
  const classFilter = document.getElementById('filterClass').value;
  const conditionFilter = document.getElementById('filterCondition').value;
  const locationFilter = document.getElementById('filterLocation').value.toLowerCase();

  const filteredBooks = usersBooks.filter(book => {
    const isTitleMatch = book.title.toLowerCase().includes(titleFilter);
    const isClassMatch = classFilter ? book.class === classFilter : true;
    const isConditionMatch = conditionFilter ? book.condition === conditionFilter : true;
    const isLocationMatch = book.location.toLowerCase().includes(locationFilter);

    return isTitleMatch && isClassMatch && isConditionMatch && isLocationMatch;
  });

  displayBooks(filteredBooks);
}

function openChat() {
  alert("Live Chat Support is coming soon!\nMeanwhile, email us at support@secondhandbooks.com");
}
