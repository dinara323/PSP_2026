import {ProductCardComponent} from "../../components/product-card/index.js";export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }
    
    getData() {
    return {
        id: 1,
        src: "https://i.pinimg.com/originals/c9/ea/65/c9ea654eb3a7398b1f702c758c1c4206.jpg",
        title: "Акция",
        text: "У меня есть крутая акция"
    }
}

render() {
    const data = this.getData()
    const productCard = new ProductCardComponent(this.parent)
    productCard.render(data)
}
}