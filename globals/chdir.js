/**
 * Change directory.
 * @function
 * @param {string} folder - name of folder.
 */
exports.changeDirectory = (folder) => {
    try {
        process.chdir(`${folder}/`);
    } catch (err) {
        console.error('chdir: ' + err);
    }
}