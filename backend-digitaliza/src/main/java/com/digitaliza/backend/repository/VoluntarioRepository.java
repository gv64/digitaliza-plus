package com.digitaliza.backend.repository;

import com.digitaliza.backend.entity.Voluntario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VoluntarioRepository extends JpaRepository<Voluntario, Long> {
    List<Voluntario> findByStatus(Voluntario.StatusVoluntario status);
    List<Voluntario> findByUsuarioId(Long usuarioId);
}