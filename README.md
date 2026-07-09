# 🌐 Digitaliza+ — Inclusão Digital

**Backend:** Java + Spring Boot | **Frontend:** React | **Banco:** MySQL

---

## 🚀 Como rodar o projeto

### 1️⃣ Instalar os programas necessários

| Programa | Versão | Download |
|----------|--------|----------|
| Java JDK | 17 | https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html |
| Node.js | 18+ | https://nodejs.org/ |
| MySQL | 8.0 | https://dev.mysql.com/downloads/installer/ |
| VS Code | Última | https://code.visualstudio.com/download |

---

### 2️⃣ Configurar o banco de dados (MySQL)

1. Instale o MySQL Server (escolha a senha do `root` e **anote**).
2. Abra o **MySQL Workbench**.
3. Execute o script SQL que está em: `database/script.sql` (cria o banco `digitaliza_plus` e as tabelas).
4. No arquivo `backend/src/main/resources/application.properties`, altere a linha:
   ```properties
   spring.datasource.password=SUA_SENHA_DO_MYSQL

3️⃣ Rodar o Backend (Spring Boot)
cd backend
mvn spring-boot:run

O backend vai rodar em: http://localhost:8080/api

4️⃣ Rodar o Frontend (React)
cd frontend
npm install
npm start

O frontend vai rodar em: http://localhost:3000

    ⚠️ Os dois servidores (backend e frontend) precisam estar rodando ao mesmo tempo.