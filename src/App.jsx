import { Routes, Route } from 'react-router-dom';
 import Homepage from './pages/Homepage.js';
 import About from './pages/About.js';
 import Error from './pages/Error.js';
 import RentalInjection from './pages/Rental-Injection.jsx';


function App() {
    return (
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/a-propos" element={<About />} />
                <Route path="/location/:id" element={<RentalInjection />} />
                <Route path="/*" element={<Error />} />
            </Routes>
    );
}

export default App;