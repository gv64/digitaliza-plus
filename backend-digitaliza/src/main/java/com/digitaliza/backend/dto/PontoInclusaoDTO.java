package com.digitaliza.backend.dto;

import com.digitaliza.backend.entity.PontoInclusao;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PontoInclusaoDTO {
    private Long id;
    private String nome;
    private String endereco;
    private String tipo;
    private Integer capacidade;
    private String equipamentos;
    private String contato;
    private String horarioFuncionamento;
    private String status;

    public static PontoInclusaoDTO fromEntity(PontoInclusao ponto) {
        return new PontoInclusaoDTO(
            ponto.getId(),
            ponto.getNome(),
            ponto.getEndereco(),
            ponto.getTipo(),
            ponto.getCapacidade(),
            ponto.getEquipamentos(),
            ponto.getContato(),
            ponto.getHorarioFuncionamento(),
            ponto.getStatus().name()
        );
    }
}