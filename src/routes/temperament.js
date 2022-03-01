const { Temperament } = require('../db');
const { Router } = require('express');

const router = Router();

router.get("/", async (req, res) => {
    try {
        const temperamentos = await Temperament.findAll({
            order: [["name", "asc"]]
        });
        res.json(temperamentos);
    } catch (error) {
        res.sendStatus(500);
    }
    })

    module.exports = router;