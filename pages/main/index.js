import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";
import { HeaderComponent } from "../../components/header/index.js";
import { ajax } from "../../modules/ajax.js";
import { stockUrls } from "../../modules/stockUrls.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.currentIndex = 0;
        this.data = [];
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
    ajax.get(stockUrls.getStocks(), (data) => {
        this.data = data;
        this.renderDots();
        this.renderCarousel();
    });
    }

    renderDots() {
    const dotsContainer = document.getElementById('dots');
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    
    this.data.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = 'dot';
        dot.style.cssText = `width: 12px; height: 12px; border-radius: 50%; background: ${i === this.currentIndex ? 'gold' : 'gray'}; cursor: pointer;`;
        dot.onclick = () => {
            this.currentIndex = i;
            this.renderCarousel();
            this.renderDots();
        };
        dotsContainer.appendChild(dot);
    });
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
    if (!track || this.data.length === 0) return;
    
    track.innerHTML = '';
    
    for (let i = 0; i < 3; i++) {
        const movie = this.data[(this.currentIndex + i) % this.data.length];
        const cardDiv = document.createElement('div');
        cardDiv.style.flex = "0 0 300px";
        
        const card = new ProductCardComponent(cardDiv);
        card.render(movie, (e) => {
            new ProductPage(this.parent, e.target.dataset.id).render();
        });
        
        track.appendChild(cardDiv);
    }
}

    render() {
        this.parent.innerHTML = '';
        
        new HeaderComponent(this.parent).render();
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        
        // Кнопки карусели
        document.getElementById('prevBtn').onclick = () => {
            if (this.data.length > 0) {
                this.currentIndex = (this.currentIndex - 1 + this.data.length) % this.data.length;
                this.renderCarousel();
                this.renderDots();
            }
        };

        document.getElementById('nextBtn').onclick = () => {
            if (this.data.length > 0) {
                this.currentIndex = (this.currentIndex + 1) % this.data.length;
                this.renderCarousel();
                this.renderDots();
            }
        };
        
        // Кнопка сброса лайков
        document.getElementById('resetLikesBtn').onclick = () => this.resetLikes();
        
        this.renderCarousel();

        // Загружаем данные с сервера
        this.getData();
    }
}