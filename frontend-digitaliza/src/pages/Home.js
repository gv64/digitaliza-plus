import React from 'react';
import { Link } from 'react-router-dom';
import { FaRocket, FaUsers, FaProjectDiagram, FaHands, FaMapMarkerAlt, FaChartLine } from 'react-icons/fa';

function Home() {
    const features = [
        { icon: <FaUsers />, title: 'Gestão de Usuários', desc: 'Cadastre e gerencie todos os participantes', link: '/usuarios' },
        { icon: <FaProjectDiagram />, title: 'Projetos', desc: 'Crie e acompanhe projetos de inclusão digital', link: '/projetos' },
        { icon: <FaHands />, title: 'Voluntários', desc: 'Gerencie voluntários e suas áreas de atuação', link: '/voluntarios' },
        { icon: <FaMapMarkerAlt />, title: 'Pontos de Inclusão', desc: 'Mapeie locais de inclusão digital', link: '/pontos-inclusao' }
    ];

    return (
        <div style={{ minHeight: '100vh', paddingTop: '70px' }}>
            {/* Hero */}
            <section style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '4rem 2rem',
                maxWidth: '1200px',
                margin: '0 auto',
                minHeight: '70vh',
                gap: '3rem'
            }}>
                <div style={{ flex: 1 }}>
                    <h1 style={{
                        fontSize: '4rem',
                        fontWeight: 800,
                        color: '#fff',
                        textShadow: '0 4px 20px rgba(0,0,0,0.2)'
                    }}>
                        Digitaliza<span style={{ color: '#FFD700' }}>+</span>
                    </h1>
                    <p style={{
                        fontSize: '1.5rem',
                        color: 'rgba(255,255,255,0.95)',
                        margin: '1rem 0',
                        fontWeight: 500
                    }}>
                        Plataforma de Inclusão Digital para Comunidades Periféricas
                    </p>
                    <p style={{
                        fontSize: '1.1rem',
                        color: 'rgba(255,255,255,0.85)',
                        lineHeight: 1.8,
                        maxWidth: '500px'
                    }}>
                        Conectando pessoas, voluntários, projetos e recursos para promover a inclusão digital.
                    </p>
                    <div style={{
                        display: 'flex',
                        gap: '1rem',
                        marginTop: '2rem',
                        flexWrap: 'wrap'
                    }}>
                        <Link to="/dashboard" style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '14px 32px',
                            borderRadius: '50px',
                            textDecoration: 'none',
                            fontWeight: 600,
                            background: 'linear-gradient(135deg, #FFD700, #F4A460)',
                            color: '#333',
                            boxShadow: '0 4px 20px rgba(255,215,0,0.3)',
                            transition: 'all 0.3s ease'
                        }}>
                            <FaChartLine /> Ver Dashboard
                        </Link>
                        <Link to="/usuarios" style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '14px 32px',
                            borderRadius: '50px',
                            textDecoration: 'none',
                            fontWeight: 600,
                            background: 'rgba(255,255,255,0.2)',
                            color: '#fff',
                            backdropFilter: 'blur(10px)',
                            border: '2px solid rgba(255,255,255,0.3)',
                            transition: 'all 0.3s ease'
                        }}>
                            <FaUsers /> Começar Agora
                        </Link>
                    </div>
                </div>
                <div style={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <div style={{
                        width: '300px',
                        height: '300px',
                        background: 'rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '50%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        border: '2px solid rgba(255,255,255,0.2)'
                    }}>
                        <FaRocket style={{ fontSize: '8rem', color: '#FFD700' }} />
                    </div>
                </div>
            </section>

            {/* Features */}
            <section style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
                <h2 style={{
                    textAlign: 'center',
                    color: '#fff',
                    fontSize: '2.5rem',
                    fontWeight: 700,
                    marginBottom: '2rem'
                }}>Funcionalidades</h2>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '2rem'
                }}>
                    {features.map((feature, index) => (
                        <Link to={feature.link} key={index} style={{
                            textDecoration: 'none',
                            color: '#fff',
                            textAlign: 'center',
                            padding: '2rem',
                            background: 'rgba(255,255,255,0.15)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '20px',
                            border: '1px solid rgba(255,255,255,0.18)',
                            boxShadow: '0 8px 32px 0 rgba(31,38,135,0.37)',
                            transition: 'all 0.3s ease'
                        }}>
                            <div style={{ fontSize: '3rem', color: '#FFD700', marginBottom: '1rem' }}>{feature.icon}</div>
                            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>{feature.title}</h3>
                            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem' }}>{feature.desc}</p>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Stats */}
            <section style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                    gap: '2rem',
                    textAlign: 'center'
                }}>
                    {[
                        { number: '5+', label: 'Projetos Ativos' },
                        { number: '20+', label: 'Voluntários' },
                        { number: '50+', label: 'Beneficiários' },
                        { number: '3', label: 'Pontos de Inclusão' }
                    ].map((stat, index) => (
                        <div key={index} style={{
                            background: 'rgba(255,255,255,0.1)',
                            backdropFilter: 'blur(10px)',
                            padding: '2rem',
                            borderRadius: '20px',
                            border: '1px solid rgba(255,255,255,0.2)'
                        }}>
                            <span style={{ display: 'block', fontSize: '3rem', fontWeight: 800, color: '#FFD700' }}>{stat.number}</span>
                            <span style={{ display: 'block', color: 'rgba(255,255,255,0.9)', fontSize: '1rem', marginTop: '0.5rem' }}>{stat.label}</span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Home;