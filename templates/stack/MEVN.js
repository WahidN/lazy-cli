/**
 * Create an MEVN app.
 * @function
 * @param {string} name - name of app.
 */
exports.createMEVN = async (name) => {
    await _npm.install('npm install -g', ['@vue/cli']);
    await _npm.run(`vue create --preset ${__dirname}/src/vuepreset.json  ${name.toLowerCase()}`, `Creating Vue app....`);
}