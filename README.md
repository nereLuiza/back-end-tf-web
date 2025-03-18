# back-end-tf-web
Back-End do trabalho final da disciplina de WEB

## Autores
Cibely Nascimento Soares

Luíza Castro Nere

Nicolas Rodrigues Bahia

Pedro Henrique Alves Costa

Tharcisio Alves Selis Silva

## Banco de Dados
A criação do BD do website foi feita via https://neon.tech/

A posterior conexão do BD com o back-end do projeto foi feita via URL e variáveis de ambiente (.env), mas o código utilizado para a codificação está disponível neste repositório.

## Endpoints
### [GET] /curso
Retorna todos os cursos e suas informações básicas.
### [POST] /curso
Cadastra um novo curso.

Exige token de acesso (exclusivo para adminsitradores).
```
{
    "code_curso": "ABCD",
    "nome_curso": "Técnico em Alguma Coisa",
    "desc_curso": "descrição",
    "mcc": "atalho matriz curricular",
    "ppc": "atalho ppc"
}
```
### [PUT] /curso/id
Atualiza os dados de algum curso (via id).

Exige token de acesso.
```
{
    "nome_curso": "Novo Nome",
    "desc_curso": "nova descrição",
    "mcc": "atalho nova mcc",
    "ppc": "atalho novo ppc"
}
```
### [DELETE] /curso/id
Remove o curso selecionado do BD.

Exige token de acesso.

### [GET] /pgt
Retorna todas as perguntas do teste e suas alternativas.
### [POST] /pgt
Adiciona uma nova pergunta.

Exige token de acesso.
```
{
   "pergunta": { "num_pgt": 0, "conteudo": "PERGUNTA" },
   "alternativas": [
      { "valor": "curso1", "conteudo": "alterativa A" },
      { "valor": "curso2", "conteudo": "alternativa B" },
      { "valor": "curso3", "conteudo": "alternativa C" },
   ]
}
```
### [PUT] /pgt/num
Atualiza/altera as informações de uma pergunta já existente.
```
{
    "pergunta": { "conteudo": "PERGUNTA" },
    "alternativas": [
        { "valor": "curso1", "conteudo": "A" },
        { "valor": "curso2", "conteudo": "B" },
        { "valor": "curso3", "conteudo": "C" }
    ]
}
```
### [DELETE] /pgt/num
Deleta a pergunta selecionada.

Exige token de acesso.

### [GET] /img
Retorna todas as imagens.
### [POST] /img
Insere uma nova imagem.

Exige token de acesso.
```
{
    "code_img": 0,
    "atalho": "/images/nome.jpg"
}
```
### [PUT] /img/code
Altera uma imagem pré existente.

Exige token de acesso.
```
{
    "atalho": "/images/nome.jpg"
}
```
### [DELETE] /img/code
Remove uma imagem do BD.

Exige token de acesso.
### [POST] /login
Permite o acesso de contas autorizadas à parte administratva.
```
{
    "email_admin": "teste@email.com",
    "senha_admin": "senhateste"
}
```