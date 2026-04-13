import { ProductComponent } from "../../components/product/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";
import { MoviePartsComponent } from "../../components/movie-parts/index.js"; // Импортируем новый компонент

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }

    getData() {
        const block = {
            1: {id: 1,
            src: "../../movie1.png",
            title: `Человек-паук`,
            text: "Выберете часть"
            },

            2: {id: 2,
            src: "../../movie2.png",
            title: `Голодные игры`,
            text: "Выберете часть"
            },

            3: {id: 3,
            src: "../../Shrek.jpg",
            title: `Шрек`,
            text: "Выберете часть"
            },

            4: {id: 4,
            src: "../../movie4.jpg",
            title: `Зверополис`,
            text: "Выберете часть"
            },
        }
        return block[this.id]
    }
    get pageRoot() {
        return document.getElementById('product-page');
    }

    getHTML() {
        return `
            <div id="product-page"></div>
        `;
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const data = this.getData();
        const stock = new ProductComponent(this.pageRoot);
        stock.render(data);

        const movieParts = new MoviePartsComponent(this.pageRoot, this.id);
        movieParts.render();

        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack.bind(this));

    }
}