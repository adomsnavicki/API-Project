import { createSearchFrom } from "./searchForm.js";

export function createHeader(hideSearchForm) {
  const headerElement = document.createElement("header");
  const nav = document.createElement("nav");
  nav.classList.add("nav-navigation");
  const menuList = document.createElement("ul");
  menuList.classList.add("main-menu");

  const menuItems = [
    {
      title: "Home",
      path: "index.html",
    },
    {
      title: "Posts",
      path: "posts.html",
    },
    {
      title: "Users",
      path: "users.html",
    },
    {
      title: "Albums",
      path: "albums.html",
    },
  ];

  menuItems.forEach((item) => {
    let { title, path } = item;

    const itemElementLink = document.createElement("a");
    const itemElement = document.createElement("li");
    itemElement.classList.add("menu-item");
    itemElementLink.href = "./" + path;
    itemElementLink.append(itemElement);
    itemElementLink.textContent = title;

    if (location.pathname === "/" + path) {
      itemElementLink.classList.add("active");
    }

    itemElement.append(itemElementLink);
    menuList.append(itemElement);
  });

  nav.append(menuList);
  if (!hideSearchForm) {
    headerElement.append(createSearchFrom());
  }

  headerElement.append(nav);
  return headerElement;
}
