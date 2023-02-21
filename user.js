import { createHeader } from "./header.js";
async function init() {
  const urlParams = new URLSearchParams(location.search);
  const userId = urlParams.get("user_id");

  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}/?_embed=posts&_embed=albums`
  );
  const user = await res.json();
  const pageContent = document.getElementById("page-content");
  const header = createHeader();
  pageContent.before(header);

  let { name, email, phone, username, website, posts, albums } = user;
  let { city, street, suite, zipcode } = user.address;
  let { lat, lng } = user.address.geo;
  console.log(user.address.geo);
  let companyName = user.company.name;

  const userH1 = document.createElement("h1");
  userH1.classList.add("user-title");
  userH1.textContent = "User :";
  const userDiv = document.createElement("div");
  userDiv.classList.add("user-information");
  const userUl = document.createElement("ul");
  const userFullNameLi = document.createElement("li");
  const userUserNameLi = document.createElement("li");
  const userEmailLi = document.createElement("li");
  const userAddressLi = document.createElement("li");
  const userAddressLink = document.createElement("a");
  const userPhoneLi = document.createElement("li");
  const userWebsiteLi = document.createElement("li");
  const userCompanyNameLi = document.createElement("li");

  userFullNameLi.textContent = name;
  userUserNameLi.textContent = username;
  userEmailLi.textContent = email;
  userAddressLink.textContent = `${city}  ${street}  ${suite}  ${zipcode}`;
  userAddressLink.href = `https://www.google.com/maps/place/${lat}+${lng} `;
  userAddressLink.target = "_blank";
  userPhoneLi.textContent = phone;
  userWebsiteLi.textContent = website;
  userCompanyNameLi.textContent = companyName;

  userDiv.append(userUl);
  userUl.append(
    userFullNameLi,
    userUserNameLi,
    userEmailLi,
    userAddressLi,
    userPhoneLi,
    userWebsiteLi,
    userCompanyNameLi
  );
  userAddressLi.append(userAddressLink);
  const userPostH1 = document.createElement("h2");
  userPostH1.classList.add("posts-title");
  userPostH1.textContent = "Posts :";
  const userPostWrapDiv = document.createElement("div");
  userPostWrapDiv.classList.add("user-post-wrap");

  posts.map((post) => {
    const userPostDiv = document.createElement("div");
    userPostDiv.classList.add("user-post");
    const userPostUl = document.createElement("ul");
    const userPostLi = document.createElement("li");
    const userPostLink = document.createElement("a");

    userPostDiv.append(userPostUl);
    userPostUl.append(userPostLi);
    userPostLi.append(userPostLink);
    userPostLink.href = "./post.html?post_id=" + post.id;
    userPostLink.textContent = post.title;
    userPostWrapDiv.append(userPostDiv);
  });
  const userAlbumsH2 = document.createElement("h3");
  userAlbumsH2.classList.add("albums-title");
  userAlbumsH2.textContent = "Albums :";
  const userAlbumWrapDiv = document.createElement("div");
  userAlbumWrapDiv.classList.add("user-album-wrap");
  albums.map((album) => {
    const userAlbumDiv = document.createElement("div");
    userAlbumDiv.classList.add("user-album");
    const userAlbumUl = document.createElement("ul");
    const userAlbumLi = document.createElement("li");
    const userAlbumLink = document.createElement("a");
    userAlbumDiv.append(userAlbumUl);
    userAlbumUl.append(userAlbumLi);
    userAlbumLi.append(userAlbumLink);
    userAlbumLink.href = "./album.html?album_id=" + album.id;
    userAlbumLink.textContent = album.title;
    userAlbumWrapDiv.append(userAlbumDiv);
  });

  pageContent.append(
    userH1,
    userDiv,
    userPostH1,
    userPostWrapDiv,
    userAlbumsH2,
    userAlbumWrapDiv
  );
}
init();
