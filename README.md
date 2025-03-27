# Scraper Best-Sellers API

## Descrição do Projeto

Este projeto implementa um **web scraper** que extrai os três primeiros produtos da página de best-sellers da Amazon Brasil. As informações extraídas são armazenadas em um banco de dados **DynamoDB** na AWS, e podem ser acessadas através de uma **API RESTful** construída com o **AWS Lambda** e **API Gateway**.

### Funcionalidades:

- **Scraping**: O scraper utiliza o **Puppeteer** para navegar na página de best-sellers da Amazon e extrair os três primeiros produtos.
- **Armazenamento**: Os produtos extraídos são salvos no **DynamoDB**.
- **API**: Uma API foi construída para disponibilizar os produtos salvos no banco de dados via AWS Lambda e API Gateway.

---

## Links:

- **Repositório no GitHub**:  
  [https://github.com/pedrorenanvm/scraper-best-sellers-api](https://github.com/pedrorenanvm/scraper-best-sellers-api)

- **API Deployada**:  
  [https://el440r9415.execute-api.us-east-1.amazonaws.com/dev/products](https://el440r9415.execute-api.us-east-1.amazonaws.com/dev/products)  
  (Testar o endpoint GET para acessar os produtos salvos no DynamoDB)

---

## Como Executar o Scraper Localmente

### **Pré-requisitos**

- **Node.js** (versão 18.x ou superior)
- **TypeScript**
- **Serverless Framework** (para o deploy e gerenciamento da API)
- **AWS CLI** (caso queira realizar o deploy para a AWS)

### **Passos para Execução**

1. **Clone o repositório**:
   ```sh
   git clone https://github.com/pedrorenanvm/scraper-best-sellers-api.git
   cd scraper-best-sellers-api
   ```

2. **Instale as dependências**:
   ```sh
   npm install
   ```

3. **Configuração do AWS CLI** (se ainda não configurado na máquina):
   ```sh
   aws configure
   ```

4. **Executando o Scraper**:
   ```sh
   npm run scraper
   ```
   Ou compile o arquivo .ts diretamente
   ```sh
   npx ts-node src/scraper/index.ts
   ```



---

## Como Realizar o Deploy para a AWS

1. **Configurar o Serverless Framework**:
   ```sh
   npm install -g serverless
   ```

2. **Fazer o Deploy**:
   ```sh
   serverless deploy
   ```

3. **Acessando a API**(o serverless vai retornar no console o link com a api, no exemplo o link é da minha api já com deploy):
   ```sh
   curl -X GET https://el440r9415.execute-api.us-east-1.amazonaws.com/dev/products
   ```

---

## Tecnologias Utilizadas

- **Node.js** e **TypeScript** para a construção do backend.
- **Puppeteer** para o web scraping.
- **AWS Lambda** para a execução de funções serverless.
- **API Gateway** para criar a API RESTful.
- **DynamoDB** para armazenar os dados extraídos.
- **Serverless Framework** para facilitar o deploy e gerenciamento do serviço na AWS.

---

## Estrutura do Projeto

```
src/
 ├── handlers/       # Funções Lambda para manipulação das rotas da API
 │   ├── getProducts.ts
 │
 ├── scraper/        # Código do web scraper
 │   ├── index.ts    # Lógica de scraping da Amazon
 │
 ├── services/       # Serviços (interação com DynamoDB)
 │   ├── dynamoService.ts
  
```

---

## Licença

Esse projeto está licenciado sob a **MIT License**.

