import {MainPage} from "./pages/main/index.js";
import { HeaderComponent } from "../../components/header/index.js";

const headerContainer = document.getElementById('header-container');
const mainContainer = document.getElementById('main-container');

const mainPage = new MainPage(mainContainer);
mainPage.render();

const header = new HeaderComponent(headerContainer);
header.render();