import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        console.log(`📤 ${config.method.toUpperCase()} ${config.url}`);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        console.log(`📥 ${response.status} ${response.config.url}`);
        return response;
    },
    (error) => {
        console.error('❌ Erro na requisição:', error);
        return Promise.reject(error);
    }
);

export const usuarioService = {
    listar: () => api.get('/usuarios'),
    buscarPorId: (id) => api.get(`/usuarios/${id}`),
    criar: (usuario) => api.post('/usuarios', usuario),
    atualizar: (id, usuario) => api.put(`/usuarios/${id}`, usuario),
    deletar: (id) => api.delete(`/usuarios/${id}`),
};

export const projetoService = {
    listar: () => api.get('/projetos'),
    buscarPorId: (id) => api.get(`/projetos/${id}`),
    buscarPorStatus: (status) => api.get(`/projetos/status/${status}`),
    criar: (projeto) => api.post('/projetos', projeto),
    atualizar: (id, projeto) => api.put(`/projetos/${id}`, projeto),
    deletar: (id) => api.delete(`/projetos/${id}`),
};

export const voluntarioService = {
    listar: () => api.get('/voluntarios'),
    buscarPorId: (id) => api.get(`/voluntarios/${id}`),
    buscarPorStatus: (status) => api.get(`/voluntarios/status/${status}`),
    criar: (voluntario) => api.post('/voluntarios', voluntario),
    atualizar: (id, voluntario) => api.put(`/voluntarios/${id}`, voluntario),
    deletar: (id) => api.delete(`/voluntarios/${id}`),
};

export const pontoInclusaoService = {
    listar: () => api.get('/pontos-inclusao'),
    buscarPorId: (id) => api.get(`/pontos-inclusao/${id}`),
    buscarPorStatus: (status) => api.get(`/pontos-inclusao/status/${status}`),
    criar: (ponto) => api.post('/pontos-inclusao', ponto),
    atualizar: (id, ponto) => api.put(`/pontos-inclusao/${id}`, ponto),
    deletar: (id) => api.delete(`/pontos-inclusao/${id}`),
};

export default api;