var p = function(obj){
	console.log(obj);
};


exports.build = function (ast) {
	var js = new Array();	
	
	var symbol = {
		"[": "]",
		"{": "}",
	};
	
	var redirect = {
		"my":	"var",
		"w":	"while", 
		"el":	"else",
		"f":	"for",
	};
	
	var unary = function(token){
		if(token.value == "["){
			if(token.first instanceof Array){
				js.push(token.value);
				for( var j in token.first ){
					expression(token.first[j]);
					if(j != token.first.length -1){
						js.push(",");
					}
					//js.push(token.first[j].value);
				}
				js.push(symbol[token.value]);
			}else{
				expression(token.value);
			}
		}else if(token.value == "{"){
			if(token.first instanceof Array){
				js.push(token.value);
				for( var j in token.first ){
					js.push(token.first[j].key);
					js.push(":");
					//js.push(token.first[j].value);
					expression(token.first[j]);
					if(j != token.first.length -1){
						js.push(",");
					}
				}
				js.push(symbol[token.value]);
			}else{
				expression(token.value);
			}

		}
	}		
	
	var expression = function(token){
		if(token.first == undefined){
			if(token.reserved == true){
				//if(token.scope.def.my != undefined){
					//js.push(symbol["my"]);
				//}
			}
		
			js.push(token.value);
			return;
		}else{
			if(token.arity == "unary"){
				unary(token);
				return;
			}else if( token.arity == "func"){
				func(token);
				return;
			}else{
				if( token.arity == "statement"){
					statement(token);
					return;
				}else{
					expression(token.first);
				}
			}
		}

		js.push(token.value);

		if(token.second == undefined){
			js.push(token.value);
			return;
		}else{
			if( token.arity == "statement"){
				statement(token);
				return;
			}else{
				expression(token.second);
			}
			//expression(token.second);
		}
	}
	
	var statement = function(token){
		js.push(token.value);

		if(token.first == undefined){
			js.push(token.value);
			return;
		}else{
			js.push("(");
			//expression(token.first);
			if(token.first instanceof Array){
				for( var j in token.first ){
					expression(token.first[j]);
					if(j != token.first.length -1){
						js.push(";");
					}
				}
			}else{
				expression(token.first);
			}
			js.push(")");
		}

		js.push("{");
		if(token.second instanceof Array){
			for( var j in token.second ){
				expression(token.second[j]);
				if(j != token.second.length -1){
					js.push(";");
				}
			}
		}else{
			expression(token.second);
		}
		js.push("}");
	}

	var func = function(token){
		//js.push(token.value);

		if(token.first != undefined){
			if(token.first.arity == "literal"){
				js.push("console.log('"+token.first.value+"')");
			}else{
				js.push("console.log("+token.first.value+")");
			}
		}
	}

	if(!(ast instanceof Array)){
		ast = new Array(ast);
	}	
	
	for ( var i in ast ) {
		//var s = ast[i].value;
		//p(ast[i].value);
		
		if( ast[i].arity == "statement"){
			statement(ast[i]);
		}else{
			expression(ast[i]);
			js.push(";");
		}
	}

	for(var i in js){
		if(redirect[js[i]] != undefined){
			js[i] = redirect[js[i]];
		}
	}
	return js;
};
