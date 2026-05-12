import { ajax } from "../../modules/ajax.js";
import { stockUrls } from "../../modules/stockUrls.js";
import { MainPage } from "../main/index.js";
import { HeaderComponent } from "../../components/header/index.js";

export class CreatePage {
    constructor(parent) { this.parent = parent; }

    getHTML() {
        return `
            <div style="max-width: 600px; margin: 50px auto; padding: 20px;">
                <h1 style="text-align: center;">➕ Добавить новый фильм</h1>
                <form id="createForm">
                    <div style="margin-bottom: 15px;">
                        <label>Название:</label>
                        <input type="text" id="title" required style="width: 100%; padding: 8px; margin-top: 5px;">
                    </div>
                    <div style="margin-bottom: 15px;">
                        <label>URL картинки:</label>
                        <input type="text" id="src" value="movie1.png" style="width: 100%; padding: 8px; margin-top: 5px;">
                    </div>
                    <div style="margin-bottom: 15px;">
                        <label>Описание:</label>
                        <textarea id="text" rows="3" required style="width: 100%; padding: 8px; margin-top: 5px;"></textarea>
                    </div>
                    <div style="display: flex; gap: 10px;">
                        <button type="submit" style="background: #28a745; color: white; padding: 10px 20px; border: none; border-radius: 8px;">💾 Сохранить</button>
                        <button type="button" id="cancelBtn" style="background: #6c757d; color: white; padding: 10px 20px; border: none; border-radius: 8px;">❌ Отмена</button>
                    </div>
                </form>
            </div>
        `;
    }

    render() {
        this.parent.innerHTML = '';
        new HeaderComponent(this.parent).render();
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        
        const form = document.getElementById('createForm');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const newMovie = {
                title: document.getElementById('title').value,
                src: document.getElementById('src').value,
                text: document.getElementById('text').value
            };
            
            ajax.post(stockUrls.createStock(), newMovie, (data, status) => {
                if (status === 201) {
                    alert('Фильм добавлен!');
                    new MainPage(this.parent).render();
                } else {
                    alert('Ошибка при добавлении');
                }
            });
        });
        
        document.getElementById('cancelBtn').onclick = () => {
            new MainPage(this.parent).render();
        };
    }
}