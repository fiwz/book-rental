const request = require("supertest");
const app = require("../server.js");
require("dotenv").config();

describe("GET /api/books", () => {
  it("should return available books", async () => {
    return request(app)
      .get("/api/books")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.statusCode).toBe(200);
      });
  });
});
