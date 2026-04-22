export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        let imageStyle = 'width: 100%; height: 300px; object-fit: cover;';
        if (data.id === 2) {
            imageStyle += ' object-position: 13%;';
        }

        return `
            <div class="card" style="width: 400px; margin: 10px;">
                <img class="card-img-top" src="${data.src}" alt="картинка" style="${imageStyle}">
                <div class="card-body">
                    <h5 class="card-title">${data.title}</h5>
                    <p class="card-text">${data.text}</p>
                    <button class="btn btn-primary" id="click-card-${data.id}" data-id="${data.id}">Выбрать фильм</button>
                </div>
            </div>
        `;
    }

    addListeners(data, listener) {
        setTimeout(() => {
            const button = document.getElementById(`click-card-${data.id}`);
            if (button) {
                button.addEventListener("click", listener);
            }
        }, 0);
    }

    render(data, listener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data, listener);
    }
}