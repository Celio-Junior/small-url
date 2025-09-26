# Introdução
esse projeto que criei, que tem objetivo encurtar url, ele no caso encurtar tbm mostar quais urls que foi encurtadas, ele foi projeto criado com node, usando modulos nativos do node, como sqlite

## tecnologias
* NODE(versão 22.14.0 LTS)
* Typescript/Javascript

## dependências
* fastify(pra instanciar o server, tbm tem junto algumas dependências junto com ele)
* sql-bricks(inserir comandos mais seguros com sql)
* env-var(para tipar e pegar variaveis de ambiente)
* typescript(esse projeto foi usado ele como linguagem main)

## ❌ serviço que não foram feito ❌
* Sistema de login
* aba de suas urls que foram encurtadas

# Small Url

Site que tem a proposta <strong>encurtar url</strong>  que foi feito vanillamente, mas com acréssimo do typescript, tanto frontend e seu backend, site consta pro usuário encurtar ulr, como opções de acessar diretamente ou copiar a url que foi encurtada, ele tem mecanismo de route-dom(antiga de dependência de routeamentos sem recarregar páginas), que tem proposta como foi dito direcionar "páginas" sem recarregar a própria página, tudo isso sendo feito nativamente sem uso de bibliotecas/dependências, seu banco de dandos escolhido foi o <strong>SQLITE</strong>, mas isso usando própio node com o seu módulo, junto com ele, eu criei o minha própria <strong>ORM</strong> com as dependências que foram citadas acima, para assim usar esse modulo com mais segurança

