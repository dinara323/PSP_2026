import { ProductCardComponent } from "../../components/product-card/index.js";
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
            <div id="main-page" class="d-flex flex-wrap justify-content-center gap-3"></div>
        `;
    }

    getData() {
        return [
            {
                id: 1,
                src: "https://i.pinimg.com/originals/c9/ea/65/c9ea654eb3a7398b1f702c758c1c4206.jpg",
                title: "Акция 1",
                text: "Такой акции вы еще не видели 1"
            },
            {
                id: 2,
                src: "https://i.pinimg.com/originals/c9/ea/65/c9ea654eb3a7398b1f702c758c1c4206.jpg",
                title: "Акция 2",
                text: "Такой акции вы еще не видели 2"
            },
            {
                id: 3,
                src: "https://i.pinimg.com/originals/c9/ea/65/c9ea654eb3a7398b1f702c758c1c4206.jpg",
                title: "Акция 3",
                text: "Такой акции вы еще не видели 3"
            },
            {
                id: 4,
                src: "https://i.pinimg.com/originals/c9/ea/65/c9ea654eb3a7398b1f702c758c1c4206.jpg",
                title: "Акция 4",
                text: "Такой акции вы еще не видели 4"
            },
        ];
    }

    clickCard(e) {
        const cardId = e.target.dataset.id;
        console.log("Нажата карточка с id:", cardId);
        alert(`Вы нажали на карточку №${cardId}`);
    }

    // Обработчик переключения вкладок
    onNavClick(page) {
        console.log("Переход на страницу:", page);
        
        // Меняем активный класс у ссылок
        const links = document.querySelectorAll('.nav-link');
        links.forEach(link => {
            if (link.dataset.page === page) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Меняем содержимое страницы в зависимости от выбранной вкладки
        const mainContainer = this.pageRoot;
        
        switch(page) {
            case 'main':
                this.renderCards();
                break;
            case 'catalog':
                mainContainer.innerHTML = '<h2 class="text-center w-100">Каталог товаров</h2><p class="text-center w-100">Здесь будет каталог...</p>';
                break;
            case 'about':
                mainContainer.innerHTML = '<h2 class="text-center w-100">О нас</h2><p class="text-center w-100">Мы лучший магазин!</p>';
                break;
            case 'contacts':
                mainContainer.innerHTML = '<h2 class="text-center w-100">Контакты</h2><p class="text-center w-100">Email: shop@example.com<br>Телефон: +7 (123) 456-78-90</p>';
                break;
            default:
                this.renderCards();
        }
    }

    renderCards() {
        const mainContainer = this.pageRoot;
        mainContainer.innerHTML = '';
        
        const data = this.getData();
        data.forEach((item) => {
            const productCard = new ProductCardComponent(mainContainer);
            productCard.render(item, this.clickCard.bind(this));
        });
    }

    render() {
        this.parent.innerHTML = '';
        
        // Добавляем шапку
        const header = new HeaderComponent(this.parent);
        header.render(this.onNavClick.bind(this));
        
        // Добавляем контейнер для карточек
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        
        // Отрисовываем карточки
        this.renderCards();
    }
}