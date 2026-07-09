package com.digitaliza.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VoluntarioRequestDTO {

    @NotNull(message = "ID do usuário é obrigatório")
    private Long usuarioId;

    @NotBlank(message = "Áreas de atuação é obrigatório")
    private String areasAtuacao;

    private String disponibilidade;
    private String biografia;
    private String status = "DISPONIVEL";
}