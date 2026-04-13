export class ProductComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="card mb-3" style="width: 500px;  margin: 0 auto;">
                <div class="row g-0">
                    <div style = "width: 100%; height: 300px; owerflow: hidden; boarder-radius: 10px;">
                        <img src="${data.src}" class="img-fluid" alt="картинка" style="width: 100%; height: 300px; object-fit: cover;">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${data.title}</h5>
                            <p class="card-text">${data.text}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    render(data) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
    }
}