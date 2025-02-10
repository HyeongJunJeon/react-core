import App from "./App";
import { render } from "./renderer";

const app = App();
const rootElement = document.getElementById("root");
render(app, rootElement);
