const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const fs = require('fs'); 

const exposeDirectory = (dirName) => 
    fs.readdirSync(dirName).reduce((exposes, file) => {
        exposes[`./${file.replace(/[.].*$/, "")}`] = `${dirName}/${file}`;
        return exposes;
    }, {});

module.exports = {
    webpack: {
        configure: (config) => {
            config.output.publicPath = "auto";

            if (!config.plugins) {
                config.plugins = [];
            }

            config.plugins.unshift(
                new ModuleFederationPlugin({
                    exposes: exposeDirectory("./src/federated")
                })
            )

            return config;
        }
    }
}
