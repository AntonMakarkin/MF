import ModuleFederationPlugin from "webpack/lib/container/ModuleFederationPlugin";

import { dependencies as deps } from "./package.json";
export default function override(config) {
    config.output.publicPath = "auto";

    if (!config.plugins) {
        config.plugins = [];
    }

    config.plugins.unshift(
        new ModuleFederationPlugin({
            name: "home"
        })
    )
    return config;
}