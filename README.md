# pet-adoption
Este repositório contém o código-fonte e os recursos relacionados ao projeto prático desenvolvido como parte da disciplina "Prática em Desenvolvimento de Software". O objetivo principal deste projeto é criar uma plataforma web dedicada à adoção responsável de cães e gatos.

## Membros da equipe
 - Eduardo Correia -   Fullstack;
 - Rafael Chimicatti - Fullstack;
 - Bernardo Viggiano - Fullstack;
 - Juan Coelho -       Fullstack

## Proposta

O projeto visa desenvolver uma plataforma online que facilite o processo de adoção de animais de estimação, promovendo a conexão entre animais necessitados de um lar e pessoas interessadas em adotar. A plataforma oferecerá uma variedade de recursos e funcionalidades para tornar o processo de adoção mais acessível, transparente e conveniente para todos os envolvidos.

Principais features:

 - Processo de Candidatura para Adoção;
 - Perfil do Animal com Informações Detalhadas;
 - Pesquisa de Animais para Adoção;
 - Recomendação de Pet ao Usuário;
 - Recursos de Compartilhamento em Redes Sociais;
 - Notificações sobre Novos Animais Disponíveis

## Tecnologias

- TypeScript (Linguagem de programação)
- Express.js (Back-end)
- React.js (Front-end)
- SQLite (Banco de dados)
- Jest (Testes)
- Figma (Prototipação)

## Backlog do Produto 
- Como usuário comum, gostaria de criar e deletar um anúncio PET. 
- Como usuário comum, gostaria de me cadastrar na plataforma. 
- Como usuário comum, gostaria de adicionar fotos ao anúncio do PET.
- Como usuário comum, gostaria de entrar em contato com o usuário que cadastrou o pet para tirar possíveis dúvidas.
- Como usuário comum, gostaria de reagir ao anúncio de um PET para demonstrar interesse.
- Como usuário comum, gostaria de ter acesso a informações do anúncio do PET. 
- Como usuário comum, gostaria de editar o anuncio.
- Como usuário comum, gostaria de ter a possibilidade de postar uma descrição de um animal que estou procurando.
- Como usuário comum, gostaria de filtrar os anúncios através de tags. 
- Como usuário comum, gostaria de avaliar outro usuário. 
- Como usuário comum, gostaria de denunciar perfis e posts de outros usuários. 
- Como usuário administrador, gostaria de autorizar o anuncio de um PET.
- Como usuário administrador, gostaria de excluir posts para maior organização do aplicativo.
- Como usuário administrador, gostaria de banir um usuário comum do aplicativo. 
- Como usuário administrador, gostaria de censurar avaliações e comentários com conteúdo ofensivo.
- Como usuário administrador, gostaria de avaliar denuncia de perfis e posts realizadas por usuários comuns. 

## Backlog da Sprint 2

•	História #1: Setup banco de dados 
•	Tarefas e responsáveis: Rafael Chimicatti
   1.	Definição das tabelas 
   2.	Definição dos relacionamentos
   3.	Definição dos atributos 
   4.	Criação do BD

•	História #2: Definição do backend
•	Tarefas e responsáveis: Eduardo Correia 
   1.	Configurar Docker 
   2.	Configuração do Express.js
   3.	Conexão com o BD
   4.	Setup documentação (backend)
   5.	Configuração TS para backend

•	História #3: Definição do frontend 
•	Tarefas e responsáveis: Juan Coelho
   1.	Configuração do React.js 
   2.	Configuração TS para frontend
   3.	Configuração CSS

•	História #4: Como usuário comum, quero poder me cadastrar na plataforma.
•	Tarefas e responsáveis: Bernardo Viggiano
   1.	Implementar tela inicial.
   2.	Implementar tela de cadastro.
   3.	Implementar rota de cadastro.
   4.	Implementar rota de login.
   5.	Implementar no backend a lógica de autenticação. 

•	História #5: Como usuário comum, quero poder criar, deletar e editar um anúncio PET.
•	Tarefas e responsáveis: Eduardo Correia
   1.	Implementar tela de gerenciamento de anúncio.
   2.	Implementar rota de criação.
   3.	Implementar rota de edição. 
   4.	Implementar rota de exclusão. 


•	História #6: Como usuário comum, quero poder ter acesso a informações do anúncio do PET.
•	Tarefas e responsáveis: Juan Coelho
   1.	Implementação da tela de anúncios. 
   2.	Implementação da tela de anúncios específicos (um a um).
   3.	Implementar rota de listagem. 

•	História #7: Como usuário comum, gostaria de reagir ao anúncio de um PET para demonstrar interesse. 
•	Tarefas e responsáveis: Bernardo Viggiano
   1.	Implementar botões de reação. 
   2.	Implementar rota de adição de reações. 

•	História #8: Como usuário comum, gostaria de avaliar outro usuário. 
•	Tarefas e responsáveis: Rafael Chimicatti 
   1.	Criação do perfil do usuário. 
   2.	Criação da lógica de avaliação do usuário. 
   3.	Implementar rota de avaliação de usuário. 

•	História #9: Como usuário comum, gostaria de denunciar posts de outros usuários. 
•	Tarefas e responsáveis: Bernardo Viggiano
  1.	Criação da lógica de denúncia de posts. 
  2.	Criação do pop-up. 
  3.	Implementar rota de denúncia de posts. 

•	História #10: Como usuário administrador, quero banir um usuário comum do aplicativo. 
•	Tarefas e responsáveis: Eduardo Correia
   1.	Criação de tela de denúncias. 
   2.	Criação do botão de banir usuário. 
   3.	Implementação da lógica de banimento do usuário, baseado na permissão. 
   4.	Implementação da rota de banimento do usuário comum do aplicativo.

•	História #11: Como usuário administrador, gostaria de excluir posts para maior organização do aplicativo. 
•	Tarefas e responsáveis: Juan Coelho
   1.	Criação do botão de exclusão de posts, baseado na permissão.
   2.	Lógica de exclusão de posts. 
   3.	Implementação da rota da exclusão de posts. 
