# vending-machine-challenge

## Pré-requisitos

* NodeJS 12+

### Principais ferramentas utilizadas

- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [MySQL](https://www.mysql.com/)
- [TypeORM](https://typeorm.io/)
- [Jest](https://jestjs.io/)

---

## Começando

Para utilizar aplicação com uma cópia local dos arquivos, siga os passos abaixo.

### Instalação

1. Clone o repositório com o comando `git clone https://github.com/SamuelSabino/vending-machine-challenge.git`.

2. Depois de clonado, na raiz do projeto, execute o comando abaixo para a instalação das dependências.

```text
npm install
```

ou

```text
yarn install
```


 3. Para configurar o banco de dados (MySQL), você precisa ter instalado o mesmo em sua máquina e através de uma interface para gerenciar suas Instâncias, crie um banco de dados  com o comando abaixo, se preferir:

  ```
  CREATE DATABASE 'vending_machine';
 ```

  4. Depois de criado a base de dados, execute o comando abaixo para criar a(s) tabela(s):

 ```
 npm run typeorm migration:run
 ```

 ou 

 ```
 yarn typeorm migration:run
 ```

 `OBS`.: Juntamente com a criação da tabela, foi adicionado um script para inserção de alguns valores para poder executar testes na aplicação.


 5. E por fim, execute o comando abaixo para inicialização da aplicação:

```text
npm run start
```

ou

```text
yarn start
```

Após executado o comando, a aplicação será inicializada com todas as dependências instaladas e configuradas.

 ---

## Utilizando a aplicação

> NOTA: na raiz do projeto há uma pasta chamada `files` e a mesma possui um arquivo chamado `coin.json`, nesse arquivo tem o modelo de objeto para ser utilizado nas requisições.



 ## Adicionar (mais) moedas
  - **`POST /add`**: Para poder adicionar a moedas na base, sendo inserindo novas moedas ou adicionando mais, precisa ser enviado, dentro do corpo da requisição um objeto contendo o campo `availableCoins`, que seria uma lista de objetos que contém dois valores, `value` e `quantity`.

URL:

 ```
 [POST] http://localhost:8080/coins/add
 ```

Modelo do objeto que será enviado no corpo da requisição:

 ```
{
  "availableCoins": [
    {
      "value": 0.01,
      "quantity": 20
    },
    {
      "value": 0.05,
      "quantity": 20
    },
    {
      "value": 0.10,
      "quantity": 20
    },
    {
      "value": 0.25,
      "quantity": 20
    },
    {
      "value": 0.50,
      "quantity": 20
    },
    {
      "value": 1.00,
      "quantity": 20
    }
  ]
}
 ```

 E com isso será retorno uma lista de objetos conforme o modelo abaixo:
 ```
{
  "result": [
    {
      "id": 1,
      "value": "0.01",
      "quantity": 140,
      "created": "2021-02-24T05:24:00.000Z",
      "updated": "2021-02-24T05:57:56.000Z",
      "version": 7
    },
    {
      "id": 2,
      "value": "0.05",
      "quantity": 113,
      "created": "2021-02-24T05:24:00.000Z",
      "updated": "2021-02-24T05:57:56.000Z",
      "version": 6
    },
    {
      "id": 3,
      "value": "0.10",
      "quantity": 82,
      "created": "2021-02-24T05:24:00.000Z",
      "updated": "2021-02-24T05:57:56.000Z",
      "version": 5
    },
    {
      "id": 4,
      "value": "0.25",
      "quantity": 102,
      "created": "2021-02-24T05:24:00.000Z",
      "updated": "2021-02-24T05:57:56.000Z",
      "version": 5
    },
    {
      "id": 5,
      "value": "0.50",
      "quantity": 81,
      "created": "2021-02-24T05:24:00.000Z",
      "updated": "2021-02-24T05:57:56.000Z",
      "version": 5
    },
    {
      "id": 6,
      "value": "1.00",
      "quantity": 94,
      "created": "2021-02-24T05:24:00.000Z",
      "updated": "2021-02-24T05:57:56.000Z",
      "version": 5
    }
  ]
}
 ```

 ## Calcular quantidade de moedas que será retornada

- **`POST /`**: Para poder calcular a menor quantidade de moedas que será utilizada no troco, precisa ser enviado, no corpo da requisição um objeto contendo os campos `availableCoins` e `change`, onde o item `availableCoins` seria uma lista de objetos que contém dois valores, `value` e `quantity` e o item `change`, o valor do troco a ser utilizado no cálculo.

URL:

 ```
  [POST] http://localhost:8080/coins/
 ```

Modelo do objeto que será enviado no corpo da requisição:

 ```
{
  "change": 4.5,
  "availableCoins": [
    {
      "value": 0.01,
      "quantity": 20
    },
    {
      "value": 0.05,
      "quantity": 20
    },
    {
      "value": 0.10,
      "quantity": 20
    },
    {
      "value": "0.25",
      "quantity": 20
    },
    {
      "value": "0.50",
      "quantity": 20
    },
    {
      "value": "1.00",
      "quantity": 20
    }
  ]
}
 ```

 E com isso será retorno uma lista de objetos conforme o modelo abaixo:
 ```
{
  "result": [
    "R$ 1,00 real: 0",
    "R$ 0,50 centavos: 1",
    "R$ 0,25 centavos: 16",
    "R$ 0,10 centavos: 0",
    "R$ 0,05 centavos: 0",
    "R$ 0,01 centavo: 0"
  ]
}
 ```

 ## Visualizar a quantidade de moedas na máquina
 
- **`GET /`**: Busca e exibe a quantidade de cada moeda disponivel na base.

URL:

 ```
  [GET] http://localhost:8080/coins/
 ```

Modelo do objeto que será retornado da requisição:

 ```
{
  "result": [
    "R$ 0,01 centavo: 20",
    "R$ 0,05 centavos: 13",
    "R$ 0,10 centavos: 2",
    "R$ 0,25 centavos: 6",
    "R$ 0,50 centavos: 0",
    "R$ 1,00 real: 0"
  ]
}
 ```

 ## Limpar máquina / base

- **`DELETE /`**: Limpa a base de dados, apagando todas moedas disponiveis.

URL:

 ```
  [DELETE] http://localhost:8080/coins/
 ```


Modelo do objeto que será retornado da requisição:

 ```
{
  "result": []
}
 ```
---

## Testes automatizados

### Como rodar os testes
 * para rodar os testes automatizados, basta executar o comando abaixo:

```
npm run test
```
 ou 

```
yarn test
```


### Reporte do coverage (taxa de cobertura)
* Após executado todos os testes, execute o comando abaixo para visualizar numa página web o relatório da cobertura de todos os testes aplicados:

```
npm run coverage:report
```

ou

```
yarn coverage:report
```

---

## Convenções

### Estilo

* eslint com o padrão de regras [standard](https://standardjs.com).

### Nomenclatura das Pastas

* utilização do estilo de escrita kebab-case para todas as pastas.

### Arquivos
* kebab-case utilizado para todos os arquivos.
* arquivos de testes utilizando o padrão *.spec.ts (para testes de unidade).

## Visão Geral da Arquitetura

```text
├── __tests__/
│   │   └── unit/
|   │   │   └── *.spec.ts
├── __files__/
│   └── coin.json.ts
├── src/
│   ├── modules/
│   │   └── **/
|   │   │   └── dtos/
|   |   │   │   └── *.dto.ts
|   │   │   └── infra/
|   |   │   │   └── fake/
|   |   |   │   │   └── repositories/
|   |   |   |   │   │   └── *.repository.ts
|   |   │   │   └── http/
|   |   |   │   │   └── controllers/
|   |   |   |   │   │   └── *.controller.ts
|   |   |   │   │   └── routers/
|   |   |   |   │   │   └── *.router.ts
|   |   |   │   │   └── schemas/
|   |   |   |   │   │   └── *.schema.ts
|   |   │   │   └── typeorm/
|   |   |   │   │   └── entities/
|   |   |   |   │   │   └── *.entity.ts
|   |   |   │   │   └── repositories/
|   |   |   |   │   │   └── *.repository.ts
|   │   │   └── interfaces/
|   |   │   │   └── *.interface.ts/
|   │   │   └── services/
|   |   │   │   └── *.service.ts/
|   │   │   └── use-case/
|   |   │   │   └── *.use-case.ts/
│   ├── shared/
|   │   ├── errors/
|   |   │   ├── *.error.ts
|   │   ├── infra/
|   |   │   └── http/
|   |   │   │   └── routers/
|   |   |   │   │   └── index.router.ts
|   |   │   │   └── app.ts
|   |   │   │   └── server.ts
|   │   │   └── typeorm/
|   |   │   │   └── migrations/
|   |   |   │   │   └── *.ts
|   |   │   │   └── seeds/
|   |   |   │   │   └── *.seed.ts
|   |   │   │   └── index.ts
├── .eslintignore
├── .eslintrc.js
├── .gitignore
├── jest.config.ts
├── nodemon.json
├── ormconfig.json
├── package.json
├── tsconfig.json
└── readme.md
```