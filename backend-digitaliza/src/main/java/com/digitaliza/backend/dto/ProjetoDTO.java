package com.digitaliza.backend.dto;

import com.digitaliza.backend.entity.Projeto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjetoDTO {
    private Long id;
    private String titulo;
    private String descricao;
    private String localizacao;
    private String status;
    private Integer numeroVagas;
    private Integer vagasPreenchidas;
    private LocalDate dataInicio;
    private LocalDate dataFim;
    private String responsavelNome;
    private Long responsavelId;

    public static ProjetoDTO fromEntity(Projeto projeto) {
        return new ProjetoDTO(
            projeto.getId(),
            projeto.getTitulo(),
            projeto.getDescricao(),
            projeto.getLocalizacao(),
            projeto.getStatus().name(),
            projeto.getNumeroVagas(),
            projeto.getVagasPreenchidas(),
            projeto.getDataInicio(),
            projeto.getDataFim(),
            projeto.getResponsavel().getNome(),
            projeto.getResponsavel().getId()
        );
    }
}