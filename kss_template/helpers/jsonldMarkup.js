// @method
// @name jsonldMarkup

// @author dan.west@chrometoaster.com

// @summary Used to return a markup representation of the json-ld file associated with a component

// @param {String} jsonLd - the filename of the json-ld file
// @param {Object} otions - contains all the handlebars attributes associated with the section

// @returns {String} markup listing out the data

var fs = require('fs');
var recursiveReadSync = require('recursive-readdir-sync');
var json2html = require('node-json2html');

module.exports.register = function(handlebars, config) {

    handlebars.registerHelper('jsonldMarkup', function(jsonLd, options) {

        var rootDirectory = options.data.root.options.source,
            fileName = jsonLd,
            html = '',
            data;

        // loop over all files
        var files = recursiveReadSync(rootDirectory[0]);
        for (var i = files.length - 1; i >= 0; i--) {
            if (files[i].endsWith(fileName)) {
                data = fs.readFileSync(files[i]).toString();
            }
        }

        var jsonObject = JSON.stringify(eval("(" + data + ")"));

        var json = JSON.parse(jsonObject);

        // console.log(json)

        // Build the html
        function tree(json) {
            if (typeof(json) == 'object') {
                html = html + '<ul>';
                for (var i in json) {
                    if (typeof json[i] === 'string') {
                        html = html + '<li><strong>' + i + '</strong>: ' + json[i] + '</li>';
                    } else {
                        html = html + '<li>' + i + '</li>';
                    }
                    tree(json[i]);
                }
                html = html + '</ul>';
            } else {
                // document.write(' => ' + data);
            }
        }

        tree(json);
        // console.log(html)

        return html;
    });
};