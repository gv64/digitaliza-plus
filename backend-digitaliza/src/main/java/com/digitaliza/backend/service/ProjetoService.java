package com.digitaliza.backend.service;

import com.digitaliza.backend.dto.ProjetoDTO;
import com.digitaliza.backend.dto.ProjetoRequestDTO;
import com.digitaliza.backend.entity.Projeto;
import com.digitaliza.backend.entity.Usuario;
import com.digitaliza.backend.exception.ResourceNotFoundException;
import com.digitaliza.backend.repository.ProjetoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjetoService {

    private final ProjetoRepository projetoRepository;
    private final UsuarioService usuarioService;

    @Transactional
    public ProjetoDTO criarProjeto(ProjetoRequestDTO request) {
        Usuario responsavel = usuarioService.buscarEntidadePorId(request.getResponsavelId());

        Projeto projeto = new Projeto();
        projeto.setTitulo(request.getTitulo());
        projeto.setDescricao(request.getDescricao());
        projeto.setLocalizacao(request.getLocalizacao());
        projeto.setNumeroVagas(request.getNumeroVagas());
        projeto.setDataInicio(request.getDataInicio());
        projeto.setDataFim(request.getDataFim());
        projeto.setResponsavel(responsavel);
        projeto.setStatus(Projeto.StatusProjeto.valueOf(request.getStatus()));

        Projeto saved = projetoRepository.save(projeto);
        return ProjetoDTO.fromEntity(saved);
    }

    public List<ProjetoDTO> listarTodos() {
        return projetoRepository.findAll()
            .stream()
            .map(ProjetoDTO::fromEntity)
            .collect(Collectors.toList());
    }

    public ProjetoDTO buscarPorId(Long id) {
        Projeto projeto = projetoRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Projeto não encontrado com ID: " + id));
        return ProjetoDTO.fromEntity(projeto);
    }

    public List<ProjetoDTO> buscarPorStatus(String status) {
        return projetoRepository.findByStatus(Projeto.StatusProjeto.valueOf(status))
            .stream()
            .map(ProjetoDTO::fromEntity)
            .collect(Collectors.toList());
    }

    @Transactional
    public ProjetoDTO atualizarProjeto(Long id, ProjetoRequestDTO request) {
        Projeto projeto = projetoRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Projeto não encontrado com ID: " + id));

        projeto.setTitulo(request.getTitulo());
        projeto.setDescricao(request.getDescricao());
        projeto.setLocalizacao(request.getLocalizacao());
        projeto.setNumeroVagas(request.getNumeroVagas());
        projeto.setDataInicio(request.getDataInicio());
        projeto.setDataFim(request.getDataFim());
        projeto.setStatus(Projeto.StatusProjeto.valueOf(request.getStatus()));

        Projeto updated = projetoRepository.save(projeto);
        return ProjetoDTO.fromEntity(updated);
    }

    @Transactional
    public void deletarProjeto(Long id) {
        if (!projetoRepository.existsById(id)) {
            throw new ResourceNotFoundException("Projeto não encontrado com ID: " + id);
        }
        projetoRepository.deleteById(id);
    }
}