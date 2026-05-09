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

    get pageRoot() {
        return document.getElementById('product-page');
    }

    getHTML() {
        return `
            <div id="product-page" style="display: flex; flex-direction: column; align-items: center;"></div>
        `;
    }

    loadData() {
        ajax.get(stockUrls.getStockById(this.id), (data) => {
            this.data = data;
            this.renderContent();
        });
    }

    renderContent() {
        if (!this.data) return;
        
        // Очищаем только контент, но не кнопку "Назад"
        const productContainer = this.pageRoot;
        productContainer.innerHTML = '';
        
        const stock = new ProductComponent(productContainer);
        stock.render(this.data);

        const likesData = this.getLikesData();
        const likes = new LikesComponent(productContainer, this.id, likesData.likes, likesData.dislikes);
        likes.render();

        const backButton = new BackButtonComponent(productContainer);
        backButton.render(this.clickBack.bind(this));
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    getLikesData() {
        const saved = JSON.parse(localStorage.getItem('movieLikes')) || {};
        const movieInfo = moviesData[this.id];
        
        if (saved[this.id]) {
            return {
                likes: saved[this.id].likes,
                dislikes: saved[this.id].dislikes
            };
        }
        
        return {
            likes: movieInfo ? movieInfo.likes : 0,
            dislikes: movieInfo ? movieInfo.dislikes : 0
        };
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        this.loadData();
    }
}