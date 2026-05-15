import { CreatePage } from "../../pages/create/index.js";

export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        let imageStyle = 'width: 100%; height: 300px; object-fit: cover;';
        if (data.id === 2) {
            imageStyle += ' object-position: 13%;';
        }

        return `
            <div class="card" style="width: 400px; margin: 10px;">
                <img class="card-img-top" src="${data.src}" alt="картинка" style="${imageStyle}">
                <div class="card-body">
                    <h5 class="card-title">${data.title}</h5>
                    <p class="card-text">${data.text}</p>
                    <div style="display: flex; gap: 10px; justify-content: center;">
                        <button class="btn btn-primary" id="click-card-${data.id}" data-id="${data.id}">Выбрать фильм</button>
                        <button class="btn btn-secondary" id="edit-card-${data.id}" data-id="${data.id}">Редактировать</button>
                    </div>
                </div>
            </div>
        `;
    }

    addListeners(data, clickListener) {
        setTimeout(() => {
            const selectBtn = document.getElementById(`click-card-${data.id}`);
            if (selectBtn) {
                selectBtn.addEventListener("click", clickListener);
            }
            
            const editBtn = document.getElementById(`edit-card-${data.id}`);
            if (editBtn) {
                editBtn.addEventListener("click", (e) => {
                    const id = e.target.dataset.id;
                    const createPage = new CreatePage(this.parent, id);
                    createPage.render();
                });
            }
        }, 0);
    }

    render(data, clickListener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data, clickListener);
    }
}