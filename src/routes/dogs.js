const { Router } = require('express');
const { getAllDogs, getApiInfo } = require('../../controllers/dogsInfo')
const { Dog, Temperament } = require('../db')

const router = Router();

router.get('/', async (req, res) => {
  const { name } = req.query;
  let totalDogs = await getAllDogs();
  if (name) {
    let dogName = totalDogs.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()));
    dogName.length ?
      res.send(dogName) :
      res.status(404).send("Perro no encontrado")
  } else {
    res.send(totalDogs);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  if (id.length > 3) {
    try {
      let dog = await Dog.findByPk(id, {
        include: [
          {
            model: Temperament,
            attributes: ["name"],
          },
        ],
      });
      res.json(dog);
    } catch (e) {
      res.status(500).send("Error de la Base de Datos: ", e);
    }
  } else {
    try {
      let dogFromApi = await getApiInfo();
      let dogById = dogFromApi.find(dog => dog.id == id);
      if (!dogById) {
        return res.status(404).send("Perro no encontrado")
      }
      return res.send(dogById);
    } catch (error) {
      console.error(error);
    }
  }
})

module.exports = router;