export class HeaderComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return `
            <div style="
                background-color: #16213e;
                width: 100%;
                height: 70px;
                position: fixed;
                top: 0;
                left: 0;
                display: flex;
                align-items: center;
                z-index: 1000;
            ">
                <span style="
                    color: white;
                    font-size: 24px;
                    font-weight: bold;
                    margin-left: 20px;
                ">🎬 КИНОПОРТАЛ</span>

                <a href="#" style="margin-left: 60px; font-size: 18px; color: white; text-decoration: none;" data-page="main">Главная</a>
                <a href="#" style="margin-left: 40px; font-size: 18px; color: white; text-decoration: none;" data-page="movies">Фильмы</a>
                <a href="#" style="margin-left: 40px; font-size: 18px; color: white; text-decoration: none;" data-page="series">Сериалы</a>
                <a href="#" style="margin-left: 40px; font-size: 18px; color: white; text-decoration: none;" data-page="actors">Актёры</a>
                <a href="#" style="margin-left: 40px; font-size: 18px; color: white; text-decoration: none;" data-page="calculator">Калькулятор</a>
                <a href="#" style="margin-left: 40px; font-size: 18px; color: white; text-decoration: none;" data-page="author">Об авторе</a>
            </div>
        `;
    }

    render() {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('afterbegin', html);
    }
}