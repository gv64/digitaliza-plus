package com.digitaliza.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PontoInclusaoRequestDTO {

    @NotBlank(message = "Nome é obrigatório")
    private String nome;

    @NotBlank(message = "Endereço é obrigatório")
    private String endereco;

    @NotBlank(message = "Tipo é obrigatório")
    private String tipo;

    private Integer capacidade;
    private String equipamentos;
    private String contato;
    private String horarioFuncionamento;
    private String status = "ATIVO";
}