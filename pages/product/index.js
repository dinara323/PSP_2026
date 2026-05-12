import { ProductComponent } from "../../components/product/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";
import { LikesComponent } from "../../components/likes/index.js";
import { moviesData } from "../../data.js";
import { ajax } from "../../modules/ajax.js";
import { stockUrls } from "../../modules/stockUrls.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
        this.data = null;
    }

    get pageRoot() { return document.getElementById('product-page'); }

    getHTML() {
        return `<div id="product-page" style="display: flex; flex-direction: column; align-items: center;"></div>`;
    }

    loadData() {
        ajax.get(stockUrls.getStockById(this.id), (data) => {
            this.data = data;
            this.renderContent();
        });
    }

    renderContent() {
        if (!this.data) return;
        const container = this.pageRoot;
        container.innerHTML = '';
        
        const stock = new ProductComponent(container);
        stock.render(this.data);

        const likesData = this.getLikesData();
        const likes = new LikesComponent(container, this.id, likesData.likes, likesData.dislikes);
        likes.render();

        // КНОПКА УДАЛЕНИЯ
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '🗑️ Удалить фильм';
        deleteBtn.style.cssText = `
            background-color: #dc3545;
            color: white;
            border: none;
            border-radius: 8px;
            padding: 10px 20px;
            cursor: pointer;
            margin: 10px;
            font-size: 16px;
        `;
        deleteBtn.onclick = () => {
            if (confirm(`Удалить фильм "${this.data.title}"?`)) {
                ajax.delete(stockUrls.deleteStockById(this.id), (data, status) => {
                    if (status === 204) {
                        alert('Фильм удалён!');
                        new MainPage(this.parent).render();
                    } else {
                        alert('Ошибка при удалении');
                    }
                });
            }
        };
        container.appendChild(deleteBtn);

        const backButton = new BackButtonComponent(container);
        backButton.render(this.clickBack.bind(this));
    }

    clickBack() { new MainPage(this.parent).render(); }

    getLikesData() {
        const saved = JSON.parse(localStorage.getItem('movieLikes')) || {};
        const movieInfo = moviesData[this.id];
        if (saved[this.id]) return { likes: saved[this.id].likes, dislikes: saved[this.id].dislikes };
        return { likes: movieInfo ? movieInfo.likes : 0, dislikes: movieInfo ? movieInfo.dislikes : 0 };
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        this.loadData();
    }
}