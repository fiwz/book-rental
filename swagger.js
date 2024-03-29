const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Book Rental API",
      description:
        "API endpoints for a book rental documented on swagger",
      contact: {
        name: "Afiani Fauziah",
        email: "afianifauziah@gmail.com",
        url: "https://github.com/",
      },
      version: "1.0.0",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
        description: "Local server",
      },
      // {
      //   url: "",
      //   description: "Live server",
      // },
    ],
  },
  // looks for configuration in specified directories
  apis: ["./src/routes/*.js"],
};
const swaggerSpec = swaggerJsdoc(options);
function swaggerDocs(app, port) {
  // Swagger Page
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  // Documentation in JSON format
  app.get("/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
}
module.exports = swaggerDocs;
