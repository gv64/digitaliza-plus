package com.digitaliza.backend.controller;

import com.digitaliza.backend.dto.VoluntarioDTO;
import com.digitaliza.backend.dto.VoluntarioRequestDTO;
import com.digitaliza.backend.service.VoluntarioService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/voluntarios")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class VoluntarioController {

    private final VoluntarioService voluntarioService;

    @PostMapping
    public ResponseEntity<VoluntarioDTO> criarVoluntario(@Valid @RequestBody VoluntarioRequestDTO request) {
        VoluntarioDTO voluntario = voluntarioService.criarVoluntario(request);
        return new ResponseEntity<>(voluntario, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<VoluntarioDTO>> listarTodos() {
        List<VoluntarioDTO> voluntarios = voluntarioService.listarTodos();
        return ResponseEntity.ok(voluntarios);
    }

    @GetMapping("/{id}")
    public ResponseEntity<VoluntarioDTO> buscarPorId(@PathVariable Long id) {
        VoluntarioDTO voluntario = voluntarioService.buscarPorId(id);
        return ResponseEntity.ok(voluntario);
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<VoluntarioDTO>> buscarPorStatus(@PathVariable String status) {
        List<VoluntarioDTO> voluntarios = voluntarioService.buscarPorStatus(status);
        return ResponseEntity.ok(voluntarios);
    }

    @PutMapping("/{id}")
    public ResponseEntity<VoluntarioDTO> atualizarVoluntario(
            @PathVariable Long id,
            @Valid @RequestBody VoluntarioRequestDTO request) {
        VoluntarioDTO voluntario = voluntarioService.atualizarVoluntario(id, request);
        return ResponseEntity.ok(voluntario);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarVoluntario(@PathVariable Long id) {
        voluntarioService.deletarVoluntario(id);
        return ResponseEntity.noContent().build();
    }
}