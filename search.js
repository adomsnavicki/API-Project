import { API_URL } from "./config.js";
import { getParams, fetchData, firstLetterUpperCase } from "./functions.js";
import { createHeader } from "./header.js";
import { createSearchFrom } from "./searchForm.js";

async function init() {
  const searchQuery = getParams("q");
  const pageContent = document.querySelector("#page-content");
  const searchWrapper = document.createElement("div");
  searchWrapper.classList.add("search-wrapper");

  pageContent.before(createHeader(true));
  pageContent.append(createSearchFrom());
  pageContent.append(searchWrapper);

  if (!searchQuery) {
    return;
  }

  const users = await fetchData(`${API_URL}/users?q=${searchQuery}&_limit=10`);
  const posts = await fetchData(
    `${API_URL}/posts?q=${searchQuery}&_limit=10&_expand=user`
  );
  const albums = await fetchData(
    `${API_URL}/albums?q=${searchQuery}&_limit=10&_expand=user`
  );
  const comments = await fetchData(
    `${API_URL}/comments?q=${searchQuery}&_limit=10`
  );
  const photos = await fetchData(
    `${API_URL}/photos?q=${searchQuery}&_limit=10`
  );

  const usersSearchData = users.map((user) => {
    const userData = {
      title: user.name,
      path: "./user.html?user_id=" + user.id,
    };
    return userData;
  });
  const postsSearchData = posts.map((post) => {
    const postsData = {
      title: post.title,
      path: "./post.html?post_id=" + post.id,
    };
    return postsData;
  });
  const albumsSearchData = albums.map((album) => {
    const albumsData = {
      title: album.title,
      path: "./album.html?album_id=" + album.id,
    };
    return albumsData;
  });

  const commentsSearchData = comments.map((comment) => {
    const commentsData = {
      title: comment.body,
      path: "./post.html?post_id=" + comment.id,
    };

    return commentsData;
  });

  const photosSearchData = photos.map((photo) => {
    const photosData = {
      title: photo.title,
      path: "./album.html?album_id=" + photo.id,
    };

    return photosData;
  });

  const userResults = searchResults(usersSearchData, "Users:");
  const postsResults = searchResults(postsSearchData, "Posts:");
  const albumsResults = searchResults(albumsSearchData, "Albums:");
  const commentsResults = searchResults(commentsSearchData, "Comments:");
  const photosResults = searchResults(photosSearchData, "Photos:");

  searchWrapper.append(
    userResults,
    postsResults,
    albumsResults,
    commentsResults,
    photosResults
  );
}

function searchResults(dataArr, searchInput) {
  const resultWrapper = document.createElement("div");
  resultWrapper.classList.add("user-search-wrapper");
  const resultUl = document.createElement("ul");
  resultUl.classList.add("user-list");
  const resultTitle = document.createElement("h1");
  resultTitle.textContent = `${searchInput}(${dataArr.length})`;

  resultWrapper.append(resultTitle, resultUl);

  dataArr.map((item) => {
    const resultLiElement = document.createElement("li");
    const resultLink = document.createElement("a");
    resultLiElement.append(resultLink);

    resultLink.textContent = item.title;
    resultLink.href = item.path;

    resultUl.append(resultLiElement);
  });

  return resultWrapper;
}

init();
