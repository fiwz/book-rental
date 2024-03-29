const request = require("supertest");
const app = require("../server.js");
require("dotenv").config();

describe("GET /api/members", () => {
  it("should return all members with their borrowed book", async () => {
    return request(app)
      .get("/api/members")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.statusCode).toBe(200);
      });
  });
});
