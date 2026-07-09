package com.digitaliza.backend.controller;

import com.digitaliza.backend.dto.ProjetoDTO;
import com.digitaliza.backend.dto.ProjetoRequestDTO;
import com.digitaliza.backend.service.ProjetoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/projetos")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class ProjetoController {

    private final ProjetoService projetoService;

    @PostMapping
    public ResponseEntity<ProjetoDTO> criarProjeto(@Valid @RequestBody ProjetoRequestDTO request) {
        ProjetoDTO projeto = projetoService.criarProjeto(request);
        return new ResponseEntity<>(projeto, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<ProjetoDTO>> listarTodos() {
        List<ProjetoDTO> projetos = projetoService.listarTodos();
        return ResponseEntity.ok(projetos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjetoDTO> buscarPorId(@PathVariable Long id) {
        ProjetoDTO projeto = projetoService.buscarPorId(id);
        return ResponseEntity.ok(projeto);
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<ProjetoDTO>> buscarPorStatus(@PathVariable String status) {
        List<ProjetoDTO> projetos = projetoService.buscarPorStatus(status);
        return ResponseEntity.ok(projetos);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProjetoDTO> atualizarProjeto(
            @PathVariable Long id,
            @Valid @RequestBody ProjetoRequestDTO request) {
        ProjetoDTO projeto = projetoService.atualizarProjeto(id, request);
        return ResponseEntity.ok(projeto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarProjeto(@PathVariable Long id) {
        projetoService.deletarProjeto(id);
        return ResponseEntity.noContent().build();
    }
}