#!/usr/bin/env node

var fs = require('fs');
var cps = require('cps');

var args = process.argv.splice(2);

var src = args[0];
var dst = args[1];

var cb = function(err, res) {
    if (err) {
        console.log('Error:');
        if (err.stack) {
            console.log(err.stack);
        } else {
            console.log(err);
        }
    } else {
        console.log('Done.');
    }
};

cps.seq([
    function(_, cb) {
        fs.readFile(src, cb);
    },
    function(content, cb) {
        var o = JSON.parse(content);
        var s = JSON.stringify(o, null, 4);
        fs.writeFile(dst, s, cb);
    }
], cb);

