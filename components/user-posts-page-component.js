import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage, user } from "../index.js";
import { initUpdateLikesListeners } from "../helpers.js";
import { delPost } from "../api.js";
import { getToken } from "../index.js";

export function renderUserPostsPageComponent({ appEl }) {

  console.log("Актуальный список постов юзера:", posts);

  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */
  //Преобразуем массив обьектов (каждый обьект - содержание поста) в элементы списка разметки

  const postsHtml = posts.map((item, index) => {
    return `<li class="post">
                    <div class="post-header" data-user-id=${item.user.id}>
                        <img src=${item.user.imageUrl} class="post-header__user-image">
                        <p class="post-header__user-name">${item.user.name}</p>
                    </div>
                    <div class="post-image-container">
                      <img class="post-image" src=${item.imageUrl}>
                    </div>
                    <div class="post-likes-with-del">
                    <div class="post-likes">
                      <button data-post-id=${item.id} data-index='${index}' class="like-button ">
                        ${item.isLiked ? '<img src="./assets/images/like-active.svg">' : '<img src="./assets/images/like-not-active.svg">'}
                      </button>
                      <p class="post-likes-text">
                        Нравится: <strong>${item.likes.length}</strong>
                      </p>
                    </div>
                    ${user && (user._id === item.user.id) ? `<div>
                      <a data-delete-id=${item.id} data-user-id=${item.user.id} class='deletePostButton'>Удалить</a>
                    </div>`: ''}
                    </div>
                    <p class="post-text">
                      <span class="user-name">${item.user.name}</span>
                      ${item.description}
                    </p>
                    <p class="post-date">
                      ${new Date(item.createdAt)}
                    </p>
                  </li>`
  }).join('');

  const appHtml = `
              <div class="page-container">
                <div class="header-container"></div>
                <ul class="posts">
                  ${postsHtml}
                </ul>
              </div>`;

  appEl.innerHTML = appHtml;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }

      const deleteButtons = document.querySelectorAll(".deletePostButton");
      for (const deleteButtonEl of deleteButtons) {
        deleteButtonEl.addEventListener("click", () => {
          const token = getToken();
          if (token) {
            return delPost({ PostId: deleteButtonEl.dataset.deleteId, token: getToken() })
              .then(() => {
                goToPage(USER_POSTS_PAGE, {
                  userId: deleteButtonEl.dataset.userId,
                });
              })
              .catch((error) => {
                console.error(error);
              });
          } else { console.log('Не авторизованным пользователям нельзя удалять посты'); }
        })
      };

  initUpdateLikesListeners(posts);
  //initDeletePost(USER_POSTS_PAGE);
}
