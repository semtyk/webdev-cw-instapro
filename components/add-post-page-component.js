import { renderUploadImageComponent } from "./upload-image-component.js";
import { renderHeaderComponent } from "./header-component.js";

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  let imageUrl = "";

  const render = () => {
    // TODO: Реализовать страницу добавления поста ++
    const appHtml = `
<div class="page-container">
          <div class="header-container"></div>
          <div class="form">
              <h3 class="form-title">
                Добавить пост
              </h3>
              <div class="form-inputs">
                      <div class="upload-image-container"></div>
                      <label>
                      Опишите фото
                        <textarea
                          class="input textarea"
                          rows="4"
                          id = "comment_text"
                        ></textarea>
                      </label>
                  <div class="form-error"></div>
                  
                  <button class="button" id="add-button">Добавить</button>
              </div>
  
          </div>
 </div>
  `;

    appEl.innerHTML = appHtml;

    const setError = (message) => {
      appEl.querySelector(".form-error").textContent = message;
    };

    //Рендерим шапку
    renderHeaderComponent({
      element: document.querySelector(".header-container"),
    });

    

    //Рендерим форму с загрузкой картинки и получаем ее URL
    const uploadImageContainer = appEl.querySelector(".upload-image-container");

    if (uploadImageContainer) {
      renderUploadImageComponent({
        element: appEl.querySelector(".upload-image-container"),
        onImageUrlChange(newImageUrl) {
          imageUrl = newImageUrl;
        },
      });
    }


    document.getElementById("add-button").addEventListener("click", () => {
      setError("");  //убираем ошибку (если была в прошлый раз)
      const textDesc = document.getElementById('comment_text').value;

      if (!imageUrl) {
        alert("Не выбрана фотография");
        return;
      }
      if (!textDesc) {
        alert('Введите описание');
        return;
      }

      onAddPostClick({
        description: textDesc,
        imgUrl: imageUrl
      });
    });
  };

  render();
}


