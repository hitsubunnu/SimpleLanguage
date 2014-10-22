#!/usr/bin/env node

var util = require('util');

var lexer    = require('./lexer.js');
var parse    = require('./parse.js');
var compiler = require('./compiler.js');
var fs       = require("fs");

//var arr  = process.argv;

var input  = process.argv[2];
var opt    = process.argv[3];
var output = process.argv[4];

var source = fs.readFileSync(input,'utf-8');
var tokens = lexer.scan(source,'=<>!+-*&|/%^', '=<>&|');
var ast    = parse.run(tokens);
console.log(util.inspect(ast, false, null));

//console.log("------- compiler -----");
var js     = compiler.build(ast);
//console.log(util.inspect(js, false, null));
//console.log(util.inspect(js.join(" "), false, null));

//console.log(util.inspect(js, false, null,true));

//console.log(ast);
//console.log("----- tokens -----");
//console.log(util.inspect(tokens, false, null));
//console.log("----- tokens -----");

if(opt == undefined || opt != "-o"){
	output = input.replace("sl","js");
}

fs.writeFileSync(output, js.join(" "));
