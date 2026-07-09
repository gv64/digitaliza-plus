package com.digitaliza.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "voluntarios")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Voluntario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @Column(name = "areas_atuacao", nullable = false, length = 255)
    private String areasAtuacao;

    @Column(name = "disponibilidade", length = 100)
    private String disponibilidade;

    @Column(name = "avaliacao", precision = 3, scale = 2)
    private BigDecimal avaliacao = BigDecimal.ZERO;

    @Column(name = "total_projetos")
    private Integer totalProjetos = 0;

    @Column(name = "biografia", columnDefinition = "TEXT")
    private String biografia;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private StatusVoluntario status = StatusVoluntario.DISPONIVEL;

    @CreationTimestamp
    @Column(name = "data_cadastro", updatable = false)
    private LocalDateTime dataCadastro;

    public enum StatusVoluntario {
        DISPONIVEL, OCUPADO, INDISPONIVEL
    }
}