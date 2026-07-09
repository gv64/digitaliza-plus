import React from 'react';
import { FaGithub, FaLinkedin, FaHeart } from 'react-icons/fa';

function Footer() {
    return (
        <footer style={{
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(10px)',
            marginTop: '2rem',
            boxShadow: '0 -2px 20px rgba(0,0,0,0.05)'
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '3rem 2rem 1rem'
            }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '2rem',
                    marginBottom: '2rem'
                }}>
                    <div>
                        <h3 style={{ fontSize: '1.5rem', color: '#333' }}>Digitaliza+</h3>
                        <p style={{ color: '#666' }}>Plataforma de Inclusão Digital</p>
                        <p style={{ color: '#6C63FF', fontWeight: 600, marginTop: '0.5rem' }}>
                            ODS 9 - Indústria, Inovação e Infraestrutura
                        </p>
                    </div>
                    <div>
                        <h4 style={{ color: '#555' }}>Links Rápidos</h4>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            <li><a href="/" style={{ color: '#666', textDecoration: 'none' }}>Home</a></li>
                            <li><a href="/dashboard" style={{ color: '#666', textDecoration: 'none' }}>Dashboard</a></li>
                            <li><a href="/usuarios" style={{ color: '#666', textDecoration: 'none' }}>Usuários</a></li>
                            <li><a href="/projetos" style={{ color: '#666', textDecoration: 'none' }}>Projetos</a></li>
                            <li><a href="/voluntarios" style={{ color: '#666', textDecoration: 'none' }}>Voluntários</a></li>
                            <li><a href="/pontos-inclusao" style={{ color: '#666', textDecoration: 'none' }}>Pontos de Inclusão</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 style={{ color: '#555' }}>Contato</h4>
                        <p style={{ color: '#666' }}>📧 gabrielvirginio512@gmail.com</p>
                        <p style={{ color: '#666' }}>📱 (21) 96656-1786</p>
                    </div>
                    <div>
                        <h4 style={{ color: '#555' }}>Redes Sociais</h4>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <a 
                                href="https://github.com/gv64" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                style={{ 
                                    color: '#6C63FF', 
                                    fontSize: '1.5rem',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => { e.target.style.color = '#333' }}
                                onMouseLeave={(e) => { e.target.style.color = '#6C63FF' }}
                            >
                                <FaGithub />
                            </a>
                            <a 
                                href="https://linkedin.com/in/gabriel-virginio-alves" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                style={{ 
                                    color: '#6C63FF', 
                                    fontSize: '1.5rem',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => { e.target.style.color = '#0A66C2' }}
                                onMouseLeave={(e) => { e.target.style.color = '#6C63FF' }}
                            >
                                <FaLinkedin />
                            </a>
                        </div>
                    </div>
                </div>
                <div style={{
                    borderTop: '1px solid rgba(0,0,0,0.05)',
                    paddingTop: '1.5rem',
                    textAlign: 'center',
                    color: '#888'
                }}>
                    <p>
                        Feito com <FaHeart style={{ color: '#e74c3c' }} /> por Gabriel Virginio
                    </p>
                    <p>© 2026 Digitaliza+ - Todos os direitos reservados</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;