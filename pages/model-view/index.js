import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { HeaderComponent } from "../../components/header/index.js";
import { MainPage } from "../main/index.js";

export class ModelViewPage {
    constructor(parent, modelId, modelTitle, modelPath) {
        this.parent = parent;
        this.modelId = modelId;
        this.modelTitle = modelTitle;
        this.modelPath = modelPath;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.model = null;
    }

    getHTML() {
        return `
            <div style="text-align: center; padding: 20px;">
                <h2>${this.modelTitle}</h2>
                <div id="model-viewer" style="width: 800px; height: 500px; margin: 20px auto; background: #1a1a2e; border-radius: 15px;"></div>
                <div style="margin-top: 20px;">
                    <button id="back-to-main" style="background: #28a745; color: white; border: none; padding: 10px 30px; border-radius: 5px; cursor: pointer;">← Назад к галерее</button>
                </div>
            </div>
        `;
    }

    init3D() {
    const container = document.getElementById('model-viewer');
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x6a6a8e);

    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    this.camera.position.set(3, 2, 5);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(width, height);
    container.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;

    // Свет
    const light = new THREE.DirectionalLight(0xffffff, 1.5);
    light.position.set(2, 3, 2);
    this.scene.add(light);
    
    const ambientLight = new THREE.AmbientLight(0x404040);
    this.scene.add(ambientLight);

    // ========== БЕЛАЯ СЕТКА ==========
    const gridHelper = new THREE.GridHelper(8, 20, 0xffffff, 0xffffff);
    gridHelper.position.y = -0.8;
    this.scene.add(gridHelper);

    const loader = new GLTFLoader();
    loader.load(this.modelPath, (gltf) => {
        this.model = gltf.scene;
        
        const box = new THREE.Box3().setFromObject(this.model);
        const center = box.getCenter(new THREE.Vector3());
        const minY = box.min.y;
        
        this.model.position.x = -center.x;
        this.model.position.z = -center.z;
        this.model.position.y = -minY;
        
        this.scene.add(this.model);
        this.animate();
    });
}

    animate() {
        const animateLoop = () => {
            requestAnimationFrame(animateLoop);
            this.controls.update();
            this.renderer.render(this.scene, this.camera);
        };
        animateLoop();
    }

    render() {
        this.parent.innerHTML = '';
        
        const header = new HeaderComponent(this.parent);
        header.render();
        
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        
        setTimeout(() => {
            this.init3D();
            
            const backBtn = document.getElementById('back-to-main');
            if (backBtn) {
                backBtn.onclick = () => {
                    const mainPage = new MainPage(this.parent);
                    mainPage.render();
                };
            }
        }, 100);
    }
}