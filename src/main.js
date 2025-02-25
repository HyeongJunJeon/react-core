import App from "./App";
import { initEventDelegation } from "./event/delegation";
import { render } from "./render";

initEventDelegation();

const app = App();
const rootElement = document.getElementById("root");

render(app, rootElement);
