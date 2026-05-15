import { ajax } from "../../modules/ajax.js";
import { stockUrls } from "../../modules/stockUrls.js";
import { MainPage } from "../main/index.js";
import { HeaderComponent } from "../../components/header/index.js";

export class CreatePage {
    constructor(parent, id = null) {
        this.parent = parent;
        this.id = id; // ID для редактирования (если передан)
        this.isEdit = id !== null;
    }

    getHTML() {
        return `
            <div style="max-width: 600px; margin: 50px auto; padding: 20px;">
                <h1 style="text-align: center;">${this.isEdit ? '✏️ Редактировать фильм' : '➕ Добавить новый фильм'}</h1>
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
                        <!-- ❌ КНОПКИ СОХРАНИТЬ НЕТ! (только просмотр) -->
                        <button type="button" id="cancelBtn" style="background: #6c757d; color: white; padding: 10px 20px; border: none; border-radius: 8px;">❌ Назад</button>
                    </div>
                </form>
            </div>
        `;
    }

    loadDataForEdit() {
        if (this.isEdit) {
            ajax.get(stockUrls.getStockById(this.id), (data) => {
                document.getElementById('title').value = data.title || '';
                document.getElementById('src').value = data.src || '';
                document.getElementById('text').value = data.text || '';
            });
        }
    }

    render() {
        this.parent.innerHTML = '';
        new HeaderComponent(this.parent).render();
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        
        // Загружаем данные для редактирования (если есть)
        this.loadDataForEdit();
        
        // ❌ НЕТ обработчика submit! Кнопка сохранения отсутствует.
        
        document.getElementById('cancelBtn').onclick = () => {
            new MainPage(this.parent).render();
        };
    }
}