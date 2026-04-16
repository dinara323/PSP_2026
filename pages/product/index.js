import { ProductComponent } from "../../components/product/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";
import { LikesComponent } from "../../components/likes/index.js";
import { moviesData } from "../../data.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }

    getData() {
        const block = {
            1: { id: 1, src: "../../movie1.png", title: "Человек-паук", text: "Фантастика, 121 мин, 12+" },
            2: { id: 2, src: "../../movie2.png", title: "Голодные игры", text: "Приключения, 142 мин, 18+" },
            3: { id: 3, src: "../../Shrek.jpg", title: "Шрек", text: "Мультфильм, 90 мин, 6+" },
            4: { id: 4, src: "../../movie4.jpg", title: "Зверополис", text: "Мультфильм, 108 мин, 6+" }
        };
        return block[this.id];
    }

    get pageRoot() {
        return document.getElementById('product-page');
    }

    getHTML() {
        return `
            <div id="product-page" style="display: flex; flex-direction: column; align-items: center;"></div>
        `;
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
            likes: movieInfo.likes,
            dislikes: movieInfo.dislikes
        };
    }

    render() {
        this.parent.innerHTML = '';
        
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const data = this.getData();
        const stock = new ProductComponent(this.pageRoot);
        stock.render(data);

        const likesData = this.getLikesData();
        const likes = new LikesComponent(this.pageRoot, this.id, likesData.likes, likesData.dislikes);
        likes.render();

        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack.bind(this));
    }
}