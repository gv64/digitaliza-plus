package com.digitaliza.backend.repository;

import com.digitaliza.backend.entity.Matricula;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MatriculaRepository extends JpaRepository<Matricula, Long> {
    List<Matricula> findByUsuarioId(Long usuarioId);
    List<Matricula> findByProjetoId(Long projetoId);
    Optional<Matricula> findByUsuarioIdAndProjetoId(Long usuarioId, Long projetoId);
}