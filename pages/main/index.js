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
                <h1>ВЫБОР ФИЛЬМА</h1>
                
                <div style="position: relative; width: 1400px; margin: 0 auto;">
                    <div style="overflow: hidden;">
                        <div id="carouselTrack" style="display: flex; gap: 20px; transition: 0.3s;"></div>
                    </div>
                    
                    <button id="prevBtn" style="
                        position: absolute; left: -50px; top: 50%;
                        background: black; color: white; border: none;
                        width: 40px; height: 40px; border-radius: 50%;
                        cursor: pointer; transform: translateY(-50%);
                        z-index: 10;
                    "><</button>
                    
                    <button id="nextBtn" style="
                        position: absolute; right: 50px; top: 50%;
                        background: black; color: white; border: none;
                        width: 40px; height: 40px; border-radius: 50%;
                        cursor: pointer; transform: translateY(-50%);
                        z-index: 10;
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

    getVisibleCards() {
        const data = this.getData();
        const cards = [];
        
        for (let i = 0; i < 3; i++) {
            const index = (this.currentIndex + i) % data.length;
            cards.push(data[index]);
        }
        
        return cards;
    }

    renderCarousel() {
        const track = document.getElementById('carouselTrack');
        if (!track) return;
        
        const visibleCards = this.getVisibleCards();
        
        track.innerHTML = '';
        
        visibleCards.forEach(movie => {
            const cardDiv = document.createElement('div');
            cardDiv.style.flex = "0 0 280px";
            
            const productCard = new ProductCardComponent(cardDiv);
            productCard.render(movie, (e) => {
                const id = e.target.dataset.id;
                new ProductPage(this.parent, id).render();
            });
            
            track.appendChild(cardDiv);
        });
        
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, i) => {
            dot.style.background = i === this.currentIndex ? "gold" : "gray";
        });
    }

    render() {
        this.parent.innerHTML = '';
        
        const header = new HeaderComponent(this.parent);
        header.render();
        
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        
        const data = this.getData();
        const dotsDiv = document.getElementById('dots');
        
        data.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.className = 'dot';
            dot.style.cssText = `width: 12px; height: 12px; border-radius: 50%; background: ${i === 0 ? 'gold' : 'gray'}; cursor: pointer;`;
            dot.onclick = () => {
                this.currentIndex = i;
                this.renderCarousel();
            };
            dotsDiv.appendChild(dot);
        });
        
        document.getElementById('prevBtn').onclick = () => {
            const data = this.getData();
            this.currentIndex = (this.currentIndex - 1 + data.length) % data.length;
            this.renderCarousel();
        };
        
        document.getElementById('nextBtn').onclick = () => {
            const data = this.getData();
            this.currentIndex = (this.currentIndex + 1) % data.length;
            this.renderCarousel();
        };
        
        this.renderCarousel();
    }
}