package com.digitaliza.backend.service;

import com.digitaliza.backend.dto.VoluntarioDTO;
import com.digitaliza.backend.dto.VoluntarioRequestDTO;
import com.digitaliza.backend.entity.Usuario;
import com.digitaliza.backend.entity.Voluntario;
import com.digitaliza.backend.exception.ResourceNotFoundException;
import com.digitaliza.backend.repository.VoluntarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VoluntarioService {

    private final VoluntarioRepository voluntarioRepository;
    private final UsuarioService usuarioService;

    @Transactional
    public VoluntarioDTO criarVoluntario(VoluntarioRequestDTO request) {
        Usuario usuario = usuarioService.buscarEntidadePorId(request.getUsuarioId());

        // Verificar se usuário já é voluntário
        if (voluntarioRepository.findByUsuarioId(usuario.getId()).size() > 0) {
            throw new RuntimeException("Usuário já é voluntário!");
        }

        Voluntario voluntario = new Voluntario();
        voluntario.setUsuario(usuario);
        voluntario.setAreasAtuacao(request.getAreasAtuacao());
        voluntario.setDisponibilidade(request.getDisponibilidade());
        voluntario.setBiografia(request.getBiografia());
        
        if (request.getStatus() != null) {
            voluntario.setStatus(Voluntario.StatusVoluntario.valueOf(request.getStatus()));
        }

        Voluntario saved = voluntarioRepository.save(voluntario);
        return VoluntarioDTO.fromEntity(saved);
    }

    public List<VoluntarioDTO> listarTodos() {
        return voluntarioRepository.findAll()
            .stream()
            .map(VoluntarioDTO::fromEntity)
            .collect(Collectors.toList());
    }

    public VoluntarioDTO buscarPorId(Long id) {
        Voluntario voluntario = voluntarioRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Voluntário não encontrado com ID: " + id));
        return VoluntarioDTO.fromEntity(voluntario);
    }

    public List<VoluntarioDTO> buscarPorStatus(String status) {
        return voluntarioRepository.findByStatus(Voluntario.StatusVoluntario.valueOf(status))
            .stream()
            .map(VoluntarioDTO::fromEntity)
            .collect(Collectors.toList());
    }

    @Transactional
    public VoluntarioDTO atualizarVoluntario(Long id, VoluntarioRequestDTO request) {
        Voluntario voluntario = voluntarioRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Voluntário não encontrado com ID: " + id));

        voluntario.setAreasAtuacao(request.getAreasAtuacao());
        voluntario.setDisponibilidade(request.getDisponibilidade());
        voluntario.setBiografia(request.getBiografia());
        
        if (request.getStatus() != null) {
            voluntario.setStatus(Voluntario.StatusVoluntario.valueOf(request.getStatus()));
        }

        Voluntario updated = voluntarioRepository.save(voluntario);
        return VoluntarioDTO.fromEntity(updated);
    }

    @Transactional
    public void deletarVoluntario(Long id) {
        if (!voluntarioRepository.existsById(id)) {
            throw new ResourceNotFoundException("Voluntário não encontrado com ID: " + id);
        }
        voluntarioRepository.deleteById(id);
    }
}