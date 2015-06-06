/*********************************************\
*                                             *
*             Start of Menu Code              *
*                                             *
\*********************************************/
//Toggle functions for the View Menu
function toggle_titles()
{
	var checkbox=document.getElementById('radio1');
	//toggle the checkbox
	checkbox.checked=!checkbox.checked;

	//set the values
	if(checkbox.checked==true)
	{
		calc.memory.title="Shows if there is something stored in memory";
		calc.backbtn.title="Delete a value from right to left";
		calc.delbtn.title="Clears the Equation";
		calc.ac.title="Clears the Equation and the memory";
		calc.mClear.title="Clears the memory";
		calc.btn7.title="Inserts the character 7";
		calc.btn8.title="Inserts the character 8";
		calc.btn9.title="Inserts the character 9";
		calc.divide.title="Inserts the '/' character";
		calc.b6.title="Takes the exponential of the Equation\n[pow(e,x)]";
		calc.b7.title="Takes the natural log of the Equation";
		calc.mRecall.title="Recalls the memory into the Equation\n(inserts)";
		calc.btn4.title="Inserts the character 4";
		calc.btn5.title="Inserts the character 5";
		calc.btn6.title="Inserts the character 6";
		calc.multiply.title="Inserts the '*' character";
		calc.c6.title="Takes the square root of the Equation";
		calc.c7.title="Power of X to Y\n[pow(X,Y)]";
		calc.mStore.title="Stores the Equation into memory";
		calc.btn1.title="Inserts the character 1";
		calc.btn2.title="Inserts the character 2";
		calc.btn3.title="Inserts the character 3";
		calc.subtract.title="Inserts the '+' character";
		calc.d6.title="Squares the Equation\n[pow(X,2)]";
		calc.d7.title="Cubes the Equation\n[pow(X,3)]";
		calc.mPlus.title="Adds the current Equation to the one stored in memory";
		calc.btn0.title="Inserts the character 0";
		calc.e3.title="calcs the negativity sign of a number";
		calc.dot.title="Inserts the '.' character";
		calc.add.title="Inserts the '+' character";
		calc.enter.title="Computes the current Equation";
		calc.e7.title="Flips the current Equation";
		calc.pi.title="Inserts 'pi'";
		calc.parl.title="Inserts the '(' character";
		calc.parr.title="Inserts the ')' character";
		calc.f4.title="Computes cosine of the current Equation";
		calc.f5.title="Computes sine of the current Equation";
		calc.f6.title="Computes tangent of the current Equation";
		calc.ekey.title="Inserts the 'e' character\n[1e3=1x10^(3)=1000] (not exp)";
	}
	else if(checkbox.checked==false)
	{
		for(i=1;i<calc.elements.length;i++)
			calc.elements[i].title="";
	}
}

function toggle_display()
{
	var checkbox=document.getElementById('radio2');
	//toggle the checkbox
	checkbox.checked=!checkbox.checked;

	//enable/disable the display
	if(checkbox.checked==false)
		display.readOnly=false;
	else
		display.readOnly=true;
}

function setFloat()
{
	var floatObj=document.getElementById('float');
	var thevalue=prompt('Set the number of decimal places for rounding',floatObj.value); 
	if(thevalue)
	{
		if(!convert.test(thevalue,/[0-9]/))
			alert('Letters and symbols not allowed.\nOnly numbers');
		else if(thevalue>17)
			alert('Float can\'t go above 17 digits.');
		else if(eval(thevalue)==0)
			alert('Float can\'t be set to 0');
		else
			floatObj.value=thevalue;
	}
}


/*********************************************\
*                                             *
*                Conv Menu Code               *
*                                             *
\*********************************************/

/* convert Object map:
 * Properties:
 * 		convert.ct[i] returns string
 * 		convert.ce returns string
 *
 * Objects:
 * 		convert.cnvStr
 * 		cnvStr Properties:
 * 			cnvStr.key returns string
 * 			cnvStr.key2 returns string
 * 		cnvStr Methods:
 * 			cnvStr.indexOf(char a) returns int
 *
 * Methods:
 * 		convert.d2b(string a, int b) returns string
 * 		convert.b2d(string a, int b) returns string
 * 		convert.binDec(string a) returns string
 * 		convert.binHex(string a) returns string
 * 		convert.binOct(string a) returns string
 * 		convert.decBin(string a) returns string
 * 		convert.decHex(string a) returns string
 * 		convert.decOct(string a) returns string
 * 		convert.octBin(string a) returns string
 * 		convert.octDec(string a) returns string
 * 		convert.octHex(string a) returns string
 * 		convert.hexBin(string a) returns string
 * 		convert.hexDec(string a) returns string
 * 		convert.hexOct(string a) returns string
 * 		convert.isBin(string a) returns boolean
 * 		convert.isDec(string a) returns boolean
 * 		convert.isHex(string a) returns boolean
 * 		convert.isOct(string a) returns boolean
 * 		convert.test(string a, regular expression b) returns boolean
 */

/* More information:
 * ct[i] is an array of error strings (stands for convert type)
 * ce is the error message used to slim coding (stands for convert error)
 * ct[i] and ce are used in error checking and are not meant to be 
 * accessed by the user
 * 
 * binDec() converts binary to decimal using b2d() (e.g. base to decimal)
 * decBin() converts decimal to binary using d2b() (e.g. decimal to base)
 * All the conversions use that method of conversion.  Extremely simple.
 *
 * cnvStr.indexOf() grabs the index of a number or hex character using
 * cnvStr.key and cnvStr.key2.  The reason for using the two strings to
 * grab one index is so the hex can be case insensitive.
 *
 * cnvStr, d2b, and b2d are internal methods that don't need to be
 * accessed by the user.  Their sole functions are to assist binDec,
 * binHex, binOct, decBin, decHex, decOct, octBin, octDec, octHex,
 * hexBin, hexDec, and hexOct which are methods that the user uses to
 * convert between the different bases.
 * hexBin converts hexidecimal to binary
 * hexDec converts hexidecimal to decimal
 * binHex converts binary to hexidecimal and so on...
 * bin is binary (base2)
 * dec is decimal (base10)
 * hex is hexidecimal (base16)
 * oct is octal (base8)
 * 
 * isBase (e.g. isBin, isDec, etc..) checks to see if the number contains
 * only chars from that base.  If any chars are not from that base then
 * it will return false.  So convert.isBin("1012") will return false but
 * convert.isBin("1011") returns true.  You get the picture.
 * isBase functions use convert.test() to determine if the strings are
 * part of that base.  So isBase methods depend on the test method.  The
 * test() method does not need to be accessed by the user.
 * 
 * 
 * Disclaimer: This software is provided as is without any expressed or
 * implied warranty.  USE AT YOUR OWN RISK.  This software is licensed
 * under Open Source/GPL.
 * GPL URL: http://www.gnu.org/copyleft/gpl.html
 * 
 * This particular method of converting between bases is:
 * Copyright (c) 2007 Sam Gleske
 * 
 * Under GPL you can still modify and redistribute this source code.
 */
var convert={
	ct: [
			"binaryErr: ",
			"decimalErr: ",
			"hexadecimalErr: ",
			"octalErr: "
		],
	ce: "Wrong type, can't convert",
	cnvStr: {
		key: "0123456789ABCDEF",
		indexOf: function(a){
				return (this.key.indexOf(a.toUpperCase())!=-1)?this.key.indexOf(a.toUpperCase()):false;
			}
		},
	d2b: function(n,b){
			var fact=1,done="";
			while(fact*b<=n)
				fact*=b;
			while(fact>=1)
			{
				done+=this.cnvStr.key.charAt(Math.floor(n/fact));
				n-=Math.floor(n/fact)*fact;
				fact/=b;
			}
			return done;
		},
	b2d: function(n,b){
			var fact=1,done=0,i;
			for(i=n.length-1;i>=0;i--)
			{
				done+=this.cnvStr.indexOf(n.charAt(i))*fact;
				fact*=b;
			}
			return done;
		},
	binDec: function(n){
			if(this.isBin(n))
				return this.b2d(n,2);
			else
			{
				alert(this.ct[0]+this.ce);
				return n;
			}
		},
	binHex: function(n){
			if(this.isBin(n))
				return this.d2b(this.b2d(n,2),16);
			else
			{
				alert(this.ct[0]+this.ce);
				return n;
			}
		},
	binOct: function(n){
			if(this.isBin(n))
				return this.d2b(this.b2d(n,2),8);
			else
			{
				alert(this.ct[0]+this.ce);
				return n;
			}
		},
	decBin: function(n){
			if(this.isDec(n))
				return this.d2b(n,2);
			else
			{
				alert(this.ct[1]+this.ce);
				return n;
			}
		},
	decHex: function(n){
			if(this.isDec(n))
				return this.d2b(n,16);
			else
			{
				alert(this.ct[1]+this.ce);
				return n;
			}
		},
	decOct: function(n){
			if(this.isDec(n))
				return this.d2b(n,8);
			else
			{
				alert(this.ct[1]+this.ce);
				return n;
			}
		},
	hexBin: function(n){
			if(this.isHex(n))
				return this.d2b(this.b2d(n,16),2);
			else
			{
				alert(this.ct[2]+this.ce);
				return n;
			}
		},
	hexDec: function(n){
			if(this.isHex(n))
				return this.b2d(n,16);
			else
			{
				alert(this.ct[2]+this.ce);
				return n;
			}
		},
	hexOct: function(n){
			if(this.isHex(n))
				return this.d2b(this.b2d(n,16),8);
			else
			{
				alert(this.ct[2]+this.ce);
				return n;
			}
		},
	octBin: function(n){
			if(this.isOct(n))
				return this.d2b(this.b2d(n,8),2);
			else
			{
				alert(this.ct[3]+this.ce);
				return n;
			}
		},
	octDec: function(n){
			if(this.isOct(n))
				return this.b2d(n,8);
			else
			{
				alert(this.ct[3]+this.ce);
				return n;
			}
		},
	octHex: function(n){
			if(this.isOct(n))
				return this.d2b(this.b2d(n,8),16);
			else
			{
				alert(this.ct[3]+this.ce);
				return n;
			}
		},
	isBin: function(n){
			return this.test(n,/[01]/);
		},
	isDec: function(n){
			return this.test(n,/[0-9]/);
		},
	isHex: function(n){
			return this.test(n,/[0-9A-F]/i);
		},
	isOct: function(n){
			return this.test(n,/[0-8]/);
		},
	test: function(n,re){
			var i=0;
			var result=true;
			while(i<n.length)
			{
				if(!re.test(n.charAt(i)))
					result=false;
				i++;
			}
			return result;
		}
	}
function convBase(base1,base2)
{
	display.value = eval("convert."+base1+base2+"(\""+display.value+"\")");
}
function checkBase()
{
	//Change the conversion list based on the display
	//if there are chars that can't be converted such as there is a 2 then binary to whatever will be hidden
	var isBin,isDec,isHex,isOct;
	isBin=convert.isBin(display.value);
	isDec=convert.isDec(display.value);
	isHex=convert.isHex(display.value);
	isOct=convert.isOct(display.value);
	for(var i=1;i<4;i++)
	{
		document.getElementById("bin"+i).style.display=(isBin)?"":"none";
		document.getElementById("dec"+i).style.display=(isDec)?"":"none";
		document.getElementById("hex"+i).style.display=(isHex)?"":"none";
		document.getElementById("oct"+i).style.display=(isOct)?"":"none";
	}
	document.getElementById("nooption").style.display=(isBin||isDec||isHex||isOct)?"none":"";
}

/*********************************************\
*                                             *
*                IE Only Code                 *
*                                             *
\*********************************************/
//copy and past functions
function docmd(cmdID)
{
	//cmdID=1 then copy equation text, else paste into display by adding a char from right to left
	if(cmdID)
	{
		field=document.calc.display.createTextRange();
		field.execCommand("Copy");
	}
	else
	{
		field=document.getElementById("paste").createTextRange();
		field.execCommand("Paste");
		addChar(document.getElementById("paste").value)
	}
}