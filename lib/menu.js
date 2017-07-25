const fs = require('fs');
const helper = require('./utils');
const gamesDir = './lib/games/';

/**
 * Game menu
 */
module.exports = function (state, update, on) {
    on('down', (pixelIndex) => {
        const { color } = helper.getPixelByIndex(state, pixelIndex);
        try {
            helper.turnOff(state);
            update(state);
            require(`./games/${color}`)(helper.clone(state), update, on);
        } catch (e) {
            // ignore if module not found
        }
    });

    fs.readdir(gamesDir, (err, files) => {
        files.forEach((file, index) => {
            const [ gameName ] = file.split('.');
            helper.setPixelColorByCoordinates(state, gameName, index, index);
        });
        update(state);
    });
};