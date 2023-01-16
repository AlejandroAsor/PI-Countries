const chai = require("chai");
const activityRouter = require("../../src/routes/activities");
const { Activity } = require("../../src/db");

const expect = chai.expect;

describe("Activity Router", () => {
  describe("GET /activity", () => {
    it("debería devolver todas las actividades", async () => {
      const allActivities = await Activity.findAll({
        attributes: ["name", "id"],
      });
      expect(allActivities).to.be.an("array");
      expect(allActivities[0]).to.have.property("name");
      expect(allActivities[0]).to.have.property("id");
    });
  });

  describe("POST /activity", () => {
    it("debería crear una nueva actividad", async () => {
      const activityData = {
        name: "Test Activity",
        difficulty: 3,
        duration: 2,
        season: "Verano",
      };
      const newActivity = await Activity.create(activityData);
      expect(newActivity).to.have.property("name", "Test Activity");
      expect(newActivity).to.have.property("difficulty", 3);
      expect(newActivity).to.have.property("duration", 2);
      expect(newActivity).to.have.property("season", "Verano");
    });
  });

  describe("DELETE /activity/:id", () => {
    it("debería eliminar una actividad existente", async () => {
      const newActivity = await Activity.create({
        name: "Test Activity",
        difficulty: 3,
        duration: 2,
        season: "Verano",
      });
      const deletedRowsCount = await Activity.destroy({
        where: { id: newActivity.id },
      });
      expect(deletedRowsCount).to.equal(1);
    });
  });
});
