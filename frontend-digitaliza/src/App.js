import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/global.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Usuarios from './pages/Usuarios';
import Projetos from './pages/Projetos';
import Voluntarios from './pages/Voluntarios';
import PontosInclusao from './pages/PontosInclusao';
import Dashboard from './pages/Dashboard';

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <main style={{ minHeight: '80vh' }}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/usuarios" element={<Usuarios />} />
                        <Route path="/projetos" element={<Projetos />} />
                        <Route path="/voluntarios" element={<Voluntarios />} />
                        <Route path="/pontos-inclusao" element={<PontosInclusao />} />
                    </Routes>
                </main>
                <Footer />
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />
            </div>
        </Router>
    );
}

export default App;