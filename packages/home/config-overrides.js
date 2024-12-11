import ModuleFederationPlugin from "webpack/lib/container/ModuleFederationPlugin";

import { dependencies as deps } from "./package.json";
export default function override(config) {
    config.output.publicPath = "auto";

    if (!config.plugins) {
        config.plugins = [];
    }

    config.plugins.unshift(
        new ModuleFederationPlugin({
            name: "home",
            filename: "remoteEntry.js",
            remotes: {
                home: "home@http://localhost:3000/remoteEntry.js",
                search: "search@http://localhost:3001/remoteEntry.js",
            },
            exposes: {},
            shared: {
                ...deps,
                react: {
                    singleton: true,
                    requiredVersion: deps.react,
                },
                "react-dom": {
                    singleton: true,
                    requiredVersion: deps["react-dom"],
                }
            }
        })
    )
    return config;
}