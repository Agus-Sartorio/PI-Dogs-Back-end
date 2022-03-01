const axios = require('axios');
const { Temperament } = require("../src/db");

const getAllTemperaments = async () => {
    try {
        const apiUrl = await axios.get('https://api.thedogapi.com/v1/breeds');
        let allTemperaments = [];
    
        for(i = 0; i < apiUrl.data.length; i++) {
            let totalInfo = apiUrl.data[i].temperament;
            if(totalInfo){
                allTemperaments = allTemperaments.concat(totalInfo.split(', '));
            }
        }
        let uniqueTemperaments = [...new Set(allTemperaments)];
        uniqueTemperaments.map(uniqueTemperament => {
            Temperament.findOrCreate({
                where: {
                    name: uniqueTemperament
                }
            })
        })
    } catch (error) {
        console.error(error);
    }
};


module.exports = getAllTemperaments;