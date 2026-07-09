package com.digitaliza.backend.repository;

import com.digitaliza.backend.entity.PontoInclusao;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PontoInclusaoRepository extends JpaRepository<PontoInclusao, Long> {
    List<PontoInclusao> findByStatus(PontoInclusao.StatusPonto status);
    List<PontoInclusao> findByTipo(String tipo);
}