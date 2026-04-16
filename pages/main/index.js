import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";
import { HeaderComponent } from "../../components/header/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.currentIndex = 0;
    }

    getHTML() {
        return `
            <div style="text-align: center; padding: 20px;">
                <div style="display: flex; justify-content: space-between; align-items: center; max-width: 1200px; margin: 0 auto 20px auto;">
                    <h1 style="margin: 0;">ВЫБОР ФИЛЬМА</h1>
                    <button id="resetLikesBtn" style="
                        background: #7f7f7f; color: white; border: none;
                        border-radius: 8px; padding: 4px 6px; cursor: pointer;
                    ">🔄</button>
                </div>
                
                <div style="position: relative; max-width: 1300px; margin: 0 auto;">
                    <div style="overflow: hidden;">
                        <div id="carouselTrack" style="display: flex; gap: 20px; transition: 0.3s;"></div>
                    </div>
                    
                    <button id="prevBtn" style="
                        position: absolute; left: -40px; top: 50%;
                        background: grey; color: white; border: none;
                        width: 40px; height: 40px; border-radius: 50%;
                        cursor: pointer; transform: translateY(-50%);
                    "><</button>
                    
                    <button id="nextBtn" style="
                        position: absolute; right: -40px; top: 50%;
                        background: grey; color: white; border: none;
                        width: 40px; height: 40px; border-radius: 50%;
                        cursor: pointer; transform: translateY(-50%);
                    ">></button>
                </div>
                
                <div id="dots" style="display: flex; justify-content: center; gap: 10px; margin-top: 20px;"></div>
            </div>
        `;
    }

    getData() {
        return [
            {
                id: 1,
                src: "movie1.png",
                title: "Человек-паук",
                text: "Фантастика, 121 мин, 12+"
            },
            {
                id: 2,
                src: "movie2.png",
                title: "Голодные игры",
                text: "Приключения, 142 мин, 18+"
            },
            {
                id: 3,
                src: "Shrek.jpg",
                title: "Шрек",
                text: "Мультфильм, 90 мин, 6+"
            },
            {
                id: 4,
                src: "movie4.jpg",
                title: "Зверополис",
                text: "Мультфильм, 108 мин, 6+"
            }
        ];
    }

    resetLikes() {
        localStorage.removeItem('movieLikes');
        for (let i = 1; i <= 4; i++) {
            const likes = document.getElementById(`likesCount-${i}`);
            const dislikes = document.getElementById(`dislikesCount-${i}`);
            if (likes) likes.textContent = '0';
            if (dislikes) dislikes.textContent = '0';
        }
    }

    renderCarousel() {
        const track = document.getElementById('carouselTrack');
        if (!track) return;
        
        const data = this.getData();
        track.innerHTML = '';
        
        for (let i = 0; i < 3; i++) {
            const movie = data[(this.currentIndex + i) % data.length];
            const cardDiv = document.createElement('div');
            cardDiv.style.flex = "0 0 300px";
            
            const card = new ProductCardComponent(cardDiv);
            card.render(movie, (e) => {
                new ProductPage(this.parent, e.target.dataset.id).render();
            });
            
            track.appendChild(cardDiv);
        }
        
        document.querySelectorAll('.dot').forEach((dot, i) => {
            dot.style.background = i === this.currentIndex ? "gold" : "gray";
        });
    }

    render() {
        this.parent.innerHTML = '';
        
        new HeaderComponent(this.parent).render();
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        
        // Точки
        this.getData().forEach((_, i) => {
            const dot = document.createElement('div');
            dot.className = 'dot';
            dot.style.cssText = `width: 12px; height: 12px; border-radius: 50%; background: ${i === 0 ? 'gold' : 'gray'}; cursor: pointer;`;
            dot.onclick = () => {
                this.currentIndex = i;
                this.renderCarousel();
            };
            document.getElementById('dots').appendChild(dot);
        });
        
        // Кнопки карусели
        document.getElementById('prevBtn').onclick = () => {
            this.currentIndex = (this.currentIndex - 1 + 4) % 4;
            this.renderCarousel();
        };
        
        document.getElementById('nextBtn').onclick = () => {
            this.currentIndex = (this.currentIndex + 1) % 4;
            this.renderCarousel();
        };
        
        // Кнопка сброса лайков
        document.getElementById('resetLikesBtn').onclick = () => this.resetLikes();
        
        this.renderCarousel();
    }
}