"use strict";

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert("Weapons", [
      {
        model: "Топор",
        description: "красный",
        model_link: "/models/axe.glb",
        img_link: "/images/axe.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        model: "Ножик",
        description: "красивый",
        model_link: "/models/bayonet.glb",
        img_link: "/images/knife.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        model: "Пушка",
        description: "большая",
        model_link: "/models/steyr.glb",
        img_link: "/images/gun.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("Weapons", null, {});
  },
};
