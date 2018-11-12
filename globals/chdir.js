// Change directory
exports.changeDirectory = (folder) => {
    try {
        process.chdir(`${folder}/`);
    }
    catch (err) {
    }
}