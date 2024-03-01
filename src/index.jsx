import { createRoot } from 'react-dom/client';
// Import to begin bundle
import "./index.scss";

// Main Component 
const MyFlixApplication = () => {
    return (
        <div className= "my-flix">
            <div> Good morning </div>
        </div>
    );
};

// Root of the app 
const container = document.querySelector("#root");
const root = createRoot(container);

// Tell react to render app in the root DOM element 
root.render(<MyFlixApplication />);

