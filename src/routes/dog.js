const { Dog, Temperament } = require('../db')
const { Router } = require('express');

const router = Router();

router.post('/', async (req, res) => {
    const { name, temperament, life_span, weight, height } = req.body;
    try {
        let newDog = await Dog.create({
            name,
            life_span,
            weight,
            height,
            image: 'https://wl-genial.cf.tsp.li/resize/728x/jpg/0a1/f6c/89998752ebb1783bf2070bf6dc.jpg'
        })
        await newDog.setTemperaments(temperament.map(e => e.id));
        return res.json(newDog);
    } catch (error) {
        /* res.status(400).send(error) */
        console.error(error);
    }
});

module.exports = router;