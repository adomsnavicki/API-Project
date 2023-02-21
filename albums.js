import { createHeader } from "./header.js";

async function init() {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/albums?_limit=30&_embed=photos&_expand=user"
  );
  const albums = await res.json();

  if (!albums.length || albums.length === 0) {
    return;
  }

  const pageContent = document.getElementById("page-content");
  const header = createHeader();
  const albumList = createAlbumList(albums);
  pageContent.append(albumList);
  pageContent.before(header);
}

function createAlbumList(albums) {
  const albumList = document.createElement("div");
  albumList.classList.add("albums-list");

  albums.map((album) => {
    const albumItem = createAlbumElement(album);

    albumList.append(albumItem);
  });
  return albumList;
}

function createAlbumElement(album) {
  const title = album.title;
  const name = album.user.name;
  const photosNumber = album.photos.length;
  const randomIndex = Math.floor(Math.random() * album.photos.length);
  const randomPhoto = album.photos[randomIndex];
  const randomPhotoUrl = randomPhoto.thumbnailUrl;
  const randomPhotoAlt = randomPhoto.title;

  const albumItemDiv = document.createElement("div");
  albumItemDiv.classList.add("album-item");
  const albumAElement = document.createElement("a");
  const albumH1Element = document.createElement("h1");
  const albumPElement = document.createElement("p");
  const albumPPhotoNumberElement = document.createElement("p");
  const imgElement = document.createElement("img");

  albumAElement.href = `./album.html?album_id=${album.id}`;
  imgElement.src = randomPhotoUrl;
  imgElement.alt = randomPhotoAlt;
  albumItemDiv.append(albumAElement);
  albumAElement.append(
    albumH1Element,
    albumPElement,
    albumPPhotoNumberElement,
    imgElement
  );
  albumH1Element.textContent = title;
  albumPElement.textContent = name;
  albumPPhotoNumberElement.textContent = `(${photosNumber})`;

  return albumItemDiv;
}

init();
