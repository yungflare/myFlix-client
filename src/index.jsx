import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/main-view";
import Container from "react-bootstrap/Container";
import "./index.scss";
// import "bootstrap/dist/css/bootstrap.min.css";

import "./index.scss";
// Main Component

const App = () => {
  return (
    <Container>
      <MainView />
    </Container>
  );
};

// Root of the app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tell react to render app in the root DOM element
root.render(<App />);
