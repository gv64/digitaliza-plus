package com.digitaliza.backend.service;

import com.digitaliza.backend.dto.UsuarioDTO;
import com.digitaliza.backend.dto.UsuarioRequestDTO;
import com.digitaliza.backend.entity.Usuario;
import com.digitaliza.backend.exception.ResourceNotFoundException;
import com.digitaliza.backend.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    @Transactional
    public UsuarioDTO criarUsuario(UsuarioRequestDTO request) {
        // Verificar se email já existe
        if (usuarioRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email já cadastrado!");
        }

        // Verificar se CPF já existe
        if (usuarioRepository.existsByCpf(request.getCpf())) {
            throw new RuntimeException("CPF já cadastrado!");
        }

        // Criar novo usuário
        Usuario usuario = new Usuario();
        usuario.setNome(request.getNome());
        usuario.setEmail(request.getEmail());
        usuario.setSenha(request.getSenha());
        usuario.setCpf(request.getCpf());
        usuario.setTelefone(request.getTelefone());
        usuario.setEndereco(request.getEndereco());
        usuario.setTipoUsuario(Usuario.TipoUsuario.valueOf(request.getTipoUsuario()));

        Usuario saved = usuarioRepository.save(usuario);
        return UsuarioDTO.fromEntity(saved);
    }

    public List<UsuarioDTO> listarTodos() {
        return usuarioRepository.findAll()
            .stream()
            .map(UsuarioDTO::fromEntity)
            .collect(Collectors.toList());
    }

    public UsuarioDTO buscarPorId(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado com ID: " + id));
        return UsuarioDTO.fromEntity(usuario);
    }

    @Transactional
    public UsuarioDTO atualizarUsuario(Long id, UsuarioRequestDTO request) {
        Usuario usuario = usuarioRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado com ID: " + id));

        usuario.setNome(request.getNome());
        usuario.setEmail(request.getEmail());
        usuario.setTelefone(request.getTelefone());
        usuario.setEndereco(request.getEndereco());

        Usuario updated = usuarioRepository.save(usuario);
        return UsuarioDTO.fromEntity(updated);
    }

    @Transactional
    public void deletarUsuario(Long id) {
        if (!usuarioRepository.existsById(id)) {
            throw new ResourceNotFoundException("Usuário não encontrado com ID: " + id);
        }
        usuarioRepository.deleteById(id);
    }

    public Usuario buscarEntidadePorId(Long id) {
        return usuarioRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado com ID: " + id));
    }
}