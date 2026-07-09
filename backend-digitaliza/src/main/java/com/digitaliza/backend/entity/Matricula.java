package com.digitaliza.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "matriculas")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Matricula {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "projeto_id", nullable = false)
    private Projeto projeto;

    @CreationTimestamp
    @Column(name = "data_inscricao", updatable = false)
    private LocalDateTime dataInscricao;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private StatusMatricula status = StatusMatricula.INSCRITO;

    @Column(name = "avaliacao_projeto", precision = 3, scale = 2)
    private BigDecimal avaliacaoProjeto;

    @Column(name = "feedback", columnDefinition = "TEXT")
    private String feedback;

    public enum StatusMatricula {
        INSCRITO, CONFIRMADO, CONCLUIDO, CANCELADO
    }
}