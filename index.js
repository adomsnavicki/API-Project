import { createHeader } from "./header.js";
import { createPostsListElement } from "./createdFunctions.js";

const pageContent = document.getElementById("page-content");
const header = createHeader();
pageContent.before(header);

const res = await fetch(
  "https://jsonplaceholder.typicode.com/posts?_limit=15&_expand=user"
);
const posts = await res.json();

const postList = createPostsListElement(posts);
pageContent.append(postList);

const res1 = await fetch(
  `https://jsonplaceholder.typicode.com/users?_embed=posts`
);
const users = await res1.json();
const usersList = createPostsListElement(users);
pageContent.append(usersList);
