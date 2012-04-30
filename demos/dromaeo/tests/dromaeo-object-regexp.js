startTest("dromaeo-object-regexp");

// Try to force real results
var str = [], tmp, ret, re, testStrings = [];
var i = 65536;

function randomChar(){
	return String.fromCharCode( (25 * Math.random()) + 97 );
}

for ( var i = 0; i < 16384; i++ )
	str.push( randomChar() );

str = str.join("");
str += str;
str += str;

function generateTestStrings(count){
	var t, nest;
	if ( testStrings.length >= count )
		return testStrings.slice(0, count);
	for ( var i = testStrings.length; i < count; i++ ) {
		// Make all tested strings different
		t = randomChar() + str + randomChar();
		nest = Math.floor(4 * Math.random());
		for ( var j = 0; j < nest; j++ ) {
			t = randomChar() + t + randomChar();
		}
		// Try to minimize benchmark order dependencies by
		// exercising the strings
		for ( var j = 0; j < t.length; j += 100 ) {
			ret = t[j];
			ret = t.substring(j, j + 100);
		}
		testStrings[i] = t;
	}
	return testStrings;
}

	// TESTS: split

	prep(function(){
		// It's impossible to specify empty regexp by simply
		// using two slashes as this will be interpreted as a
		// comment start. See note to ECMA-262 5th 7.8.5.
		re = /(?:)/;
		tmp = generateTestStrings(30);
	});

	test( "Compiled Object Empty Split", function(){
		for ( var i = 0; i < 30; i++ )
			ret = tmp[i].split( re );
	});

	prep(function(){
		re = /a/;
		tmp = generateTestStrings(30);
	});

	test( "Compiled Object Char Split", function(){
		for ( var i = 0; i < 30; i++ )
			ret = tmp[i].split( re );
	});

	prep(function(){
		re = /.*/;
		tmp = generateTestStrings(100);
	});

	test( "Compiled Object Variable Split", function(){
		for ( var i = 0; i < 100; i++ )
			ret = tmp[i].split( re );
	});
    
	// TESTS: Compiled RegExps

	prep(function(){ 
		re = /aaaaaaaaaa/g;
		tmp = generateTestStrings(100);
	});
    
	test( "Compiled Match", function(){
		for ( var i = 0; i < 100; i++ )
			ret = tmp[i].match( re );
	});
	
	prep(function(){
		tmp = generateTestStrings(100);
	});
    
	test( "Compiled Test", function(){
		for ( var i = 0; i < 100; i++ )
			ret = re.test( tmp[i] );
	});
    
	prep(function(){
		tmp = generateTestStrings(100);
	});
    
	test( "Compiled Empty Replace", function(){
		for ( var i = 0; i < 50; i++ )
			ret = tmp[i].replace( re, "" );
	});
	
	prep(function(){
		tmp = generateTestStrings(50);
	});
	
	test( "Compiled 12 Char Replace", function(){
		for ( var i = 0; i < 50; i++ )
			ret = tmp[i].replace( re, "asdfasdfasdf" );
	});
	
	prep(function(){
		re = new RegExp("aaaaaaaaaa", "g");
		tmp = generateTestStrings(100);
	});
    
	test( "Compiled Object Match", function(){
		for ( var i = 0; i < 100; i++ )
			ret = tmp[i].match( re );
	});
	
	prep(function(){
		tmp = generateTestStrings(100);
	});
    
	test( "Compiled Object Test", function(){
		for ( var i = 0; i < 100; i++ )
			ret = re.test( tmp[i] );
	});
    
	prep(function(){
		tmp = generateTestStrings(50);
	});
    
	test( "Compiled Object Empty Replace", function(){
		for ( var i = 0; i < 50; i++ )
			ret = tmp[i].replace( re, "" );
	});
	
	prep(function(){
		tmp = generateTestStrings(50);
	});
	
	test( "Compiled Object 12 Char Replace", function(){
		for ( var i = 0; i < 50; i++ )
			ret = tmp[i].replace( re, "asdfasdfasdf" );
	});
	
	prep(function(){
		tmp = generateTestStrings(50);
	});
	
	test( "Compiled Object 12 Char Replace Function", function(){
		for ( var i = 0; i < 50; i++ )
			ret = tmp[i].replace( re, function(all){
			return "asdfasdfasdf";
		});
	});
	
	// TESTS: Variable Length
	
	prep(function(){
		re = /a.*a/;
		tmp = generateTestStrings(100);
	});
    
	test( "Compiled Variable Match", function(){
		for ( var i = 0; i < 100; i++ )
			ret = tmp[i].match( re );
	});
	
	prep(function(){
		tmp = generateTestStrings(100);
	});
    
	test( "Compiled Variable Test", function(){
		for ( var i = 0; i < 100; i++ )
			ret = re.test( tmp[i] );
	});
    
	prep(function(){
		tmp = generateTestStrings(50);
	});
    
	test( "Compiled Variable Empty Replace", function(){
		for ( var i = 0; i < 50; i++ )
			ret = tmp[i].replace( re, "" );
	});
	
	prep(function(){
		tmp = generateTestStrings(50);
	});
	
	test( "Compiled Variable 12 Char Replace", function(){
		for ( var i = 0; i < 50; i++ )
			ret = tmp[i].replace( re, "asdfasdfasdf" );
	});
	
	prep(function(){
		re = new RegExp("aaaaaaaaaa", "g");
		tmp = generateTestStrings(100);
	});
    
	test( "Compiled Variable Object Match", function(){
		for ( var i = 0; i < 100; i++ )
			ret = tmp[i].match( re );
	});
	
	prep(function(){
		tmp = generateTestStrings(100);
	});
    
	test( "Compiled Variable Object Test", function(){
		for ( var i = 0; i < 100; i++ )
			ret = re.test( tmp[i] );
	});
    
	prep(function(){
		tmp = generateTestStrings(50);
	});
    
	test( "Compiled Variable Object Empty Replace", function(){
		for ( var i = 0; i < 50; i++ )
			ret = tmp[i].replace( re, "" );
	});
	
	prep(function(){
		tmp = generateTestStrings(50);
	});
	
	test( "Compiled Variable Object 12 Char Replace", function(){
		for ( var i = 0; i < 50; i++ )
			ret = tmp[i].replace( re, "asdfasdfasdf" );
	});
	
	prep(function(){
		tmp = generateTestStrings(50);
	});
	
	test( "Compiled Variable Object 12 Char Replace Function", function(){
		for ( var i = 0; i < 50; i++ )
			ret = tmp[i].replace( re, function(all){
			return "asdfasdfasdf";
		});
	});
	
	// TESTS: Capturing
	
	prep(function(){
		re = /aa(b)aa/g;
		tmp = generateTestStrings(100);
	});
	
	test( "Compiled Capture Match", function(){
		for ( var i = 0; i < 100; i++ )
			ret = tmp[i].match( re );
	});
	
	prep(function(){
		tmp = generateTestStrings(50);
	});
	
	test( "Compiled Capture Replace", function(){
		for ( var i = 0; i < 50; i++ )
			ret = tmp[i].replace( re, "asdfasdfasdf" );
	});
	
	prep(function(){
		tmp = generateTestStrings(50);
	});
	
	test( "Compiled Capture Replace with Capture", function(){
		for ( var i = 0; i < 50; i++ )
			ret = tmp[i].replace( re, "asdf\\1asdfasdf" );
	});
	
	prep(function(){
		tmp = generateTestStrings(50);
	});
	
	test( "Compiled Capture Replace with Capture Function", function(){
		for ( var i = 0; i < 50; i++ )
			ret = tmp[i].replace( re, function(all,capture){
			return "asdf" + capture + "asdfasdf";
		});
	});
	
	prep(function(){
		tmp = generateTestStrings(50);
	});
	
	test( "Compiled Capture Replace with Upperase Capture Function", function(){
		for ( var i = 0; i < 50; i++ )
			ret = tmp[i].replace( re, function(all,capture){
			return capture.toUpperCase();
		});
	});
	
	// TESTS: Uncompiled RegExps
	
	prep(function(){
		tmp = generateTestStrings(100);
	});
    
	test( "Uncompiled Match", function(){
		for ( var i = 0; i < 100; i++ )
			ret = tmp[i].match( /aaaaaaaaaa/g );
	});
	
	prep(function(){
		tmp = generateTestStrings(100);
	});
    
	test( "Uncompiled Test", function(){
		for ( var i = 0; i < 100; i++ )
			ret = (/aaaaaaaaaa/g).test( tmp[i] );
	});
    
	prep(function(){
		tmp = generateTestStrings(50);
	});
    
	test( "Uncompiled Empty Replace", function(){
		for ( var i = 0; i < 50; i++ )
			ret = tmp[i].replace( /aaaaaaaaaa/g, "" );
	});
	
	prep(function(){
		tmp = generateTestStrings(50);
	});
	
	test( "Uncompiled 12 Char Replace", function(){
		for ( var i = 0; i < 50; i++ )
			ret = tmp[i].replace( /aaaaaaaaaa/g, "asdfasdfasdf" );
	});
	
	prep(function(){
		tmp = generateTestStrings(100);
	});
    
	test( "Uncompiled Object Match", function(){
		for ( var i = 0; i < 100; i++ )
			ret = tmp[i].match( new RegExp("aaaaaaaaaa", "g") );
	});
	
	prep(function(){
		tmp = generateTestStrings(100);
	});
    
	test( "Uncompiled Object Test", function(){
		for ( var i = 0; i < 100; i++ )
			ret = (new RegExp("aaaaaaaaaa", "g")).test( tmp[i] );
	});
    
	prep(function(){
		tmp = generateTestStrings(50);
	});
    
	test( "Uncompiled Object Empty Replace", function(){
		for ( var i = 0; i < 50; i++ )
			ret = tmp[i].replace( new RegExp("aaaaaaaaaa", "g"), "" );
	});
	
	prep(function(){
		tmp = generateTestStrings(50);
	});
	
	test( "Uncompiled Object 12 Char Replace", function(){
		for ( var i = 0; i < 50; i++ )
			ret = tmp[i].replace( new RegExp("aaaaaaaaaa", "g"), "asdfasdfasdf" );
	});

endTest();
