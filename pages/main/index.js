import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";
import { HeaderComponent } from "../../components/header/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    getHTML() {
        return `
            <div class="container mt-4">
                <h1 class="mb-4">Выбор фильма</h1>
                <div id="main-page" class="d-flex flex-wrap justify-content-center"></div>
            </div>
        `;
    }

    getData() {
        return [
            {
                id: 1,
                src: "movie1.png",
                title: "Фильм 1",
                text: "Человек-паук"
            },
            {
                id: 2,
                src: "movie2.jpg",
                title: "Фильм 2",
                text: "Ледниковый период"
            },
            {
                id: 3,
                src: "Shrek.jpg",
                title: "Фильм 3",
                text: "Шрек"
            },

            {
                id: 4,
                src: "movie4.jpg",
                title: "Фильм 4",
                text: "Зверополис"
            }
        ];
    }

    clickCard(e) {
        const cardId = e.target.dataset.id;
        const productPage = new ProductPage(this.parent, cardId);
        productPage.render();
    }

    render() {
        this.parent.innerHTML = '';

        const header = new HeaderComponent(this.parent);
        header.render();

        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const data = this.getData();
        data.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot);
            productCard.render(item, this.clickCard.bind(this));
        });
    }
}