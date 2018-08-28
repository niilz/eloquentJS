// most minimal require

require.cache = Object.create(null);

function require(name) {
    if (!(name in require.cache)) {
        let code = readFile(name); // readFile doesn't actually exist
        let module = {exports: {}};
        require.cache[name] = module;
        let wrapper = Function("require, exports, module", code);
        wrapper(require, module.exports, module);
    }
    return require.cache[name].exports;
}