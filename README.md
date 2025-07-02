# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

---------------------------------------------------------------------------------------------------------------------------------------

LoginForm.jsx: Este componente representa a tela de login do sistema.

Funções principais:
Usa useState para armazenar o email, a senha e o controle da exibição do diálogo de erro.

Usa axios para enviar os dados de login para o backend.

Usa useNavigate para redirecionar o usuário após o login bem-sucedido.

Exibe o componente DialogMessage quando o login falha com erro 400.

Estrutura:
Um título principal “FinanCiência”.

Dois campos de entrada: um para email (usuário) e outro para senha.

Um botão "Entrar" que dispara a função de login (acessar()), desativado se os campos estiverem vazios.

Um diálogo modal de erro, exibido somente em caso de falha no login.

---------------------------------------------------------------------------------------------------------------------------------------
DialogMessage.jsx: Este componente exibe uma caixa de diálogo com a mensagem “Login Inválido”.

Funções principais:
Recebe uma função onClose como prop, que é chamada ao clicar no botão “Ok!”.

Usa o elemento HTML <dialog> com open para exibir automaticamente.

É usado para informar ao usuário que o login falhou por erro do tipo 400 (credenciais inválidas).

Estrutura:
Um título “Erro!”.

Um parágrafo com a mensagem “Login Inválido!”.

Um botão “Ok!” que executa a função onClose.

---------------------------------------------------------------------------------------------------------------------------------------