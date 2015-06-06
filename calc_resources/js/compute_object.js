/**
 * @author Sam Gleske (sag47@drexel.edu|sam.mxracer@gmail.com)
 * @copyright 2005-2010 Sam Gleske
 * @link http://www.gleske.net/
 * @link http://www.sourceforge.net/projects/webtechtools/
 * @created 05/06/2010
 * @version 0.1
 * @description 
 *     compute object, where all of the human readable math computational functions are done inside of a single object.
 *     This is compacted into a single object so it is easy to rename when incorporating this library into an application.
 *     Simply feed this object a human readable computational string and it will return a result of the calculations.
 *     With extensive equation error checking this JavaScript math library is one of the best for human readable web 
 *     calculators.
 *     
 *     Examples of human readable computations this library can handle that are unique to this library:
 *         compute.result("2^3") returns 8
 *         compute.result("16^(1/2)") returns 4
 *     
 *     If you are using the value of an input element then it is best to convert the value to a string before computing the
 *     result.  For example
 *         compute.result(document.getElementById("myElementId").value.toString())
 * 
 * @documentation
 * FUNCTION documentation format...
 *     compute.function(argument); argument types separated by commas; return type
 *         Description:
 *             description of the functions uses.
 *         Example usage:
 *             compute.function(someargument) returns somevalue
 * 
 *     compute.result(str); str typeof="string"; returns typeof="number"
 *         Description:
 *             This is the main computational parser.  Access the main functionality of the math library through this function.
 *             List of Math Functions and their inverses available:
 *                 tan(x) and atan(x)
 *                 sin(x) and asin(x)
 *                 cos(x) and acos(x)
 *                 pi
 *                 e^y and ln(x)
 *                 10^y and log(x)
 *                 x^y and ln(x^y)/ln(x)
 *                 +, -, *, / basic arithmatic
 *                 ^ exponential function
 *                 % modulo
 *                 >> shift right
 *                 << shift left
 *                 
 *         Example usage:
 *             compute.result("2^3") returns 8
 *             compute.result("16^(1/2)") returns 4
 *             compute.result("atan(tan(5))") returns 5
 *             compute.result("ln(3^2)/ln(3)") returns 2
 *             compute.result("e^1") returns 2.718281828459045
 *             compute.result("2e3") returns 2000
 *             compute.result("45*2^2") returns 180
 *             compute.result("45<<2") returns 180
 *             
 *     compute.changeSign(str); str typeof="string"; returns typeof="string" or returns false
 *         Description:
 *             Takes a string equation and returns that same equation as a string wrapped with a negative value.
 *         Example usage:
 *             compute.changeSign("-(5+5)+3^2") returns "-(-(5+5)+3^2)"
 *             compute.changeSign("5") returns "-5"
 *             compute.changeSign("-(5+5)") returns "5+5"
 * 
 *     compute.roundFloat(num,float); num typeof="number",float typeof="number"; returns typeof="number"
 *         Description:
 *             Round the float of a number both forwards and backwards.
 *         Example usage:
 *             compute.roundFloat(125.125,1) returns 125.1
 *             compute.roundFloat(125.125,-1) returns 130
 *             compute.roundFloat(125.125,0) returns 125
 * 
 *     compute.test.regex(str,re); str typeof="string",re typeof="object"; returns typeof="boolean"
 *         Description:
 *             Test the string against a general regular expression, character by character.
 *         Example usage:
 *             compute.test.regex("asDf123",/[0-9a-z]/i) returns true
 *             compute.test.regex("asDf123",/[0-9a-z]/) returns false
 *     
 *     compute.d2b(num,base); num typeof="number",base typeof="number";returns typeof="string" or returns false
 *         Description:
 *             Converts a Base10 Decimal to any base number up to Base36.  If conversion fails then it returns false.
 *             The setting convert.upperCaseBase determines whether the returned number will be in upper case or lower
 *             case numbers.
 *         Example usage:
 *             compute.d2b(45,16) returns 2D
 *             compute.d2b(45,8) returns 55
 *             
 *     compute.b2d(num,base); num typeof="string",base typeof="number";returns typeof="string" or returns false
 *         Description:
 *             Converts any base number up to Base36 to a Base10 Decimal.  If conversion fails then it returns false.
 *         Example usage:
 *             compute.b2d("2D",16) returns 45
 *             compute.b2d("55",8) returns 45
 * 
 * SETTINGS documentation format
 *     compute.setting; typeof; default value
 *         Description:
 *             description of what the setting changes
 *         Example usage:
 *             compute.setting=true
 *             compute.setting returns true
 *     
 *     compute.caseInsensitive; typeof="boolean"; true
 *         Description:
 *             If you don't want the equations to be case sensitive then set this option to true.  Otherwise set to
 *             false.
 *     
 *     compute.debug; typeof="boolean"; false
 *         Description:
 *             Alerts exceptions for library development purposes.
 *     
 *     compute.degreesMode; typeof="boolean"; true
 *         Description:
 *             When working with trig functions this determines whether they're handled as degrees or radians.  When 
 *             set to true then the trig functions handle the trig quantities as degrees.  False will handle the trig
 *             quantities as radians.
 *     
 *     compute.showErrors; typeof="boolean"; true
 *         Description:
 *             Display alert box errors to assist the user with troubleshooting their equation for computation.  When
 *             set to true then it displays the alert boxes.  Set to false to quiet the alerts
 *     
 *     compute.upperCaseBase; typeof="boolean"; true
 *         Description:
 *             When doing a base conversion equation return the letters in all caps when set to true.  For example 
 *             when set to true compute.d2b(45) returns 2D instead of 2d.
 */

/*
 * For further development of this library it is recommended reading the developers notes at the end of this file
 */

 var compute={
 	/*
 	 * This is a list of settings for the compute object
 	 * These are easily configurable for simple integration into other applications.
 	 */
	caseInsensitive: true,
	debug: false,
	degreesMode: true,
	showErrors: true,
	upperCaseBase: true,
	
 	/*
 	 * This is a list of global object values such as arrays, constants, etc.
 	 */
	general_error:[//array
		"There are errors in the equation.\n\nCheck for:\nMissing symbols next to parenthesis. 3(10) will not work but 3*(10) will.\nHanging equation symbols like (3*(10)+) where the + is the error.\nOpen parenthesis. (2*(4+3) will not work but (2*(4+3)) will.\nMisspelled or undefined trig functions.\nComplex Numbers, for example (-16)^(1/2), can't be computed by this library.",//0
		"Invalid characters in display, incorrectly formatted operators such as shift ops, or misspelled trig functions.",//1
		"Can't divide by zero.",//2
		"Can't handle complex numbers such as (-1)^(1/2).",//3
		"Incorrectly formatted x^y function.",//4
		"Result is Infinity"//5
	],//end of compute.general_error[]
	
	/*
	 * The result function is used the most in this library.  It is the root function which accesses all other functions to compute the result of the equation.
	 */
	result:function(str){
		if(typeof str !== "string")
		{//!== operator compares both value and type.  Ex: (8 === "8")?true:false returns false because one type is a number and the other is a string
			str=str.toString();
		}
		if(this.caseInsensitive)
		{
			str=str.toLowerCase();
		}
		var result;
		try
		{
			if(this.test.checkall(str))
			{
				if(str=='0')
				{
					return 0;
				}
				else if(!this.test.check_denominator(str))
				{
					return false;
				}
				else if(this.formatEquation(str))
				{
					result=this.formatEquation(str);
					if(eval(result)=="Infinity")
					{
						if(this.showErrors)
						{
							alert(this.general_error[5]);
						}
						return false;
					}
					else
					{
						return eval(result);
					}
						
				}
				else
				{
					if(this.showErrors)
					{
						alert(this.general_error[0]);
					}
					return false;
				}
				return true;
			}
			else
			{
				if(this.showErrors)
				{
					alert(this.general_error[1]);
				}
			}
		}
		catch(e)
		{
			if(this.debug)
			{
				alert(
					"Exception in compute.result function\n"+e
					+"\n\nstr="+str
					+"\n\nresult="+result
				);
			}
			if(this.showErrors)
			{
				alert(this.general_error[0]);
			}
		}
		return false;
	},//end of compute.result()
	
 	/*
 	 * This test object is for testing the format of the equation to ensure there are no syntax errors
 	 */
 	test: {
		checkall:function(str){
			return (
				this.check_greaterthan(str)
				&&this.check_lessthan(str)
				&&this.checktrig(str)
				&&this.regex(str, /[0-9lpesincotag\(\)\+\-\.\*\/\^<>%]/i)
			);
		},
		regex:function(n,re){//test the string against a general regular expression, character by character
			if(typeof n!="string")
			{
				n=n.toString()
			}
			var i=0;
			var result=true;
			while(i<n.length)
			{
				if(!re.test(n.charAt(i)))
				{
					result=false;
				}
				i++;
			}
			return result;
		},
		checktrig:function(str){//check all trig functions to ensure they are spelled correctly
			return (
				this.sin(str)
				&&this.cos(str)
				&&this.tan(str)
				&&this.pi(str)
				&&this.check_a(str)
				&&this.check_g(str)
				&&this.check_i(str)
				&&this.check_n(str)
				&&this.check_o(str)
				&&this.logs(str)
				&&this.e(str)
			);
		},
		check_greaterthan:function(str){//check for shift right bitwise operators
			var c=str.indexOf('>');
			if(c==-1)
				return true;
			else if(str.charAt(c+1)!='>')
				return false;
			return this.check_greaterthan(str.substring(c+2));
		},
		check_lessthan:function(str){//check for shift left bitwise operators
			var c=str.indexOf('<');
			if(c==-1)
				return true;
			else if(str.charAt(c+1)!='<')
				return false;
			return this.check_lessthan(str.substring(c+2));
		},
		check_denominator:function(str){//check for instances of x/0 and flag them
			var denominator;
			if(str.indexOf('/')==-1)
			{
				return true
			}
			else if(this.regex(str.charAt(str.indexOf('/')+1),/[\+\-]/i))//accomodate for x^-y to Math.pow(x,-y) negative exponents
			{
				i=str.indexOf('/')+2;
			}
			else
			{
				i=str.indexOf('/')+1;
			}
			exit=false;
			j=0;
			do
			{
				switch(str.charAt(i))
				{
					case '(':
						j++;
						break;
					case ')':
						j--;
						break;
				}
				if(this.regex(str.charAt(i),/[\+\-\*\/\)><%]/i)&&j<=0)
				{
					denominator=(str.charAt(str.indexOf('/')+1)=='(')?str.substring(str.indexOf('/')+1,i+1):(str.substring(str.indexOf('/')+1,i+1).match(/^[lpesincotag]{2,3}\(.*/i))?str.substring(str.indexOf('/')+1,i+1):str.substring(str.indexOf('/')+1,i);//this groups all of the characters after the / together and stores it in denominator variable
					exit=true;
				}
				i++;
			}
			while(!exit&&i<str.length);
			if(!exit)
			{
				denominator=str.substring(str.indexOf('/')+1,str.length);
			}
			if(compute.result(denominator)=='0')
			{
				if(compute.showErrors)
				{
					alert(compute.general_error[2]);
				}
				return false;
			}
			else
			{
				return this.check_denominator(str.substring(str.indexOf('/')+1));
			}
		},
		
		//these functions are used by this.checktrig()
		pi:function(str){
			var c=str.indexOf('p');
			if(c==-1)
			{
				return true;
			}
			else if(str.charAt(c+1)!='i')
			{
				return false;
			}
			
			return this.pi(str.substring(c+2));//recursive pi
		},
		logs:function(str){//tests for ln() and log() functions
			var c=str.indexOf('l');
			if(c==-1)
			{
				return true;
			}
			else if(str.charAt(c+1)!='n'&&(str.charAt(c+1)!='o'||str.charAt(c+2)!='g'))//check for ln and log at the same time
			{
				return false;
			}
			return (str.charAt(c+1)=='n')?this.logs(str.substring(c+3)):this.logs(str.substring(c+4));//recursive logs
		},
		e:function(str){//tests for the format of e as e^x exponential or scientific xey where x and y are likely integers or ratios of integers (doubles)
			var c=str.indexOf('e');
			if(c==-1)
			{
				return true;
			}
			else if(!this.regex(str.charAt(c+1),/[0-9\^]/i))
			{
				return false;
			}
			return this.e(str.substring(c+1));//recursive e
		},
		sin:function(str){//check for sin but make sure the 's' of sin is not the end of cos so it doesn't improperly fail the test
			var c=str.indexOf('s');
			if(c==-1)
			{
				return true;
			}
			else if(str.charAt(c)+str.charAt(c+1)+str.charAt(c+2)+str.charAt(c+3)!="sin("&&str.charAt(c-2)!='c')
			{
				return false;
			}
			
			return (str.charAt(c-2)=='c')?this.sin(str.substring(c+2)):this.sin(str.substring(c+4));//recursive sin and ensure not taking a substring of cos( incorrectly
		},
		cos:function(str){
			var c=str.indexOf('c');
			if(c==-1)
			{
				return true;
			}
			else if(str.charAt(c)+str.charAt(c+1)+str.charAt(c+2)+str.charAt(c+3)!="cos(")
			{
				return false;
			}
			
			return this.cos(str.substring(c+4));//recursive cos
		},
		tan:function(str){
			var c=str.indexOf('t');
			if(c==-1)
			{
				return true;
			}
			else if(str.charAt(c)+str.charAt(c+1)+str.charAt(c+2)+str.charAt(c+3)!="tan(")
			{
				return false;
			}
			
			return this.tan(str.substring(c+4));//recursive tan
		},
		check_a:function(str){//tests for acos, asin, and atan
			var c=str.indexOf('a');
			if(c==-1)
			{
				return true;
			}
			else if(str.charAt(c-1)!="t"&&!(str.charAt(c+1)=="c"||str.charAt(c+1)=="s"||str.charAt(c+1)=="t"))
			{
				return false;
			}
			
			return this.check_a(str.substring(c+1));//recursive check_a
		},
		check_g:function(str){//check every 'g' in the equation and ensure it is part of a function such as log
			var c=str.indexOf('g');
			if(c==-1)
			{
				return true;
			}
			else if(str.charAt(c-1)!="o")
			{
				return false;
			}
			return this.check_g(str.substring(c+1));//recursive check_g
		},
		check_i:function(str){//check every 'i' in the equation and ensure it is part of a function such as pi or sin
			var c=str.indexOf('i');
			if(c==-1)
			{
				return true;
			}
			else if(str.charAt(c-1)!="p"&&str.charAt(c-1)!="s")
			{
				return false;
			}
			return this.check_i(str.substring(c+1));//recursive check_i
		},
		check_n:function(str){//check every 'n' in the equation and ensure it is part of a function such as sin, tan, or ln
			var c=str.indexOf('n');
			if(c==-1)
			{
				return true;
			}
			else if(str.charAt(c-1)!="i"&&str.charAt(c-1)!="a"&&str.charAt(c-1)!="l")
			{
				return false;
			}
			return this.check_n(str.substring(c+1));//recursive check_n
		},
		check_o:function(str){//check every 'o' in the equation and ensure it is part of a function such as cos
			var c=str.indexOf('o');
			if(c==-1)
			{
				return true;
			}
			else if(str.charAt(c-1)!="c"&&str.charAt(c-1)!='l')
			{
				return false;
			}
			return this.check_o(str.substring(c+1));//recursive check_o
		}
	},//end of compute.test{}
	
	/*
	 * The formatEquation function is used by the result function.  This takes the human readable function and converts it into a format the JavaScript engine can compute.
	 * This function is the core interpreter for the whole operation which makes this library useful.
	 */
	formatEquation:function(str){
		if(typeof str!="string")
		{
			str=str.toString();
		}
		if(str=='0')
		{
			return str;
		}
		var results=new Array();
		var exit,i,j;
		if(str.indexOf('^')!=-1)//handle x^y power functions and reformat them into Math.pow(x,y)
		{//All of x gets stored in results[0] and all of y gets stored in results[1] so this way a regex can replace results[0]^results[1] into Math.pow(results[0],results[1])
			//handle the x part of x^y
			i=str.indexOf('^')-1;
			exit=false;
			j=0;
			do
			{
				switch(str.charAt(i))
				{
					case ')':
						j++;
						break;
					case '(':
						j--;
						break;
				}
				if(this.test.regex(str.charAt(i),/[\+\-\*\/><%,\(]/i)&&j<=0)
				{
					results[0]=(j<0||str.charAt(i)!='(')?str.substring(i+1,str.indexOf('^')):str.substring(i,str.indexOf('^'));//this groups all of the characters before the ^ together and stores it in the results array
					exit=true;
				}
				i--;
			}
			while(!exit&&i>-1);
			if(!exit)
			{
				results[0]=str.substring(0,str.indexOf('^'));
			}
			if(results[0]=='')
			{
				if(this.showErrors)
				{
					alert(this.general_error[4]);
				}
				return false;
			}//end of accounting for the x part of x^y
			//handle the y part of x^y
			if(this.test.regex(str.charAt(str.indexOf('^')+1),/[\+\-]/i))//accomodate for x^-y to Math.pow(x,-y) negative exponents
			{
				i=str.indexOf('^')+2;
			}
			else
			{
				i=str.indexOf('^')+1;
			}
			exit=false;
			j=0;
			do
			{
				switch(str.charAt(i))
				{
					case '(':
						j++;
						break;
					case ')':
						j--;
						break;
				}
				if(this.test.regex(str.charAt(i),/[\+\-\*\/><%\)]/i)&&j<=0)
				{
					results[1]=(str.charAt(str.indexOf('^')+1)=='(')?str.substring(str.indexOf('^')+1,i+1):(str.substring(str.indexOf('^')+1,i+1).match(/^[lpesincotag]{2,3}\(.*/i))?str.substring(str.indexOf('^')+1,i+1):str.substring(str.indexOf('^')+1,i);
					exit=true;
				}
				i++;
			}
			while(!exit&&i<str.length);
			if(!exit)
			{
				results[1]=str.substring(str.indexOf('^')+1,str.length);
			}
			if(results[1]=='')
			{
				if(this.showErrors)
				{
					alert(this.general_error[4]);
				}
				return false;
			}//end of acounting for the y part of x^y
			
			//return results[0];
			
			if(results[0]=='e')//check for exponential function e^x
			{
				str=eval("str.replace('"+results[0]+"^"+results[1]+"', 'Math.exp("+results[1]+")')");
			}
			else if(eval(this.formatEquation(results[0]))<0&&eval(this.formatEquation(results[1]))<1)//check for complex numbers
			{
				if(this.showErrors)
				{
					alert(this.general_error[3]);
				}
				return false;
			}
			else
			{
				str=eval("str.replace('"+results[0]+"^"+results[1]+"', 'Math.pow("+results[0]+","+results[1]+")')");
			}
			if(str.indexOf('^')!=-1)
			{
				return this.formatEquation(str);
			}
		}//end of handle x^y
		
		//handle trig functions
		str=str.replace(/log\(/gi,"this.rlog(");
		str=str.replace(/pi/gi,"Math.PI");
		str=str.replace(/ln\(/gi,"this.ln(");
		str=str.replace(/tan\(/gi,"this.tan(");
		str=str.replace(/cos\(/gi,"this.cos(");
		str=str.replace(/sin\(/gi,"this.sin(");
		str=str.replace(/athis\./gi,"this.a");
		//end of handle trig
		
		return str;
	},//end of compute.formatEquation()
	
	/*
	 * The roundFloat function is designed to round the float of a number both forwards and backwards.  For example compute.roundFloat(125.125,1) returns
	 * 125.1 and compute.roundFloat(125.125,-1) returns 130.
	 */
	roundFloat:function(num,float_val){//rounds the floats of numbers
		if(typeof num != "number" || typeof float_val != "number")
		{//test number types
			num=eval(num);
			float_val=eval(float_val);
		}
		var comp=1;
		for(var i=Math.abs(float_val); i > 0; i--)
		{
			comp=comp*10;
		};
		return (float_val<0)?Math.round(num/comp)*comp:Math.round(num*comp)/comp;
	},//end of compute.roundFloat()
	
	/*
	 * The following functions are math functions used during the evaluation of the equation.
	 */
	tan:function(str){
			if(typeof str != "string")
			if(this.cos(str).toString()=='0')
			{
				if(this.showErrors)
				{
					alert("tangent is undefined, can't divide by zero.");
				}
				throw "tan_trig_error";
			}
			else
			{
				if(this.degreesMode)
				{//degrees mode calculation
					return Math.tan(this.result(str)*Math.PI/180);
				}
				else
				{//radians mode calculation
					return Math.tan(this.result(str));
				}
			}
	},//end of compute.tan()
	sin:function(str){
		if(str.toString()==null)
		{
			throw "sin_trig_error";
		}
		else
		{
			if(this.degreesMode)
			{
				return Math.sin(this.result(str)*Math.PI/180);
			}
			else
			{
				return Math.sin(this.result(str));
			}
		}
	},//end of compute.sin()
	cos:function(str){
		if(str.toString()==null)
		{
			throw "cos_trig_error";
		}
		else
		{
			if(this.degreesMode)
			{
				return Math.cos(this.result(str)*Math.PI/180);
			}
			else
			{
				return Math.cos(this.result(str));
			}
		}
	},//end of compute.cos()
	atan:function(str){
		if(str.toString()==null)
		{
			throw "atan_trig_error";
		}
		else
		{
			if(this.degreesMode)
			{
				return Math.atan(this.result(str))*180/Math.PI;
			}
			else
			{
				return Math.atan(this.result(str));
			}
		}
	},//end of compute.atan()
	asin:function(str){
		if(str.toString()==null)
		{
			throw "asin_trig_error";
		}
		else if(this.result(str)==0)
		{
			return 0;
		}
		else if(this.result(str)>1||this.result(str)<-1)
		{
			if(this.showErrors)
			{
				alert("asin(x) error:\nx was either greater than 1 or less than -1\nasin Domain: {x|-1<=x<=1}");
			}
			throw "asin_trig_error";
		}
		else
		{
			if(this.degreesMode)
			{
				return Math.asin(this.result(str))*180/Math.PI;
			}
			else
			{
				return Math.asin(this.result(str));
			}
		}
	},//end of compute.asin()
	acos:function(str){
		if(str.toString()==null)
		{
			throw "acos_trig_error";
		}
		else if(this.result(str)==1)
		{
			return 0;
		}
		else if(this.result(str)>1||this.result(str)<-1)
		{
			if(this.showErrors)
			{
				alert("acos(x) error:\nx was either greater than 1 or less than -1\nacos Domain: {x|-1<=x<=1}");
			}
			throw "acos_trig_error";
		}
		else
		{
			if(this.degreesMode)
			{
				return Math.acos(this.result(str))*180/Math.PI;
			}
			else
			{
				return Math.acos(this.result(str));
			}
		}
	},//end of compute.acos()
	ln:function(str){//calculate the natural log of a number
		if(this.result(str)<=0)
		{
			if(this.showErrors)
			{
				alert("ln(x)=Undefined or Negative Infinity\nOutside of domain.\nln(x) Domain: {x|x>0}");
			}
			throw "ln_trig_error";
		}
		else
		{
			return Math.log(this.result(str));
		}

	},
	rlog:function(str){//calculate the root base 10 logarithmic function.
		if(this.result(str)<=0)
		{
			if(this.showErrors)
			{
				alert("log(x)=Undefined or Negative Infinity\nOutside of domain.\nlog(x) Domain: {x|x>0}");
			}
			throw "rlog_trig_error";
		}
		else
		{
			return Math.log(this.result(str))/Math.log(10);
		}
	},//end of compute.rlog()
	
	/*
	 * The compute.changeSign() function will take a string equation and return that same equation as a string wrapped with a negative value.
	 */
	changeSign:function(str){//change the negativity of the equation
		if(typeof str!="string")
		{
			str=str.toString();
		}
		var result;
		if(str=="0")
		{
			return str;
		}
		else if(this.test.checkall(str))
		{
			try
			{//test for equation errors, if equation fails then return false
				result=this.formatEquation(str);
				eval(result);
			}
			catch(e)
			{
				if(this.debug)
				{
					alert(
						"Exception in compute.changeSign function\n"+e
						+"\n\nstr="+str
						+"\n\nresult="+result
					);
				}
				if(this.showErrors)
				{
					alert(this.general_error[0]);
				}
				return false;
			}
			//if no errors then flip the sign
			if(this.test.regex(str,/[0-9\.\-]/))
			{
				if(this.test.regex(str.substring(1,str.length),/[0-9\.]/))
				{
					if(str.substring(0, 1)=="-")
					{
						return str.substring(1, display.value.length);
					}
					else
					{
						return "-" + str;
					}
				}
				else
				{
					return "-("+display.value+")";
				}
			}
			else if(str.substring(0, 2)=="-(")
			{
				if(str.substring(str.length-1,str.length)==")")
				{
					try
					{
						eval(str.substring(2,str.length-1));
					}
					catch(e)
					{
						return "-("+str+")";//negativity take away has failed so return original equation wrapped with negativity
					}
					return str.substring(2,str.length-1);//take away negativity if it doesn't harm the equation
				}
				else
				{
					return "-("+str+")";
				}
			}
			else if(this.formatEquation(str))
			{
				return "-("+str+")";
			}
			else
			{
				if(this.showErrors)
				{
					alert(this.general_error[0]);
				}
				return false;
			}
		}
		else
		{
			if(this.showErrors)
			{
				alert(general_error[1]);
			}
			return false;
		}
	},//end of compute.changeSign()
	
	/*
	 * The following code is for converting between bases
	 */
	baseKey:{
		key: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
		indexOf:function(c){
			return (this.key.indexOf(c.toUpperCase())!=-1)?this.key.indexOf(c.toUpperCase()):false;
		}
	},//end of compute.baseKey{}
	
	d2b: function(n,b){//decimal to base function
		if(typeof n!="number"||typeof b!="number")
		{
			try
			{
				n=eval(n);
				b=eval(b);
			}
			catch(e)
			{
				if(this.debug)
				{
					alert(
						"Exception in compute.b2d function\n"+e
						+"\n\nn="+n
						+"\n\nb="+b
					);
				}
				return false;
			}
		}
		if(b<2)
		{
			if(this.showErrors)
			{
				alert("Base can't be less than 2 in base conversion.")
			}
			return false;
		}
		else if(b>this.baseKey.key.length)
		{
			if(this.showErrors)
			{
				alert("Base is greater than " + this.baseKey.key.length.toString());
			}
			return false;
		}
		var fact=1,done="";
		while(fact*b<=n)
		{
			fact*=b;
		}
		while(fact>=1)
		{
			done+=this.baseKey.key.charAt(Math.floor(n/fact));
			n-=Math.floor(n/fact)*fact;
			fact/=b;
		}
		return (this.upperCaseBase)?done.toUpperCase():done.toLowerCase();
	},//end of compute.d2b()
	b2d: function(n,b){//base to decimal function
		if(typeof n!="string"||typeof b!="number")
		{
			try
			{
				n=n.toString();
				b=eval(b);
			}
			catch(e)
			{
				if(this.debug)
				{
					alert(
						"Exception in compute.b2d function\n"+e
						+"\n\nn="+n
						+"\n\nb="+b
					);
				}
				return false;
			}
		}
		if(b<2)
		{
			if(this.showErrors)
			{
				alert("Base can't be less than 2 in base conversion.")
			}
			return false;
		}
		else if(b>this.baseKey.key.length)
		{
			if(this.showErrors)
			{
				alert("Base is greater than " + this.baseKey.key.length.toString());
			}
			return false;
		}
		var fact=1,done=0,i;
		for(i=n.length-1;i>=0;i--)
		{
			done+=this.baseKey.indexOf(n.charAt(i))*fact;
			fact*=b;
		}
		return done;
	}
	
 }//end of compute{}
 
 /*
  * DEVELOPERS NOTES: HIGHLY RECOMMENDED TO READ WHEN DEVELOPING THIS LIBRARY
  * 1) Whenever you add a new function to be computed you must do 3 things for it to be correctly incorporated into this library...
  *    1st you must create the function and its functionality in the root of the compute{} object.
  *    2nd you must test for the function in the compute.test{} object to ensure there can be no syntax errors.
  *    3rd you must correctly parse and reformat the function for evaluating through the compute.formatEquation() function.
  *    If you do not account for all three of those things then this library will quickly degrade in quality and not function well.
  */

/*
ChangeLog
05/06/2010 is when initial creation of this object began.
05/17/2010 is when the public source of this object is released.

v0.1-v0.2 10/02/2010 (mm/dd/yyyy)
1.	Fixed bug where x/0 was not correctly handled which led to equation result inconsistencies.  Can't divide by zero.
2.	Fixed bug where sin(0)^2 was not correctly handled by formatEquation function giving and incorrect sinMath.pow((0),2) function.
3.	Fixed bug where domain of ln(x) was not properly handled producing and inconsistent NaN result from compute.result function.
4.	Fixed bug where 2^3^2 (multiple levels of powers) were not correctly calculating.

 */