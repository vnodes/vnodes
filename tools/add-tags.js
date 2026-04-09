const { readdirSync } = require("node:fs");
const { join } = require("node:path");
const { updateJsonFile } = require("@vnodes/fs")



async function addTags() {

    const libsRoot = join(__dirname, '..', 'libs')
    const pluginRoot = join(__dirname, '..', 'plugins')
    const libPacks = readdirSync(libsRoot).map(e => {
        return join(libsRoot, e, 'package.json')
    })
    const pluginPacks = readdirSync(pluginRoot).map(e => {
        return join(pluginRoot, e, 'package.json')
    })



    for (const p of [...libPacks, ...pluginPacks]) {

        console.log(p);
        // await updateJsonFile()
    }

}



addTags()
