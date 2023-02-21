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
