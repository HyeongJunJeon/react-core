import App from "@/App";
import { initEventDelegation } from "@/event/delegation";
import { render } from "@/render";
import "@/assets/styles/global.css";

initEventDelegation();

const app = App();
const rootElement = document.getElementById("root");

render(app, rootElement);
