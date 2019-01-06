const fs = require("fs");

module.exports = app => {
    (function readRoute(dir = __dirname) {
        fs.readdirSync(dir).map(file => {
            if (fs.lstatSync(`${dir}/${file}`).isDirectory()) {
                readRoute(`${dir}/${file}`);
            } else if (file.includes(".route.js")) {
                require(`${dir}/${file}`)(app);
            }
        });
    })();
};

