SimpleLanguage
==============

SimpleLanguage is a language which compiles to JavaScript.

Installation
=========

1. install nodejs

2. install simple language

	$ git clone https://github.com/hitsubunnu/SimpleLanguage.git 
	
	$ cd SimpleLanguage
	

Compile
=========
	$ node builder.js test/w.sl

Execute
=========
	$ node test/w.js

Example
=========

	$ cat test/w.sl 
	my i = 0;
	my j = 0;

	w(i<2){
		i = i + 1;
		if(i > 0){
			p "hello world!";
		}

		f(j=0;j<4;j = j +1;){
			p j;
		}
	}


	$ node builder.js test/w.sl 
	$ node test/w.js 
	hello world!
	0
	1
	2
	3
	hello world!
	0
	1
	2
	3

Abstract syntax tree
=========
	{ value: '=', arity: 'binary', 
	  first: { value: 'aa', arity: 'name', reserved: false, nud: [Function], led: null, std: null, lbp: 0, scope: { def: { my: { value: 'my', arity: 'name', reserved: true }, aa: [Circular] }, parent: undefined } },
	  second: 
	   { value: '[', arity: 'unary',
		 first: 
		  [ { value: 1, arity: 'literal' },
			{ value: 3, arity: 'literal' },
			{ value: 3, arity: 'literal' } ] } }
