# Movies API

Uma API para cadastrar filmes e inserir uma nota entre 1 e 5, vinculado a um usuário cadastrado.

## Funcionalidades

- Cadastrar e editar usuário;
- Cadastrar um novo filme e suas tags;
- Deletar filme e tags vinculadas;
- Visualizar filme selecionado;
- Pesquisar filmes vinculados ao usuários por Título e Tag.

## Documentação da API

### Filmes

#### Retorna todos os filmes do usuário

```http
  GET /api/movieNotes
```

| Parâmetro | Tipo      | Descrição                      |
| :-------- | :-------- | :----------------------------- |
| `user_id` | `integer` | **Obrigatório**. ID do usuário |
| `title`   | `string`  | Título do filme                |
| `tags`    | `string`  | Nome da tag                    |

#### Retorna um filme

```http
  GET /api/movieNotes/:id
```

| Parâmetro | Tipo      | Descrição                                  |
| :-------- | :-------- | :----------------------------------------- |
| `id`      | `integer` | **Obrigatório**. ID do filme que você quer |

#### Cria um novo filme

```http
  POST /api/movieNotes/:user_id
```

```JSON
    {
        "title": "Nome do filme",
        "description": "Descrição do filme",
        "rating": 5,
        "tags": ["aventura", "ação"]
    }
```

| Parâmetro | Tipo      | Descrição                      |
| :-------- | :-------- | :----------------------------- |
| `user_id` | `integer` | **Obrigatório**. ID do usuário |

#### Deletar um filme

```http
  DELETE /api/movieNotes/:id
```

| Parâmetro | Tipo      | Descrição                    |
| :-------- | :-------- | :--------------------------- |
| `id`      | `integer` | **Obrigatório**. ID do filme |

### Tags

#### Retorna todas as tags do usuário

```http
  GET /api/movieTags
```

| Parâmetro | Tipo      | Descrição                      |
| :-------- | :-------- | :----------------------------- |
| `user_id` | `integer` | **Obrigatório**. ID do usuário |

### Usuários

#### Cria um novo usuário

```http
  POST /api/users
```

```JSON
    {
	"name": "usuário",
	"email": "usuario@email.com",
	"password": "123"
}
```

| Parâmetro  | Tipo     | Descrição                          |
| :--------- | :------- | :--------------------------------- |
| `name`     | `string` | Nome do usuário                    |
| `email`    | `string` | **Obrigatório**. E-mail do usuário |
| `password` | `string` | **Obrigatório**. Senha do usuário  |

#### Editar usuário

```http
  PUT /api/users/:id
```

```JSON
    {
	"name": "usuário",
	"email": "usuario@email.com",
	"password": "1234",
    "old_password": "123"
}
```

| Parâmetro      | Tipo     | Descrição                                   |
| :------------- | :------- | :------------------------------------------ |
| `name`         | `string` | Nome do usuário                             |
| `email`        | `string` | **Obrigatório**. E-mail do usuário          |
| `password`     | `string` | **Obrigatório**. Nova senha enha do usuário |
| `old_password` | `string` | **Obrigatório**. Antiga senha do usuário    |

## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/juliaaoliveeirs/movies_api.git
```

Entre no diretório do projeto

```bash
  cd movies_api
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run start
```

Roda as migrations para criação do banco

```bash
  npm run migrate
```

## Stack utilizada

**🛠️Back-end:** Node, Express, BCrypt

**💾Banco de dados:** SQLite, Knex

## Licença

[MIT](https://choosealicense.com/licenses/mit/)
