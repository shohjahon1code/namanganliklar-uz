import { findElement } from "./helper.js";
const elForm = findElement("#form");

const elCardsAdmin = findElement(".hero__articles");
const cancelDeleteBtn = findElement(".btn--passive");
const deleteItemBtn = findElement(".btn--danger");
const elModal = findElement(".delete-item");
const elEditModal = findElement(".addNews-modal");
const backdrop = findElement(".backdrop");
const editForms = findElement(".forms");

let postsAd = [];

elForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = e.target.title.value;
  const subTitle = e.target.subtitle.value;
  const date = e.target.date.value;
  const image = e.target.image.value;
  const top = e.target.radio.checked;

  if (title == "" || subTitle === "" || date === "" || image === "") {
    alert("Please fill the form valid value");
    return;
  }

  const post = {
    createdAt: date,
    title: title,
    subTitle: subTitle,
    img: image,
    top: top,
  };

  fetch(`https://639c0ef864fcf9c11caa1a4a.mockapi.io/posts/`, {
    method: "POST",
    body: JSON.stringify(post),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      alert("Added succesfully");
      elForm.reset();
      window.location.href = "../../index.html";
    })
    .catch((err) => console.log(err));
});

fetch(`https://639c0ef864fcf9c11caa1a4a.mockapi.io/posts`)
  .then((res) => res.json())
  .then((data) => {
    postsAd = data;
    adminRender(postsAd);
  });

// render for admin panel
function adminRender(posts) {
  const template = findElement("#post-temp");
  const fragment = document.createDocumentFragment();
  elCardsAdmin.textContent = "";

  posts.reverse().forEach((post) => {
    const cloneTemplate = template.content.cloneNode(true);
    const img = findElement(".articles__items-img", cloneTemplate);
    const title = findElement(".articles__items-title", cloneTemplate);
    const time = findElement(".articles__items-time", cloneTemplate);
    const delBtn = findElement(".delete", cloneTemplate);
    const editBtn = findElement(".edit", cloneTemplate);
    const EditModal = findElement(".addNews-modal");
    // const

    img.src = post.img;
    title.textContent = post.title;
    time.textContent = post.createdAt;
    delBtn.dataset.id = post.id;
    editBtn.dataset.id = post.id;
    fragment.append(cloneTemplate);
  });
  elCardsAdmin.append(fragment);
}

//delete
elCardsAdmin.addEventListener("click", (e) => {
  if (e.target.matches(".delete")) {
    const id = e.target.dataset.id;
    showModal();

    deleteItemBtn.addEventListener("click", () => {
      fetch(`https://639c0ef864fcf9c11caa1a4a.mockapi.io/posts/${id}`, {
        method: "DELETE",
      })
        .then((data) => {
          alert("removed succesfully");
          location.reload();
        })
        .catch((err) => console.log(err));
      closeModal();
    });
  }
});

//edit
function showEditModal() {
  elEditModal.classList.add("active");
  backdrop.classList.add("visible");
}
// cancel
editForms.addEventListener("click", (e) => {
  if(e.target.textContent == 'Cancel'){
    elEditModal.classList.remove("active");
    backdrop.classList.remove("visible");
  }
});

elCardsAdmin.addEventListener("click", (e) => {
  if (e.target.matches(".edit")) {
    showEditModal();
  }
});

function showModal() {
  elModal.classList.add("active");
}

// close
function closeModal() {
  elModal.classList.remove("active");
}

cancelDeleteBtn.addEventListener("click", closeModal);
