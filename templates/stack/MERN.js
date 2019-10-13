/**
 * Create an MERN app.
 * @function
 * @param {string} name - name of app.
 */
exports.createMERN = async (name) => {
    await _npm.install('npm install -g', ['create-react-app']);
    await _npm.run(`npx create-react-app ${name.toLowerCase()}`, `Creating React app....`);
}