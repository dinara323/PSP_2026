export class ProductComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        let imageStyle = 'width: 100%; height: 500px; object-fit: cover;';
        
        if (data.id === 2) {
            imageStyle += ' object-position: 15%;';
        }

        return `
            <div class="card" style="width: 700px; margin: 0 auto; border: none; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                <img 
                    src="${data.src}" 
                    class="card-img-top" 
                    alt="картинка" 
                    style="${imageStyle}"
                >
                <div class="card-body">
                    <h5 class="card-title">${data.title}</h5>
                    <p class="card-text" style="margin-bottom: 0; font-size: 17px; color: black;">${data.text}</p>
                </div>
            </div>
        `;
    }

    render(data) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
    }
}