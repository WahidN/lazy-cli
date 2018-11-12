// Change directory
exports.changeDirectory = (folder) => {
    try {
        process.chdir(`${folder}/`);
    }
    catch (err) {
        console.error('chdir: ' + err);
    }
}