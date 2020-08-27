const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const DomParser = require('dom-parser');

// Handle index actions
exports.images = function (req, res) {
    var xhr = new XMLHttpRequest();
    var parser = new DomParser();

    xhr.open('GET', 'https://www.saopaulo.sp.gov.br/planosp/', false);
    xhr.send();

    var dom = parser.parseFromString(xhr.responseText,"text/html");
    var classImgs = dom.getElementsByClassName("img-fases");

    var imgs = []
    
    classImgs.forEach(element => {
        var domClass = parser.parseFromString(element.innerHTML, "text/html");
        imgs.push(domClass.getElementsByTagName("img")[0].attributes[0].value);
    });
    
    res.json({
        images: imgs
    });
};

exports.dataCovidSp = function (req, res) {
    var xhr = new XMLHttpRequest();
    var parser = new DomParser();
    
    xhr.open('GET', 'https://raw.githubusercontent.com/seade-R/dados-covid-sp/master/data/dados_covid_sp.csv', false);
    xhr.send();

    var csv = parser.parseFromString(xhr.responseText,"text/html").rawHTML;

    var lines = csv.split("\n");
    var headers = lines[0].split(",");

    var result = [];
        
    lines.forEach(line => {
        var obj = {};
        var currentline = line.split(",");

        for(var j=0;j<headers.length;j++){
            obj[headers[j]] = currentline[j];
        }

        result.push(obj);
    });
    res.json({
        data: result
    });
};