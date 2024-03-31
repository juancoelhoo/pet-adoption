import swaggerDocs from "swagger-jsdoc";

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Pet Adoption's Backend Docs",
			version: "1.0.0",
			description: "Project documentation",
		},
		servers: [
			{
				url: "http://localhost:3333",
			},
		],
	},
	apis: ["./src/infra/api/modules/**/*.ts"],
};

export const swaggerSpecs = swaggerDocs(options);
