import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaLaptop, FaUser, FaProjectDiagram, FaHands, FaMapMarkerAlt, FaChartBar } from 'react-icons/fa';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const toggleMenu = () => setIsOpen(!isOpen);

    const navLinks = [
        { path: '/', label: 'Home', icon: <FaLaptop /> },
        { path: '/dashboard', label: 'Dashboard', icon: <FaChartBar /> },
        { path: '/usuarios', label: 'Usuários', icon: <FaUser /> },
        { path: '/projetos', label: 'Projetos', icon: <FaProjectDiagram /> },
        { path: '/voluntarios', label: 'Voluntários', icon: <FaHands /> },
        { path: '/pontos-inclusao', label: 'Pontos', icon: <FaMapMarkerAlt /> },
    ];

    return (
        <nav style={{
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 2px 20px rgba(0,0,0,0.1)',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            height: '70px'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '100%',
                padding: '0 2rem',
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                <Link to="/" style={{
                    display: 'flex',
                    alignItems: 'center',
                    textDecoration: 'none',
                    fontWeight: 700,
                    fontSize: '1.8rem',
                    color: '#333',
                    gap: '10px'
                }}>
                    <span style={{ color: '#6C63FF', fontSize: '2rem' }}><FaLaptop /></span>
                    <span>Digitaliza<span style={{ color: '#6C63FF' }}>+</span></span>
                </Link>

                <div onClick={toggleMenu} style={{
                    display: 'none',
                    fontSize: '1.8rem',
                    color: '#333',
                    cursor: 'pointer'
                }}>
                    {isOpen ? <FaTimes /> : <FaBars />}
                </div>

                <ul style={{
                    display: 'flex',
                    listStyle: 'none',
                    gap: '0.5rem',
                    alignItems: 'center',
                    margin: 0,
                    padding: 0
                }}>
                    {navLinks.map((link) => (
                        <li key={link.path}>
                            <Link
                                to={link.path}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '8px 16px',
                                    borderRadius: '10px',
                                    textDecoration: 'none',
                                    color: location.pathname === link.path ? '#fff' : '#555',
                                    fontWeight: 500,
                                    transition: 'all 0.3s ease',
                                    fontSize: '0.95rem',
                                    background: location.pathname === link.path ? 'linear-gradient(135deg, #6C63FF, #764ba2)' : 'transparent',
                                    boxShadow: location.pathname === link.path ? '0 4px 15px rgba(108,99,255,0.3)' : 'none'
                                }}
                                onClick={() => setIsOpen(false)}
                            >
                                <span>{link.icon}</span>
                                <span>{link.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;