import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export class ModelCardComponent {
    constructor(parent, modelData) {
        this.parent = parent;
        this.modelData = modelData;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.model = null;
    }

    getHTML() {
        return `
            <div class="card" style="width: 320px; margin: 10px;">
                <div id="canvas-${this.modelData.id}" style="width: 100%; height: 200px; background: #1a1a2e;"></div>
                <div class="card-body">
                    <h5 class="card-title">${this.modelData.title}</h5>
                    <p class="card-text">${this.modelData.text}</p>
                    <button class="btn btn-primary" id="view-btn-${this.modelData.id}" data-id="${this.modelData.id}">
                        Открыть 3D
                    </button>
                </div>
            </div>
        `;
    }

    init3D() {
        const container = document.getElementById(`canvas-${this.modelData.id}`);
        if (!container) return;

        const width = container.clientWidth;
        const height = container.clientHeight;

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x6a6a8e);

        this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        this.camera.position.set(2, 1, 3);
        this.camera.lookAt(0, 0, 0);

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(width, height);
        container.appendChild(this.renderer.domElement);

        const ambientLight = new THREE.AmbientLight(0x404040);
        this.scene.add(ambientLight);
        
        const mainLight = new THREE.DirectionalLight(0xffffff, 1);
        mainLight.position.set(2, 3, 2);
        this.scene.add(mainLight);
        
        const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
        fillLight.position.set(-1, 1, -1);
        this.scene.add(fillLight);

        const loader = new GLTFLoader();
        loader.load(this.modelData.path, (gltf) => {
            this.model = gltf.scene;
            
            const box = new THREE.Box3().setFromObject(this.model);
            const center = box.getCenter(new THREE.Vector3());
            const minY = box.min.y;
            
            this.model.position.x = -center.x;
            this.model.position.z = -center.z;
            this.model.position.y = -center.y;
            
            this.scene.add(this.model);
            this.animate();
        }, undefined, (error) => {
            console.error('Ошибка загрузки:', error);
        });
    }

    animate() {
        if (!this.renderer) return;
        
        const animateLoop = () => {
            requestAnimationFrame(animateLoop);
            
            if (this.model) {
                this.model.rotation.y += 0.005;
            }
            
            this.renderer.render(this.scene, this.camera);
        };
        
        animateLoop();
    }

    render(listener) {
    console.log('ModelCardComponent.render вызван для:', this.modelData.title);
    
    const html = this.getHTML();
    this.parent.insertAdjacentHTML('beforeend', html);
    
    setTimeout(() => {
    this.init3D();
}, 100);

setTimeout(() => {
    const btn = document.getElementById(`view-btn-${this.modelData.id}`);
    console.log('ПОЗДНИЙ ПОИСК кнопки:', btn);
    if (btn) {
        btn.onclick = (e) => {
            console.log('КЛИК!');
            e.stopPropagation();
            listener(this.modelData.id, this.modelData.title);
        };
    }
}, 200);
    
    const btn = document.getElementById(`view-btn-${this.modelData.id}`);
    console.log('Найдена кнопка:', btn);
    
    if (btn) {
        btn.onclick = (e) => {
            console.log('КЛИК ПО КНОПКЕ! Модель:', this.modelData.title);
            e.stopPropagation();
            if (listener) {
                listener(this.modelData.id, this.modelData.title);
            } else {
                console.error('listener не передан');
            }
        };
    } else {
        console.error('Кнопка не найдена! id:', `view-btn-${this.modelData.id}`);
    }
}
}