import { ProductCardComponent } from "../../components/product-card/index.js";
import { ModelCardComponent } from "../../components/model-card/index.js";
import { ModelViewPage } from "../model-view/index.js";
import { ProductPage } from "../product/index.js";
import { HeaderComponent } from "../../components/header/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.movieIndex = 0;
        this.modelIndex = 0;
    }

    getHTML() {
        return `
            <div style="text-align: center; padding: 20px;">
                
                <!-- ПЕРВАЯ КАРУСЕЛЬ: ФИЛЬМЫ -->
                <h2 style="margin-top: 30px;">Фильмы</h2>
                <div style="position: relative; width: 1200px; margin: 0 auto;">
                    <div style="overflow: hidden;">
                        <div id="movieTrack" style="display: flex; gap: 20px; transition: 0.3s;"></div>
                    </div>
                    <button id="moviePrev" style="
                        position: absolute; left: -40px; top: 50%;
                        background: grey; color: white; border: none;
                        width: 36px; height: 36px; border-radius: 50%;
                        cursor: pointer; transform: translateY(-50%);
                        z-index: 10;
                    "><</button>
                    <button id="movieNext" style="
                        position: absolute; right: -50px; top: 50%;
                        background: grey; color: white; border: none;
                        width: 36px; height: 36px; border-radius: 50%;
                        cursor: pointer; transform: translateY(-50%);
                        z-index: 10;
                    ">></button>
                </div>
                <div id="movieDots" style="display: flex; justify-content: center; gap: 10px; margin-top: 10px;"></div>
                
                <!-- ВТОРАЯ КАРУСЕЛЬ: 3D МОДЕЛИ -->
                <h2 style="margin-top: 50px;">📷 3D Камеры</h2>
                <div style="position: relative; width: 900px; margin: 0 auto;">
                    <div style="overflow: hidden;">
                        <div id="modelTrack" style="display: flex; gap: 20px; transition: 0.3s;"></div>
                    </div>
                    <button id="modelPrev" style="
                        position: absolute; left: -40px; top: 50%;
                        background: grey; color: white; border: none;
                        width: 36px; height: 36px; border-radius: 50%;
                        cursor: pointer; transform: translateY(-50%);
                        z-index: 10;
                    "><</button>
                    <button id="modelNext" style="
                        position: absolute; right: -50px; top: 50%;
                        background: grey; color: white; border: none;
                        width: 36px; height: 36px; border-radius: 50%;
                        cursor: pointer; transform: translateY(-50%);
                        z-index: 10;
                    ">></button>
                </div>
                <div id="modelDots" style="display: flex; justify-content: center; gap: 10px; margin-top: 10px;"></div>
            </div>
        `;
    }

    getMovies() {
        return [
            { id: 1, src: "movie1.png", title: "Человек-паук", text: "Фантастика, 121 мин, 12+" },
            { id: 2, src: "movie2.png", title: "Голодные игры", text: "Приключения, 142 мин, 18+" },
            { id: 3, src: "Shrek.jpg", title: "Шрек", text: "Мультфильм, 90 мин, 6+" },
            { id: 4, src: "movie4.jpg", title: "Зверополис", text: "Мультфильм, 108 мин, 6+" }
        ];
    }

    getModels() {
    return [
        { 
            id: "instant", 
            path: "./models/Instant Camera.glb", 
            title: "Instant Camera", 
            text: "Мгновенная камера"
        },
        { 
            id: "video", 
            path: "./models/Video Camera.glb", 
            title: "Video Camera", 
            text: "Видеокамера"
        },
        { 
            id: "classic-video", 
            path: "./models/Classic video camera.glb", 
            title: "Classic Video Camera", 
            text: "Классическая видеокамера"
        },
        { 
            id: "camera", 
            path: "./models/camera.glb", 
            title: "Camera", 
            text: "Фотоаппарат"
        }
    ];
}

    renderMovieCarousel() {
        const track = document.getElementById('movieTrack');
        if (!track) return;
        
        const movies = this.getMovies();
        track.innerHTML = '';
        
        for (let i = 0; i < 3; i++) {
            const movie = movies[(this.movieIndex + i) % movies.length];
            const cardDiv = document.createElement('div');
            cardDiv.style.flex = "0 0 280px";
            
            const productCard = new ProductCardComponent(cardDiv);
            productCard.render(movie, (e) => {
                new ProductPage(this.parent, e.target.dataset.id).render();
            });
            
            track.appendChild(cardDiv);
        }
        
        const dots = document.querySelectorAll('#movieDots .dot');
        for (let i = 0; i < dots.length; i++) {
            dots[i].style.background = i === this.movieIndex ? "gold" : "gray";
        }
    }

    renderModelCarousel() {
    const track = document.getElementById('modelTrack');
    if (!track) return;
    
    const models = this.getModels();
    track.innerHTML = '';
    
    // Показываем ТОЛЬКО 3 карточки, начиная с modelIndex
    for (let i = 0; i < 3; i++) {
        const model = models[(this.modelIndex + i) % models.length];
        const cardDiv = document.createElement('div');
        cardDiv.style.flex = "0 0 300px";
        
        const modelCard = new ModelCardComponent(cardDiv, model);
        modelCard.render((id, title) => {
            const foundModel = models.find(m => m.id === id);
            if (foundModel) {
                const modelPage = new ModelViewPage(this.parent, id, title, foundModel.path);
                modelPage.render();
            }
        });
        
        track.appendChild(cardDiv);
    }
    
    // Обновляем точки (индикаторы)
    const dots = document.querySelectorAll('#modelDots .dot');
    for (let i = 0; i < dots.length; i++) {
        dots[i].style.background = i === this.modelIndex ? "gold" : "gray";
    }
}

    render() {
        this.parent.innerHTML = '';
        
        const header = new HeaderComponent(this.parent);
        header.render();
        
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        
        // Точки для фильмов
        const movies = this.getMovies();
        const movieDotsDiv = document.getElementById('movieDots');
        for (let i = 0; i < movies.length; i++) {
            const dot = document.createElement('div');
            dot.className = 'dot';
            dot.style.cssText = `width: 12px; height: 12px; border-radius: 50%; background: ${i === 0 ? 'gold' : 'gray'}; cursor: pointer;`;
            dot.onclick = () => {
                this.movieIndex = i;
                this.renderMovieCarousel();
            };
            movieDotsDiv.appendChild(dot);
        }
        
        // Точки для моделей
        const models = this.getModels();
        const modelDotsDiv = document.getElementById('modelDots');
        for (let i = 0; i < models.length; i++) {
            const dot = document.createElement('div');
            dot.className = 'dot';
            dot.style.cssText = `width: 12px; height: 12px; border-radius: 50%; background: ${i === 0 ? 'gold' : 'gray'}; cursor: pointer;`;
            dot.onclick = () => {
                this.modelIndex = i;
                this.renderModelCarousel();
            };
            modelDotsDiv.appendChild(dot);
        }
        
        // Кнопки
        document.getElementById('moviePrev').onclick = () => {
            this.movieIndex = (this.movieIndex - 1 + movies.length) % movies.length;
            this.renderMovieCarousel();
        };
        document.getElementById('movieNext').onclick = () => {
            this.movieIndex = (this.movieIndex + 1) % movies.length;
            this.renderMovieCarousel();
        };
        document.getElementById('modelPrev').onclick = () => {
            this.modelIndex = (this.modelIndex - 1 + models.length) % models.length;
            this.renderModelCarousel();
        };
        document.getElementById('modelNext').onclick = () => {
            this.modelIndex = (this.modelIndex + 1) % models.length;
            this.renderModelCarousel();
        };
        
        this.renderMovieCarousel();
        this.renderModelCarousel();
    }
}