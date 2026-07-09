package com.digitaliza.backend.dto;

import com.digitaliza.backend.entity.Voluntario;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VoluntarioDTO {
    private Long id;
    private String nome;
    private String email;
    private String areasAtuacao;
    private String disponibilidade;
    private BigDecimal avaliacao;
    private Integer totalProjetos;
    private String biografia;
    private String status;

    public static VoluntarioDTO fromEntity(Voluntario voluntario) {
        return new VoluntarioDTO(
            voluntario.getId(),
            voluntario.getUsuario().getNome(),
            voluntario.getUsuario().getEmail(),
            voluntario.getAreasAtuacao(),
            voluntario.getDisponibilidade(),
            voluntario.getAvaliacao(),
            voluntario.getTotalProjetos(),
            voluntario.getBiografia(),
            voluntario.getStatus().name()
        );
    }
}