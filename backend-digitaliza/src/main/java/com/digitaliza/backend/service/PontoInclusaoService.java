package com.digitaliza.backend.service;

import com.digitaliza.backend.dto.PontoInclusaoDTO;
import com.digitaliza.backend.dto.PontoInclusaoRequestDTO;
import com.digitaliza.backend.entity.PontoInclusao;
import com.digitaliza.backend.exception.ResourceNotFoundException;
import com.digitaliza.backend.repository.PontoInclusaoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PontoInclusaoService {

    private final PontoInclusaoRepository pontoInclusaoRepository;

    @Transactional
    public PontoInclusaoDTO criarPonto(PontoInclusaoRequestDTO request) {
        PontoInclusao ponto = new PontoInclusao();
        ponto.setNome(request.getNome());
        ponto.setEndereco(request.getEndereco());
        ponto.setTipo(request.getTipo());
        ponto.setCapacidade(request.getCapacidade());
        ponto.setEquipamentos(request.getEquipamentos());
        ponto.setContato(request.getContato());
        ponto.setHorarioFuncionamento(request.getHorarioFuncionamento());
        
        if (request.getStatus() != null) {
            ponto.setStatus(PontoInclusao.StatusPonto.valueOf(request.getStatus()));
        }

        PontoInclusao saved = pontoInclusaoRepository.save(ponto);
        return PontoInclusaoDTO.fromEntity(saved);
    }

    public List<PontoInclusaoDTO> listarTodos() {
        return pontoInclusaoRepository.findAll()
            .stream()
            .map(PontoInclusaoDTO::fromEntity)
            .collect(Collectors.toList());
    }

    public PontoInclusaoDTO buscarPorId(Long id) {
        PontoInclusao ponto = pontoInclusaoRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Ponto de inclusão não encontrado com ID: " + id));
        return PontoInclusaoDTO.fromEntity(ponto);
    }

    public List<PontoInclusaoDTO> buscarPorStatus(String status) {
        return pontoInclusaoRepository.findByStatus(PontoInclusao.StatusPonto.valueOf(status))
            .stream()
            .map(PontoInclusaoDTO::fromEntity)
            .collect(Collectors.toList());
    }

    @Transactional
    public PontoInclusaoDTO atualizarPonto(Long id, PontoInclusaoRequestDTO request) {
        PontoInclusao ponto = pontoInclusaoRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Ponto de inclusão não encontrado com ID: " + id));

        ponto.setNome(request.getNome());
        ponto.setEndereco(request.getEndereco());
        ponto.setTipo(request.getTipo());
        ponto.setCapacidade(request.getCapacidade());
        ponto.setEquipamentos(request.getEquipamentos());
        ponto.setContato(request.getContato());
        ponto.setHorarioFuncionamento(request.getHorarioFuncionamento());
        
        if (request.getStatus() != null) {
            ponto.setStatus(PontoInclusao.StatusPonto.valueOf(request.getStatus()));
        }

        PontoInclusao updated = pontoInclusaoRepository.save(ponto);
        return PontoInclusaoDTO.fromEntity(updated);
    }

    @Transactional
    public void deletarPonto(Long id) {
        if (!pontoInclusaoRepository.existsById(id)) {
            throw new ResourceNotFoundException("Ponto de inclusão não encontrado com ID: " + id);
        }
        pontoInclusaoRepository.deleteById(id);
    }
}