import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { usuarioService } from '../services/api';

function Usuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        senha: '',
        cpf: '',
        telefone: '',
        endereco: '',
        tipoUsuario: 'COMUM'
    });

    useEffect(() => {
        carregarUsuarios();
    }, []);

    const carregarUsuarios = async () => {
        try {
            setLoading(true);
            const response = await usuarioService.listar();
            setUsuarios(response.data);
        } catch (error) {
            toast.error('Erro ao carregar usuários');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validação da senha (6 caracteres)
        if (!editingId && formData.senha.length < 6) {
            toast.error('A senha deve ter no mínimo 6 caracteres!');
            return;
        }

        if (!formData.tipoUsuario) {
            toast.error('Selecione um tipo de usuário!');
            return;
        }

        try {
            if (editingId) {
                // Se a senha estiver vazia na edição, remove do objeto
                const dadosAtualizacao = { ...formData };
                if (!dadosAtualizacao.senha) {
                    delete dadosAtualizacao.senha;
                }
                await usuarioService.atualizar(editingId, dadosAtualizacao);
                toast.success('Usuário atualizado com sucesso!');
            } else {
                await usuarioService.criar(formData);
                toast.success('Usuário criado com sucesso!');
            }
            setShowModal(false);
            setEditingId(null);
            setFormData({
                nome: '',
                email: '',
                senha: '',
                cpf: '',
                telefone: '',
                endereco: '',
                tipoUsuario: 'COMUM'
            });
            carregarUsuarios();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Erro ao salvar usuário');
        }
    };

    const handleEdit = (usuario) => {
        setEditingId(usuario.id);
        setFormData({
            nome: usuario.nome,
            email: usuario.email,
            senha: '',
            cpf: usuario.cpf,
            telefone: usuario.telefone || '',
            endereco: usuario.endereco || '',
            tipoUsuario: usuario.tipoUsuario || 'COMUM'
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
            try {
                await usuarioService.deletar(id);
                toast.success('Usuário excluído com sucesso!');
                carregarUsuarios();
            } catch (error) {
                toast.error('Erro ao excluir usuário');
            }
        }
    };

    const filteredUsuarios = usuarios.filter(u =>
        u.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                padding: '2rem',
                border: '1px solid rgba(255,255,255,0.18)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <h1 style={{ color: '#fff', fontSize: '2rem' }}>👥 Usuários</h1>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', padding: '0.5rem' }}>
                            <FaSearch style={{ color: '#fff', marginRight: '0.5rem' }} />
                            <input
                                type="text"
                                placeholder="Buscar por nome..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: '#fff',
                                    outline: 'none',
                                    padding: '0.3rem'
                                }}
                            />
                        </div>
                        <button
                            onClick={() => { 
                                setShowModal(true); 
                                setEditingId(null); 
                                setFormData({
                                    nome: '',
                                    email: '',
                                    senha: '',
                                    cpf: '',
                                    telefone: '',
                                    endereco: '',
                                    tipoUsuario: 'COMUM'
                                });
                            }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.7rem 1.5rem',
                                borderRadius: '10px',
                                border: 'none',
                                background: 'linear-gradient(135deg, #FFD700, #F4A460)',
                                color: '#333',
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <FaPlus /> Novo Usuário
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div style={{ textAlign: 'center', color: '#fff' }}>Carregando...</div>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', color: '#fff' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid rgba(255,255,255,0.2)' }}>
                                    <th style={{ padding: '1rem', textAlign: 'left' }}>ID</th>
                                    <th style={{ padding: '1rem', textAlign: 'left' }}>Nome</th>
                                    <th style={{ padding: '1rem', textAlign: 'left' }}>Tipo</th>
                                    <th style={{ padding: '1rem', textAlign: 'center' }}>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsuarios.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center', padding: '2rem', color: 'rgba(255,255,255,0.6)' }}>
                                            Nenhum usuário cadastrado
                                        </td>
                                    </tr>
                                ) : (
                                    filteredUsuarios.map((usuario) => (
                                        <tr key={usuario.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                            <td style={{ padding: '1rem' }}>{usuario.id}</td>
                                            <td style={{ padding: '1rem' }}>{usuario.nome}</td>
                                            <td style={{ padding: '1rem' }}>
                                                <span style={{
                                                    background: usuario.tipoUsuario === 'ADMIN' ? '#e74c3c' : 
                                                               usuario.tipoUsuario === 'VOLUNTARIO' ? '#2ecc71' : '#3498db',
                                                    padding: '0.2rem 0.8rem',
                                                    borderRadius: '20px',
                                                    fontSize: '0.8rem',
                                                    fontWeight: 600
                                                }}>
                                                    {usuario.tipoUsuario || 'COMUM'}
                                                </span>
                                            </td>
                                            <td style={{ padding: '1rem', textAlign: 'center' }}>
                                                <button
                                                    onClick={() => handleEdit(usuario)}
                                                    style={{
                                                        background: 'rgba(52,152,219,0.3)',
                                                        border: 'none',
                                                        color: '#fff',
                                                        padding: '0.5rem 0.8rem',
                                                        borderRadius: '5px',
                                                        cursor: 'pointer',
                                                        marginRight: '0.5rem',
                                                        transition: 'all 0.3s ease'
                                                    }}
                                                >
                                                    <FaEdit />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(usuario.id)}
                                                    style={{
                                                        background: 'rgba(231,76,60,0.3)',
                                                        border: 'none',
                                                        color: '#fff',
                                                        padding: '0.5rem 0.8rem',
                                                        borderRadius: '5px',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.3s ease'
                                                    }}
                                                >
                                                    <FaTrash />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Modal para criar/editar usuário */}
            {showModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.5)',
                    backdropFilter: 'blur(5px)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        background: 'rgba(255,255,255,0.95)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '20px',
                        padding: '2rem',
                        maxWidth: '500px',
                        width: '90%',
                        maxHeight: '90vh',
                        overflowY: 'auto'
                    }}>
                        <h2 style={{ color: '#333', marginBottom: '1.5rem' }}>
                            {editingId ? '✏️ Editar Usuário' : '➕ Novo Usuário'}
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', color: '#555', marginBottom: '0.3rem' }}>Nome *</label>
                                <input
                                    type="text"
                                    name="nome"
                                    value={formData.nome}
                                    onChange={handleInputChange}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '0.7rem',
                                        borderRadius: '10px',
                                        border: '1px solid #ddd',
                                        fontSize: '1rem'
                                    }}
                                />
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', color: '#555', marginBottom: '0.3rem' }}>Email *</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '0.7rem',
                                        borderRadius: '10px',
                                        border: '1px solid #ddd',
                                        fontSize: '1rem'
                                    }}
                                />
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', color: '#555', marginBottom: '0.3rem' }}>
                                    Senha {editingId ? '(deixe em branco para manter)' : '*'}
                                </label>
                                <input
                                    type="password"
                                    name="senha"
                                    value={formData.senha}
                                    onChange={handleInputChange}
                                    required={!editingId}
                                    minLength="6"
                                    style={{
                                        width: '100%',
                                        padding: '0.7rem',
                                        borderRadius: '10px',
                                        border: '1px solid #ddd',
                                        fontSize: '1rem'
                                    }}
                                />
                                {!editingId && (
                                    <small style={{ 
                                        display: 'block', 
                                        color: '#888', 
                                        fontSize: '0.8rem', 
                                        marginTop: '0.3rem' 
                                    }}>
                                        🔒 A senha deve ter no mínimo <strong>6 caracteres</strong>
                                    </small>
                                )}
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', color: '#555', marginBottom: '0.3rem' }}>CPF *</label>
                                <input
                                    type="text"
                                    name="cpf"
                                    value={formData.cpf}
                                    onChange={handleInputChange}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '0.7rem',
                                        borderRadius: '10px',
                                        border: '1px solid #ddd',
                                        fontSize: '1rem'
                                    }}
                                />
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', color: '#555', marginBottom: '0.3rem' }}>Telefone</label>
                                <input
                                    type="text"
                                    name="telefone"
                                    value={formData.telefone}
                                    onChange={handleInputChange}
                                    style={{
                                        width: '100%',
                                        padding: '0.7rem',
                                        borderRadius: '10px',
                                        border: '1px solid #ddd',
                                        fontSize: '1rem'
                                    }}
                                />
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', color: '#555', marginBottom: '0.3rem' }}>Endereço</label>
                                <input
                                    type="text"
                                    name="endereco"
                                    value={formData.endereco}
                                    onChange={handleInputChange}
                                    style={{
                                        width: '100%',
                                        padding: '0.7rem',
                                        borderRadius: '10px',
                                        border: '1px solid #ddd',
                                        fontSize: '1rem'
                                    }}
                                />
                            </div>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', color: '#555', marginBottom: '0.3rem' }}>Tipo de Usuário *</label>
                                <select
                                    name="tipoUsuario"
                                    value={formData.tipoUsuario || 'COMUM'}
                                    onChange={handleInputChange}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '0.7rem',
                                        borderRadius: '10px',
                                        border: '1px solid #ddd',
                                        fontSize: '1rem'
                                    }}
                                >
                                    <option value="COMUM">Comum</option>
                                    <option value="VOLUNTARIO">Voluntário</option>
                                    <option value="ADMIN">Administrador</option>
                                </select>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                                <button
                                    type="button"
                                    onClick={() => { setShowModal(false); setEditingId(null); }}
                                    style={{
                                        padding: '0.7rem 2rem',
                                        borderRadius: '10px',
                                        border: '1px solid #ddd',
                                        background: '#f5f5f5',
                                        cursor: 'pointer',
                                        fontWeight: 500
                                    }}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    style={{
                                        padding: '0.7rem 2rem',
                                        borderRadius: '10px',
                                        border: 'none',
                                        background: 'linear-gradient(135deg, #6C63FF, #764ba2)',
                                        color: '#fff',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    {editingId ? 'Atualizar' : 'Salvar'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Usuarios;