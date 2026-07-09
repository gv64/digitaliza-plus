package com.digitaliza.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjetoRequestDTO {

    @NotBlank(message = "Título é obrigatório")
    private String titulo;

    @NotBlank(message = "Descrição é obrigatória")
    private String descricao;

    @NotBlank(message = "Localização é obrigatória")
    private String localizacao;

    @NotNull(message = "Número de vagas é obrigatório")
    private Integer numeroVagas;

    private LocalDate dataInicio;
    private LocalDate dataFim;

    @NotNull(message = "Responsável é obrigatório")
    private Long responsavelId;

    private String status = "PENDENTE";
}