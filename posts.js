import { createHeader } from "./header.js";

async function init() {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=15&_expand=user"
  );
  const posts = await res.json();

  const pageContent = document.getElementById("page-content");
  const header = createHeader();
  const postList = createPostsListElement(posts);
  pageContent.append(postList);
  pageContent.before(header);
}

export function createPostsListElement(posts) {
  const userWrapDiv = document.createElement("div");
  posts.map((post) => {
    const usersUlElement = document.createElement("ul");
    const usersLiElement = document.createElement("li");

    const linkElement = document.createElement("a");
    const userLinkElement = document.createElement("a");

    userWrapDiv.append(usersUlElement);
    usersUlElement.append(usersLiElement);
    usersLiElement.append(linkElement, userLinkElement);

    linkElement.textContent = `${post.title} - `;
    userLinkElement.textContent = `(${post.user.name})`;

    linkElement.href = "./post.html?post_id=" + post.id;
    userLinkElement.href = "./user.html?user_id=" + post.user.id;
  });
  return userWrapDiv;
}

init();
