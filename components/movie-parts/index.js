import { moviesData } from '../../data.js';

export class MoviePartsComponent {
    constructor(parent, movieId) {
        this.parent = parent;
        this.movieId = movieId;
    }

    render() {
        const parts = moviesData[this.movieId].parts;
        const partNumbers = Object.keys(parts);
        
        let buttonsHtml = '';
        
        for (let i = 0; i < partNumbers.length; i++) {
            const partNumber = partNumbers[i];
            
            let checkedAttribute = '';
            if (i === 0) {
                checkedAttribute = 'checked';
            }
            
            buttonsHtml = buttonsHtml + `
                <input type="radio" class="btn-check" name="movie-part" id="part${partNumber}" autocomplete="off" ${checkedAttribute}>
                <label class="btn btn-outline-primary" for="part${partNumber}">${partNumber} часть</label>
            `;
        }
        
        const firstPartNumber = partNumbers[0];
        const defaultText = parts[firstPartNumber].shortInfo;
        
        const fullHtml = `
            <div class="mt-4 text-center">
                <div class="btn-group" role="group">
                    ${buttonsHtml}
                </div>
                <div id="partInfo" class="alert alert-secondary mt-3">
                    ${defaultText}
                </div>
            </div>
        `;
        
        this.parent.insertAdjacentHTML('beforeend', fullHtml);
        
        for (let i = 0; i < partNumbers.length; i++) {
            const partNumber = partNumbers[i];
            const button = document.querySelector('label[for="part' + partNumber + '"]');
            
            button.addEventListener('click', function() {
                const infoBlock = document.getElementById('partInfo');
                infoBlock.textContent = parts[partNumber].shortInfo;
            });
        }
    }
}