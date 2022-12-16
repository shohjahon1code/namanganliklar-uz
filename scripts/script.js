import { findElement, genereteTime } from "./helpers/helper.js";

const elNewsCard = findElement(".news__left");
const template = findElement("#template");
const elTopNews = findElement(".hero__articles");
const fragment = document.createDocumentFragment();

let posts = [];
let topPosts = [];
fetch(`https://639c0ef864fcf9c11caa1a4a.mockapi.io/posts`)
  .then((res) => res.json())
  .then((data) => {
    posts = data;
    renderPosts(posts);
    topPostHandler(posts);
  });

  function topPostHandler(posts) {
    const template = findElement("#post-temp");
    const fragment = document.createDocumentFragment();

  posts.reverse().forEach((post) => {
    elTopNews.textContent = ''
    if (post.top) {
      topPosts.push(post);
    }

    topPosts.reverse().forEach((tpost) => {
      const cloneTemplate = template.content.cloneNode(true);
      const img = findElement(".articles__items-img", cloneTemplate);
      const title = findElement(".articles__items-title", cloneTemplate);
      const time = findElement(".articles__items-time", cloneTemplate);

      img.src = tpost.img;
      title.textContent = tpost.title;
      fragment.append(cloneTemplate);
    });
    elTopNews.append(fragment);
  });
}

export function renderPosts(posts = posts, parentNode = elNewsCard) {
  parentNode.textContent = "";

  posts.reverse().forEach((post) => {
    const cloneTemplate = template.content.cloneNode(true);
    const elImg = findElement(".news__items-img", cloneTemplate);
    elImg.src = post.img;
    const elTitle = findElement(".items-div__title", cloneTemplate);
    elTitle.textContent = post.title;
    const elSubTitle = findElement(".items-div__text", cloneTemplate);
    elSubTitle.textContent = post.subTitle;
    const elTime = findElement(".time", cloneTemplate);
    elTime.textContent = genereteTime(post.createdAt);

    fragment.append(cloneTemplate);
  });
  parentNode.append(fragment);
}
