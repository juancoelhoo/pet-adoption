# Pet Adoption's Backend

### :page_with_curl: Requirements:
- Docker: [https://docs.docker.com/get-docker/](https://docs.docker.com/get-docker/)
- NodeJS: [https://medium.com/geekculture/how-to-install-node-js-by-nvm-61addf4ab1ba](https://medium.com/geekculture/how-to-install-node-js-by-nvm-61addf4ab1ba)
- Yarn: [https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable)

### :arrow_down: How to install dependencies:
We will be using only [yarn](https://classic.yarnpkg.com/lang/en/docs/) in this project, please do not use any other package manager to add or remove dependencies. <br>

To install all dependencies listed on **package.json**, just use: `yarn install` in the `backend/` folder.

### :arrow_forward: How to run:
Only do this step after **installing the dependencies**.

To start docker-compose server, use: `docker-compose up -d` <br>
To stop it, use `docker-compose down` <br>
Run both of these commands in the root folder of this git repository.

### :card_index: How to see the logs:
To see the logs, use: `docker logs backend --follow` <br>
If you want to use detached mode, just type: `docker logs backend`

### :test_tube: How to test it:
Just type [localhost:3333/examples/all](http://localhost:3333/examples/all) in your browser and you will be able to see the first route that will be used as a template.

### :memo: Documentation:
API Swagger documentation available in [http://localhost:3333/docs](http://localhost:3333/docs/);

### :package: How to add dependencies:
To add a production dependency, use: `yarn add <dependency_name>` <br>
To add a development dependency, use: `yarn add <dependency_name> -D`<br>
Run both of these commands in the `backend/` folder.

<br>

PS.: For docker commands, you may need to use `sudo`.
