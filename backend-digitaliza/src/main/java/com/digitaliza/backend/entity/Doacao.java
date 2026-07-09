package com.digitaliza.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "doacoes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Doacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "parceiro_id", nullable = false)
    private Parceiro parceiro;

    @ManyToOne
    @JoinColumn(name = "projeto_id")
    private Projeto projeto;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_recurso", nullable = false)
    private TipoRecurso tipoRecurso;

    @Column(name = "descricao", columnDefinition = "TEXT")
    private String descricao;

    @Column(name = "quantidade")
    private Integer quantidade = 1;

    @Column(name = "valor", precision = 10, scale = 2)
    private BigDecimal valor;

    @CreationTimestamp
    @Column(name = "data_doacao", updatable = false)
    private LocalDateTime dataDoacao;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private StatusDoacao status = StatusDoacao.PENDENTE;

    public enum TipoRecurso {
        EQUIPAMENTO, FINANCEIRO, INFRAESTRUTURA, CAPACITACAO
    }

    public enum StatusDoacao {
        PENDENTE, ENTREGUE, CANCELADO
    }
}