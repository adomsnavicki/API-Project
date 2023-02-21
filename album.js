import { createHeader } from "./header.js";

async function init() {
  const urlParams = new URLSearchParams(location.search);
  const id = urlParams.get("album_id");

  const res = await fetch(
    `https://jsonplaceholder.typicode.com/albums/${id}?_expand=user&_embed=photos`
  );
  const album = await res.json();

  const header = createHeader();
  const pageContent = document.getElementById("page-content");
  pageContent.before(header);

  let { title, photos, user } = album;

  const albumWrap = document.createElement("div");
  albumWrap.classList.add("album-wrap");
  const albumTitle = document.createElement("h1");
  albumTitle.classList.add("album-title");
  albumTitle.textContent = title;
  const albumAuthor = document.createElement("a");
  albumAuthor.classList.add("author");
  albumAuthor.textContent = user.name;
  albumAuthor.href = `user.html?user_id=${user.id}`;

  albumWrap.append(albumTitle, albumAuthor);

  const albumPhotoWrap = document.createElement("div");
  albumPhotoWrap.classList.add("album-photo-wrapp");
  photos.map((photo) => {
    let { thumbnailUrl, url } = photo;
    const albumPhotoDiv = document.createElement("div");
    albumPhotoDiv.classList.add("album-content");

    const albumPhotoImg = document.createElement("img");
    albumPhotoImg.classList.add("album-photo");
    const imgLink = document.createElement("a");
    imgLink.href = url;
    albumPhotoImg.src = thumbnailUrl;
    imgLink.append(albumPhotoImg);

    albumPhotoDiv.append(imgLink);
    albumPhotoWrap.append(albumPhotoDiv);
  });
  pageContent.append(albumWrap, albumPhotoWrap);
}

init();
