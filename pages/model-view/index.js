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
        if (!container) {
            console.error('Контейнер не найден');
            return;
        }

        const width = container.clientWidth;
        const height = container.clientHeight;

        // СЦЕНА
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x1a1a2e);

        // КАМЕРА
        this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        this.camera.position.set(3, 2, 5);
        this.camera.lookAt(0, 0, 0);

        // РЕНДЕРЕР
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(this.renderer.domElement);

        // УПРАВЛЕНИЕ КАМЕРОЙ (вращение, зум)
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.zoomSpeed = 1.2;
        this.controls.rotateSpeed = 1.0;
        this.controls.enableZoom = true;
        this.controls.enablePan = true;

        // СВЕТ
        const ambientLight = new THREE.AmbientLight(0x404040);
        this.scene.add(ambientLight);

        const mainLight = new THREE.DirectionalLight(0xffffff, 1);
        mainLight.position.set(2, 3, 2);
        this.scene.add(mainLight);

        const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
        fillLight.position.set(-1, 2, -1);
        this.scene.add(fillLight);

        const backLight = new THREE.DirectionalLight(0xffffff, 0.3);
        backLight.position.set(0, 1, -2);
        this.scene.add(backLight);

        // ПОЛ (сетка для ориентира)
        const gridHelper = new THREE.GridHelper(10, 20, 0x888888, 0x444444);
        gridHelper.position.y = -0.5;
        this.scene.add(gridHelper);

        // ЗАГРУЗКА МОДЕЛИ
        console.log('Загрузка модели:', this.modelPath);
        
        const loader = new GLTFLoader();
        loader.load(this.modelPath, (gltf) => {
            console.log('Модель загружена');
            this.model = gltf.scene;
            
            // Центрируем модель
            const box = new THREE.Box3().setFromObject(this.model);
            const center = box.getCenter(new THREE.Vector3());
            const minY = box.min.y;
            
            this.model.position.x = -center.x;
            this.model.position.z = -center.z;
            this.model.position.y = -minY;
            
            this.scene.add(this.model);
            this.animate();
        }, undefined, (error) => {
            console.error('Ошибка загрузки:', error);
            container.innerHTML = '<div style="color: red; text-align: center; padding-top: 200px;">❌ Ошибка загрузки модели</div>';
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