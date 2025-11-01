# Fundação Asimo - UNIFEI

Website oficial do **projeto de extensão Fundação Asimo** da Universidade Federal de Itajubá (UNIFEI).  
O site possui uma **área pública** para divulgação do projeto e uma **área restrita** para membros e diretores, oferecendo ferramentas de gestão interna.

---

## 📌 Funcionalidades

- 🏠 **Homepage pública:** Quem somos, Eventos, Atividades e outras informações institucionais.  
- 🔐 **Área restrita:** Login para membros e diretores, com recursos de gestão (controle de horários, registro de horas, aniversariantes, administração de membros).

---

## ⚙️ Tecnologias utilizadas

- [Next.js](https://nextjs.org/docs/) — framework React moderno para aplicações web  
- [Vercel](https://vercel.com/) — hospedagem e deploy contínuo  

---

## 💻 Desenvolvimento Local

### 1. Clonar o repositório
```bash
git clone https://github.com/Fundacao-Asimo/Site_Asimo.git
cd Site_Asimo
```

### 2. Instalar dependências
```bash
npm install
# ou
yarn install
```

### 3. Rodar o servidor de desenvolvimento
```bash
npm run dev
# ou
yarn dev
```

### 4. Acessar localmente
Abra no navegador:
```bash
http://localhost:3000
```

### 5. Observações
- Hot reload: qualquer alteração no código é refletida automaticamente.
- Para build de produção:
```bash
npm run build
npm start
```

---

## 🧑‍💻 Colaboração

- Novos colaboradores podem clonar o repositório, desenvolver localmente e submeter Pull Requests.
- Alterações destinadas à branch `main` só são permitidas por meio de Pull Requests aprovados por um administrador do repositório.
- Todas as alterações devem respeitar o escopo institucional e acadêmico do projeto.
- Os direitos autorais originais devem ser preservados.
- O código pode ser atualizado por novos colaboradores dentro do contexto institucional da Fundação Asimo.

---

## 🌐 Hospedagem e Deploy

### A aplicação está configurada para **hospedagem na Vercel**, que suporta deploy automático de repositórios GitHub.

- Para acessar a conta da Vercel usada pelo projeto, vá em [https://vercel.com/](https://vercel.com/) e faça login com a conta Google da Fundação Asimo.
- Em `Projects` no painel, é possível acessar as configurações da aplicação `site-asimo`.
- Deploy automático ocorre a cada push para a branch `main`.
- Para cada push na branch `develop`, a aplicação é automaticamente implantada em um ambiente de desenvolvimento: [https://fundacaoasimo-develop.vercel.app/](https://fundacaoasimo-develop.vercel.app/).
  - Este ambiente de desenvolvimento é visível apenas para usuários com acesso à conta da Vercel da Fundação Asimo.
- A Vercel detecta automaticamente que se trata de um projeto Next.js.

### Configuração do domínio
- Novos domínios podem ser adicionados no painel da Vercel através da opção `Add Domain`.  
- O domínio fornecido pela UNIFEI (`.unifei.edu.br`) é gerenciado pela DTI.  
  É necessário que a DTI configure corretamente os registros DNS para que a Vercel possa apontar o domínio para a aplicação hospedada.

---

## 📄 Licença

Este projeto é licenciado sob uma **Licença Proprietária / Interna** da Fundação Asimo - UNIFEI.  
Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.

---