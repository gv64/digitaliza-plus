import React from 'react';

function Dashboard() {
    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', color: '#fff' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>📊 Dashboard</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', borderRadius: '20px', padding: '2rem', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '3rem', color: '#FFD700' }}>7</h2>
                    <p>Usuários</p>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', borderRadius: '20px', padding: '2rem', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '3rem', color: '#FFD700' }}>3</h2>
                    <p>Projetos</p>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', borderRadius: '20px', padding: '2rem', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '3rem', color: '#FFD700' }}>2</h2>
                    <p>Voluntários</p>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', borderRadius: '20px', padding: '2rem', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '3rem', color: '#FFD700' }}>3</h2>
                    <p>Pontos de Inclusão</p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;