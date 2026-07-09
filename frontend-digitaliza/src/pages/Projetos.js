import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { projetoService, usuarioService } from '../services/api';

function Projetos() {
    const [projetos, setProjetos] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingUsuarios, setLoadingUsuarios] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({
        titulo: '',
        descricao: '',
        localizacao: '',
        numeroVagas: 10,
        dataInicio: '',
        dataFim: '',
        responsavelId: '',
        status: 'PENDENTE'
    });

    useEffect(() => {
        carregarProjetos();
        carregarUsuarios();
    }, []);

    const carregarProjetos = async () => {
        try {
            setLoading(true);
            const response = await projetoService.listar();
            setProjetos(response.data);
        } catch (error) {
            toast.error('Erro ao carregar projetos');
        } finally {
            setLoading(false);
        }
    };

    const carregarUsuarios = async () => {
        try {
            setLoadingUsuarios(true);
            const response = await usuarioService.listar();
            setUsuarios(response.data);
            // Se tiver usuários, seleciona o primeiro como padrão
            if (response.data.length > 0) {
                setFormData(prev => ({
                    ...prev,
                    responsavelId: response.data[0].id
                }));
            }
        } catch (error) {
            console.error('Erro ao carregar usuários:', error);
            toast.error('Erro ao carregar lista de usuários');
        } finally {
            setLoadingUsuarios(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validação: verifica se responsavelId foi selecionado
        if (!formData.responsavelId) {
            toast.error('Selecione um responsável para o projeto!');
            return;
        }

        try {
            if (editingId) {
                await projetoService.atualizar(editingId, formData);
                toast.success('Projeto atualizado com sucesso!');
            } else {
                await projetoService.criar(formData);
                toast.success('Projeto criado com sucesso!');
            }
            setShowModal(false);
            setEditingId(null);
            setFormData({
                titulo: '',
                descricao: '',
                localizacao: '',
                numeroVagas: 10,
                dataInicio: '',
                dataFim: '',
                responsavelId: usuarios.length > 0 ? usuarios[0].id : '',
                status: 'PENDENTE'
            });
            carregarProjetos();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Erro ao salvar projeto');
        }
    };

    const handleEdit = (projeto) => {
        setEditingId(projeto.id);
        setFormData({
            titulo: projeto.titulo,
            descricao: projeto.descricao,
            localizacao: projeto.localizacao,
            numeroVagas: projeto.numeroVagas,
            dataInicio: projeto.dataInicio || '',
            dataFim: projeto.dataFim || '',
            responsavelId: projeto.responsavelId || (usuarios.length > 0 ? usuarios[0].id : ''),
            status: projeto.status || 'PENDENTE'
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir este projeto?')) {
            try {
                await projetoService.deletar(id);
                toast.success('Projeto excluído com sucesso!');
                carregarProjetos();
            } catch (error) {
                toast.error('Erro ao excluir projeto');
            }
        }
    };

    const filteredProjetos = projetos.filter(p =>
        p.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.localizacao.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Função para buscar o nome do responsável
    const getResponsavelNome = (responsavelId) => {
        const usuario = usuarios.find(u => u.id === responsavelId);
        return usuario ? usuario.nome : 'Não encontrado';
    };

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
                    <h1 style={{ color: '#fff', fontSize: '2rem' }}>📋 Projetos</h1>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', padding: '0.5rem' }}>
                            <FaSearch style={{ color: '#fff', marginRight: '0.5rem' }} />
                            <input
                                type="text"
                                placeholder="Buscar projeto..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: '#fff',
                                    outline: 'none',
                                    padding: '0.3rem',
                                    width: '150px'
                                }}
                            />
                        </div>
                        <button
                            onClick={() => { 
                                setShowModal(true); 
                                setEditingId(null); 
                                setFormData({
                                    titulo: '',
                                    descricao: '',
                                    localizacao: '',
                                    numeroVagas: 10,
                                    dataInicio: '',
                                    dataFim: '',
                                    responsavelId: usuarios.length > 0 ? usuarios[0].id : '',
                                    status: 'PENDENTE'
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
                            <FaPlus /> Novo Projeto
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
                                    <th style={{ padding: '1rem', textAlign: 'left' }}>Título</th>
                                    <th style={{ padding: '1rem', textAlign: 'left' }}>Localização</th>
                                    <th style={{ padding: '1rem', textAlign: 'left' }}>Responsável</th>
                                    <th style={{ padding: '1rem', textAlign: 'left' }}>Status</th>
                                    <th style={{ padding: '1rem', textAlign: 'center' }}>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProjetos.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: 'rgba(255,255,255,0.6)' }}>
                                            Nenhum projeto cadastrado
                                        </td>
                                    </tr>
                                ) : (
                                    filteredProjetos.map((projeto) => (
                                        <tr key={projeto.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                            <td style={{ padding: '1rem' }}>{projeto.id}</td>
                                            <td style={{ padding: '1rem' }}>{projeto.titulo}</td>
                                            <td style={{ padding: '1rem' }}>{projeto.localizacao}</td>
                                            <td style={{ padding: '1rem' }}>{getResponsavelNome(projeto.responsavelId)}</td>
                                            <td style={{ padding: '1rem' }}>
                                                <span style={{
                                                    background: projeto.status === 'ATIVO' ? '#2ecc71' : 
                                                               projeto.status === 'PENDENTE' ? '#f39c12' : 
                                                               projeto.status === 'CONCLUIDO' ? '#3498db' : '#e74c3c',
                                                    padding: '0.2rem 0.8rem',
                                                    borderRadius: '20px',
                                                    fontSize: '0.8rem',
                                                    fontWeight: 600
                                                }}>
                                                    {projeto.status}
                                                </span>
                                            </td>
                                            <td style={{ padding: '1rem', textAlign: 'center' }}>
                                                <button
                                                    onClick={() => handleEdit(projeto)}
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
                                                    onClick={() => handleDelete(projeto.id)}
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

            {/* Modal para criar/editar projeto */}
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
                            {editingId ? '✏️ Editar Projeto' : '➕ Novo Projeto'}
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', color: '#555', marginBottom: '0.3rem' }}>Título *</label>
                                <input
                                    type="text"
                                    name="titulo"
                                    value={formData.titulo}
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
                                <label style={{ display: 'block', color: '#555', marginBottom: '0.3rem' }}>Descrição *</label>
                                <textarea
                                    name="descricao"
                                    value={formData.descricao}
                                    onChange={handleInputChange}
                                    required
                                    rows="3"
                                    style={{
                                        width: '100%',
                                        padding: '0.7rem',
                                        borderRadius: '10px',
                                        border: '1px solid #ddd',
                                        fontSize: '1rem',
                                        resize: 'vertical'
                                    }}
                                />
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', color: '#555', marginBottom: '0.3rem' }}>Localização *</label>
                                <input
                                    type="text"
                                    name="localizacao"
                                    value={formData.localizacao}
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
                                <label style={{ display: 'block', color: '#555', marginBottom: '0.3rem' }}>Número de Vagas *</label>
                                <input
                                    type="number"
                                    name="numeroVagas"
                                    value={formData.numeroVagas}
                                    onChange={handleInputChange}
                                    required
                                    min="1"
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
                                <label style={{ display: 'block', color: '#555', marginBottom: '0.3rem' }}>Data de Início</label>
                                <input
                                    type="date"
                                    name="dataInicio"
                                    value={formData.dataInicio}
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
                                <label style={{ display: 'block', color: '#555', marginBottom: '0.3rem' }}>Data de Fim</label>
                                <input
                                    type="date"
                                    name="dataFim"
                                    value={formData.dataFim}
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
                                <label style={{ display: 'block', color: '#555', marginBottom: '0.3rem' }}>Responsável *</label>
                                <select
                                    name="responsavelId"
                                    value={formData.responsavelId}
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
                                    <option value="">Selecione um responsável</option>
                                    {usuarios.map((usuario) => (
                                        <option key={usuario.id} value={usuario.id}>
                                            {usuario.nome} ({usuario.email})
                                        </option>
                                    ))}
                                </select>
                                {loadingUsuarios && <span style={{ color: '#888', fontSize: '0.8rem' }}>Carregando usuários...</span>}
                            </div>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', color: '#555', marginBottom: '0.3rem' }}>Status</label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleInputChange}
                                    style={{
                                        width: '100%',
                                        padding: '0.7rem',
                                        borderRadius: '10px',
                                        border: '1px solid #ddd',
                                        fontSize: '1rem'
                                    }}
                                >
                                    <option value="PENDENTE">Pendente</option>
                                    <option value="ATIVO">Ativo</option>
                                    <option value="CONCLUIDO">Concluído</option>
                                    <option value="CANCELADO">Cancelado</option>
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

export default Projetos;