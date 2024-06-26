# Documentação - Arquitetura Hexagonal

Nosso código está dividio em 2 partes principais, de forma que temos uma divio muito clara da camada de domínio e a camada de adaptadores e entrada e saída (API)
![img1](https://github.com/juancoelhoo/pet-adoption/tree/main/frontend/docs/img1.png?raw=true)
<br>

Na parte do domínio, dividimos em 'entities', 'interfaces' e 'usecases' para conter um código que só sabe das regras de negócio, sem saber de nada da implementação dos adaptadores.
Para abstrair a implementação verdadeira, usamos o padrão factory e invertemos a dependência do adaptador.
![img2](https://github.com/juancoelhoo/pet-adoption/tree/main/frontend/docs/img2.png?raw=true)
<br>

Na parte da API, fizemos algumas separações "clássicas" (middlewares, config, docs e etc).
O ponto interessante dessa parte é que o controller chama a factory, assim ele não tem a mínima noção das regras de negócio, nem da implementação dos serviços (Exemplo: Banco de Dados).
![img3](https://github.com/juancoelhoo/pet-adoption/tree/main/frontend/docs/img3.png?raw=true)
<br>

Por último, a parte da implementação dos adaptadores, onde nós implementamos as interfaces de modo que essas também não saibam das regras de negócio, mas que possam acessar as entidades e interfaces por exemplo.
![img4](https://github.com/juancoelhoo/pet-adoption/tree/main/frontend/docs/img4.png?raw=true)