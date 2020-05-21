const bluebird = require("bluebird");
const Promise = bluebird.Promise;
const fs = bluebird.promisifyAll(require("fs"));

async function getFileAsString(path) {
    if(typeof path !== 'string' || !path)
        throw "Path must be a string";
    const file = await fs.readFileAsync(path, "utf8");
    return file;
}

async function getFileAsJSON(path) {
    if(typeof path !== 'string' || !path)
        throw "Path must be a string";
    const file = await fs.readFileAsync(path, "utf8");
    const parse = await JSON.parse(file);
    return parse;
}

async function saveStringToFile(path, text) {
    if(typeof path !== 'string' || !path)
        throw "Path must be a string";
    if(typeof text !== 'string')
        throw "Text must be a string";
    await fs.writeFileAsync(path, text);
	return true;
}

async function saveJSONToFile(path, obj) {
    if(typeof path !== 'string' || !path)
        throw "Path must be a string";
    if(typeof obj !== 'object' || !obj)
        throw "Obj must be an object";
    const str = JSON.stringify(obj);
    await fs.writeFileAsync(path, str);
    return true;
}

module.exports = {
	getFileAsString,
	getFileAsJSON,
	saveStringToFile,
	saveJSONToFile
};