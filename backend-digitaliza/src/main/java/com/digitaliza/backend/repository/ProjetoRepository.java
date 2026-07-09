package com.digitaliza.backend.repository;

import com.digitaliza.backend.entity.Projeto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjetoRepository extends JpaRepository<Projeto, Long> {
    List<Projeto> findByStatus(Projeto.StatusProjeto status);
    List<Projeto> findByResponsavelId(Long responsavelId);
}