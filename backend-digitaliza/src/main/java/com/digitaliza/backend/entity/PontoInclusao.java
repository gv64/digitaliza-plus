package com.digitaliza.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "pontos_inclusao")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PontoInclusao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome", nullable = false, length = 150)
    private String nome;

    @Column(name = "endereco", nullable = false, length = 255)
    private String endereco;

    @Column(name = "tipo", nullable = false, length = 50)
    private String tipo;

    @Column(name = "capacidade")
    private Integer capacidade = 20;

    @Column(name = "equipamentos", columnDefinition = "TEXT")
    private String equipamentos;

    @Column(name = "contato", length = 100)
    private String contato;

    @Column(name = "horario_funcionamento", length = 100)
    private String horarioFuncionamento;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private StatusPonto status = StatusPonto.ATIVO;

    @CreationTimestamp
    @Column(name = "data_cadastro", updatable = false)
    private LocalDateTime dataCadastro;

    public enum StatusPonto {
        ATIVO, INATIVO, MANUTENCAO
    }
}