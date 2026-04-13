export class ProductComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        let imageStyle = 'width: 100%; height: 400px; object-fit: cover;'; 
        
        if (data.id === 2) {
            imageStyle += ' object-position: 15%;';
        }

        return `
            <div class="card" style="width: 650px; margin: 0 auto;">
                <img 
                    src="${data.src}" 
                    class="card-img-top" 
                    alt="картинка" 
                    style="${imageStyle}"
                >
                <div class="card-body">
                    <h5 class="card-title" style="font-size: 18px;">${data.title}</h5> 
                    <p class="card-text" style="margin-bottom: 0; font-size: 14px; color: black;">${data.text}</p> 
                </div>
            </div>
        `;
    }

    render(data) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
    }
}