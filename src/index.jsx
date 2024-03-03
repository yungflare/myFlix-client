import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/main-view";
import { MovieCard } from "./components/movie-card/movie-card";
import { MovieView } from "./components/movie-view/movie-view";
import "./index.scss";

// Main Component 
const App = () => {
    return <MainView />;
};

// Root of the app 
const container = document.querySelector("#root");
const root = createRoot(container);

// Tell react to render app in the root DOM element 
root.render(<App />);

