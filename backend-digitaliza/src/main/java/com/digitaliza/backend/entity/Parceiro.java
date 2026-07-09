package com.digitaliza.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "parceiros")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Parceiro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome", nullable = false, length = 150)
    private String nome;

    @Column(name = "cnpj", nullable = false, unique = true, length = 18)
    private String cnpj;

    @Column(name = "tipo", nullable = false, length = 50)
    private String tipo;

    @Column(name = "endereco", length = 255)
    private String endereco;

    @Column(name = "telefone", length = 20)
    private String telefone;

    @Column(name = "email", length = 100)
    private String email;

    @Column(name = "site", length = 150)
    private String site;

    @Column(name = "descricao", columnDefinition = "TEXT")
    private String descricao;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private StatusParceiro status = StatusParceiro.ATIVO;

    @CreationTimestamp
    @Column(name = "data_cadastro", updatable = false)
    private LocalDateTime dataCadastro;

    @OneToMany(mappedBy = "parceiro", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Doacao> doacoes = new ArrayList<>();

    public enum StatusParceiro {
        ATIVO, INATIVO
    }
}