const fileData = require("./fileData");
const textMetrics = require("./textMetrics");

async function main() {
    var chap = ["chapter1", "chapter2", "chapter3"];
    for(var i=0; i < chap.length; i++){
        try {
            console.log(await fileData.getFileAsJSON(chap[i] + ".result.json"));
        } catch (_) {
            var str = await fileData.getFileAsString(chap[i]+".txt");
            var metrics = await textMetrics.createMetrics(str);
            await fileData.saveJSONToFile(chap[i]+".result.json", metrics);
            await console.log(metrics);
        }
    }
}
main();