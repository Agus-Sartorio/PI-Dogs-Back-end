const axios = require('axios');
const { Dog, Temperament } = require("../src/db");

const getApiInfo = async () => {
    try {
        let apiUrl = await axios.get('https://api.thedogapi.com/v1/breeds');
        let totalInfo = apiUrl.data;
        let apiInfo = totalInfo.map(el => {
            let realWeight = el.weight.metric.split(' - ');
            return {
                id: el.id,
                name: el.name,
                temperament: el.temperament,
                life_span: el.life_span,
                weight: realWeight[0] === 'NaN' ? realWeight[1] : el.weight.metric,
                height: el.height.metric,
                image: el.image.url
            }
        })
        return apiInfo;
    } catch (error) {
        console.error(error)
    }
};

const getDbInfo = async () => {
    return await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ["name"],
        }
    })
};

const getAllDogs = async () => {
    let infoFromApi = await getApiInfo();
    let infoFromDb = await getDbInfo();
    const infoTotal = infoFromDb.concat(infoFromApi);
    return infoTotal;
}

module.exports = { getAllDogs, getApiInfo };