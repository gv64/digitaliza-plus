package com.digitaliza.backend.controller;

import com.digitaliza.backend.dto.PontoInclusaoDTO;
import com.digitaliza.backend.dto.PontoInclusaoRequestDTO;
import com.digitaliza.backend.service.PontoInclusaoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pontos-inclusao")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class PontoInclusaoController {

    private final PontoInclusaoService pontoInclusaoService;

    @PostMapping
    public ResponseEntity<PontoInclusaoDTO> criarPonto(@Valid @RequestBody PontoInclusaoRequestDTO request) {
        PontoInclusaoDTO ponto = pontoInclusaoService.criarPonto(request);
        return new ResponseEntity<>(ponto, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<PontoInclusaoDTO>> listarTodos() {
        List<PontoInclusaoDTO> pontos = pontoInclusaoService.listarTodos();
        return ResponseEntity.ok(pontos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PontoInclusaoDTO> buscarPorId(@PathVariable Long id) {
        PontoInclusaoDTO ponto = pontoInclusaoService.buscarPorId(id);
        return ResponseEntity.ok(ponto);
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<PontoInclusaoDTO>> buscarPorStatus(@PathVariable String status) {
        List<PontoInclusaoDTO> pontos = pontoInclusaoService.buscarPorStatus(status);
        return ResponseEntity.ok(pontos);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PontoInclusaoDTO> atualizarPonto(
            @PathVariable Long id,
            @Valid @RequestBody PontoInclusaoRequestDTO request) {
        PontoInclusaoDTO ponto = pontoInclusaoService.atualizarPonto(id, request);
        return ResponseEntity.ok(ponto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarPonto(@PathVariable Long id) {
        pontoInclusaoService.deletarPonto(id);
        return ResponseEntity.noContent().build();
    }
}