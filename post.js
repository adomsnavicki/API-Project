import { createHeader } from "./header.js";
async function init() {
  const urlParams = new URLSearchParams(location.search);
  const id = urlParams.get("post_id");

  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}?_embed=comments&_expand=user`
  );
  const post = await res.json();

  const pageContent = document.getElementById("page-content");
  const header = createHeader();
  pageContent.before(header);
  const authorName = document.createElement("a");
  authorName.textContent = post.user.name;
  authorName.href = `user.html?user_id=${post.user.id}`;
  let { title, body, comments } = post;
  const postTitle = document.createElement("h1");
  postTitle.textContent = `Post :`;
  const postDiv = document.createElement("div");
  postDiv.classList.add("post-wrapper");
  const postTitleH2 = document.createElement("h2");
  postTitleH2.classList.add("post-title");
  postTitleH2.textContent = title;

  const postBody = document.createElement("p");
  postBody.classList.add("post-body");
  postBody.textContent = body;

  postDiv.append(authorName, postTitleH2, postBody);
  const commentTitle = document.createElement("h2");
  commentTitle.textContent = "Comments :";
  const commentDiv = document.createElement("div");
  commentDiv.classList.add("comment-wrap");
  comments.map((comment) => {
    let { body, email, name } = comment;

    const commentTitle = document.createElement("h3");
    commentTitle.textContent = name;
    const commentBody = document.createElement("p");
    commentBody.classList.add("body");
    commentBody.textContent = body;
    const commentEmail = document.createElement("p");
    commentEmail.classList.add("email");
    commentEmail.textContent = email;
    const OtherPostsAuthor = document.createElement("a");
    OtherPostsAuthor.classList.add("author-posts");
    OtherPostsAuthor.textContent = "Other posts by the author";
    OtherPostsAuthor.href = "posts.html";
    commentDiv.append(
      commentTitle,
      commentBody,
      commentEmail,
      OtherPostsAuthor
    );
  });
  pageContent.append(postTitle, postDiv, commentTitle, commentDiv);
}

init();
