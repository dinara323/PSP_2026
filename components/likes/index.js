export class LikesComponent {
    constructor(parent, movieId, initialLikes, initialDislikes) {
        this.parent = parent;
        this.movieId = movieId;
        this.likes = initialLikes;
        this.dislikes = initialDislikes;
    }

    getHTML() {
        return `
            <div class="likes-container" style="display: flex; gap: 20px; justify-content: center; margin-top: 15px;">
                <button id="likeBtn-${this.movieId}" style="
                    background-color: #28a745;
                    color: white;
                    border: none;
                    border-radius: 8px;
                    padding: 8px 20px;
                    cursor: pointer;
                    font-size: 16px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                ">
                    👍 <span id="likesCount-${this.movieId}">${this.likes}</span>
                </button>
                
                <button id="dislikeBtn-${this.movieId}" style="
                    background-color: #dc3545;
                    color: white;
                    border: none;
                    border-radius: 8px;
                    padding: 8px 20px;
                    cursor: pointer;
                    font-size: 16px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                ">
                    👎 <span id="dislikesCount-${this.movieId}">${this.dislikes}</span>
                </button>
            </div>
        `;
    }

    addListeners() {
        const likeBtn = document.getElementById(`likeBtn-${this.movieId}`);
        const dislikeBtn = document.getElementById(`dislikeBtn-${this.movieId}`);
        const likesSpan = document.getElementById(`likesCount-${this.movieId}`);
        const dislikesSpan = document.getElementById(`dislikesCount-${this.movieId}`);

        if (likeBtn) {
            likeBtn.addEventListener('click', () => {
                this.likes++;
                likesSpan.textContent = this.likes;
                this.saveToLocalStorage();
            });
        }

        if (dislikeBtn) {
            dislikeBtn.addEventListener('click', () => {
                this.dislikes++;
                dislikesSpan.textContent = this.dislikes;
                this.saveToLocalStorage();
            });
        }
    }

    saveToLocalStorage() {
        const savedData = JSON.parse(localStorage.getItem('movieLikes')) || {};
        savedData[this.movieId] = {
            likes: this.likes,
            dislikes: this.dislikes
        };
        localStorage.setItem('movieLikes', JSON.stringify(savedData));
    }

    render() {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners();
    }
}