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
        this.filterTitle = '';
    }

    getHTML() {
        return `
            <div style="text-align: center; padding: 20px;">
                <!-- ПОЛЕ ФИЛЬТРАЦИИ -->
                <div style="max-width: 400px; margin: 0 auto 30px;">
                    
                </div>
                
                <div style="display: flex; justify-content: space-between; align-items: center; max-width: 1200px; margin: 0 auto 20px auto;">
                    <h1 style="margin: 0;">ВЫБОР ФИЛЬМА</h1>
                    <button id="resetLikesBtn" style="background: #7f7f7f; color: white; border: none; border-radius: 8px; padding: 4px 6px;">🔄</button>
                </div>
                
                <div style="position: relative; max-width: 1300px; margin: 0 auto;">
                    <div style="overflow: hidden;">
                        <div id="carouselTrack" style="display: flex; gap: 20px; transition: 0.3s;"></div>
                    </div>
                    <button id="prevBtn" style="position: absolute; left: -40px; top: 50%; background: grey; color: white; width: 40px; height: 40px; border-radius: 50%;"><</button>
                    <button id="nextBtn" style="position: absolute; right: -40px; top: 50%; background: grey; color: white; width: 40px; height: 40px; border-radius: 50%;">></button>
                </div>
                <div id="dots" style="display: flex; justify-content: center; gap: 10px; margin-top: 20px;"></div>
            </div>
        `;
    }

    loadMovies() {
        let url = stockUrls.getStocks();
        if (this.filterTitle) {
            url = `${url}?title=${encodeURIComponent(this.filterTitle)}`;
        }
        
        ajax.get(url, (data) => {
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

    renderCarousel() {
        const track = document.getElementById('carouselTrack');
        if (!track || this.data.length === 0) return;
        track.innerHTML = '';
        
        for (let i = 0; i < Math.min(3, this.data.length); i++) {
            const movie = this.data[(this.currentIndex + i) % this.data.length];
            const cardDiv = document.createElement('div');
            cardDiv.style.flex = "0 0 300px";
            const card = new ProductCardComponent(cardDiv);
            card.render(movie, (e) => {
                const productPage = new ProductPage(this.parent, e.target.dataset.id);
                productPage.render();
            });
            track.appendChild(cardDiv);
        }
    }

    resetLikes() { localStorage.removeItem('movieLikes'); }

    render() {
        this.parent.innerHTML = '';
        new HeaderComponent(this.parent).render();
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        
        
        
        document.getElementById('prevBtn').onclick = () => {
            if (this.data.length) {
                this.currentIndex = (this.currentIndex - 1 + this.data.length) % this.data.length;
                this.renderCarousel();
                this.renderDots();
            }
        };
        
        document.getElementById('nextBtn').onclick = () => {
            if (this.data.length) {
                this.currentIndex = (this.currentIndex + 1) % this.data.length;
                this.renderCarousel();
                this.renderDots();
            }
        };
        
        document.getElementById('resetLikesBtn').onclick = () => this.resetLikes();
        
        this.loadMovies();
    }
}