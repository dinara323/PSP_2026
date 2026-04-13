import { ProductComponent } from "../../components/product/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";

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
            text: "Такого фильма вы еще не видели"
            },

            2: {id: 2,
            src: "../../movie2.png",
            title: `Голодные игры`,
            text: "Такого фильма вы еще не видели"
            },

            3: {id: 3,
            src: "../../Shrek.jpg",
            title: `Шрек`,
            text: "Такого фильма вы еще не видели"
            },

            4: {id: 4,
            src: "../../movie4.jpg",
            title: `Зверополис`,
            text: "Такого фильма вы еще не видели"
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

        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack.bind(this));

    }
}