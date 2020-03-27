// Importação do microframeword para gerenciamento do node
const express = require('express');
//Importação do módulo de segurança de requisição (Permissão de quais aplicações acessam este service)
const cors = require('cors');
// Importação do módulo de exibição de erros de validação de campos
const { errors } = require('celebrate');
// Arquivo criado, separadamente com os recursos do service
const routes = require('./routes');

const app = express();

// Segurança de Acesso da Aplicação
app.use(cors());

//Indica o tipo de Requisição que será enviada ao Servidor
app.use(express.json());

// Importa o arquivos de rotas criado separadamente para efeito de organização
app.use(routes);

// Modulo do Celebrate para envio de informações de erros nas validações das rotas
app.use(errors());

// Exporta o módulo para que o arquivo server receba e crie a esculta da porta desejada
module.exports = app;
