const GitSheets = require('gitsheets');


/**
 * Gateway to a collection of organizations
 * @class
 */
module.exports = class Organizations extends Map {

    async buildTree (repo) {
        const tree = repo.createTree();

        await Promise.all(
            [...this].map(([name, data]) => {
                const record = this.buildRecord(data);
                const toml = GitSheets.stringifyRecord(record);
                return tree.writeChild(`${name}.toml`, toml);
            })
        );

        return tree;
    }

    buildRecord (data) {
        return data;
    }
};
