import { sendLikePost} from "./api.js";
import { getToken, renderApp} from "./index.js";


export function saveUserToLocalStorage(user) {
  window.localStorage.setItem("user", JSON.stringify(user));
}

export function getUserFromLocalStorage(user) {
  try {
    return JSON.parse(window.localStorage.getItem("user"));
  } catch (error) {
    return null;
  }
}

export function removeUserFromLocalStorage(user) {
  window.localStorage.removeItem("user");
}

export function letClearForm(form) {
  form.classList.remove('error');
};


//Функция для включения кнопки лайка под постом
export const initUpdateLikesListeners = (array) => {
  const token = getToken();
  const likeButtonsElements = document.querySelectorAll(".like-button");

  for (const likeButtonsElement of likeButtonsElements) {

    likeButtonsElement.addEventListener("click", () => {
      if ( token ) {
        likeButtonsElement.classList.add('-loading-like');
        const index = likeButtonsElement.dataset.index;
        return sendLikePost({ likeId: likeButtonsElement.dataset.postId, token: getToken(), activeLike: array[index].isLiked })
          .then((newPost) => {
            array[index] = newPost;
            renderApp();
          })
          .catch((error) => {
            console.error(error);
          });
      } else {console.log('Не авторизованным пользователям лайки не доступны');}
    })

  };
}



