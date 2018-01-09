// Listen submission of the form
document.getElementById('form').addEventListener('submit', saveBookmark);

function saveBookmark(e) {
  var websiteName = document.getElementById('site-name').value;
  var websiteURL = document.getElementById('site-url').value;
  var bookmark = {
    name: websiteName,
    url: websiteURL
  }

  if (localStorage.getItem('bookmarks') === null) {
    var bookmarks = [];
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
  displayBookmarks();
  document.getElementById('form').reset(); // clear fields after submitting
  e.preventDefault(); // prevent submitting of the form
}

function displayBookmarks() {
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  var bookmarksResults = document.getElementById('bookmarks-saved');

  bookmarksResults.innerHTML = '';
  for (var i = 0; i < bookmarks.length; i++) {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;
    bookmarksResults.innerHTML += '<div class="well">' +
                                    '<h3>' + name +
                                        '<a class="btn btn-default" href="' + url + '" target="_blank">Visit' + '</a>' +
                                        '<a onclick="deleteBookmark(\'' + url + '\')" class="btn btn-danger" href="#">Delete' + '</a>' +
                                    '</h3>'  +
                                  '</div>';
  }
}

function deleteBookmark(url) {
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  for (var i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url === url) {
      bookmarks.splice(i, 1);
    }
  }
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  displayBookmarks();
}
