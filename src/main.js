import App from "./App";
import { render } from "./render";

const app = App();
const rootElement = document.getElementById("root");

render(app, rootElement);
