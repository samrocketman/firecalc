/*********************************************\
*                                             *
*              Calc buttons Code              *
*                                             *
\*********************************************/
var general_error=[
	"There are errors in the equation.\n\nCheck for:\nMissing symbols next to parenthesis. 3(10) will not work but 3*(10) will.\nHanging equation symbols like (3*(10)+) where the + is the error.\nOpen parenthesis. (2*(4+3) will not work but (2*(4+3)) will.\nBroken, misspelled, or undefined trig functions.",
	"Invalid characters in display or misspelled trig functions."
	];
function addChar(character) 
{
	if(display.value.toString()==null || display.value=="0")
		display.value=character;
	else
	{
		if(character=="pi"||character=='('||character=='sin('||character=='cos('||character=='tan('||character=='asin('||character=='acos('||character=='atan(')
		{
			if(convert.test(display.value.charAt(display.value.length-1),/[0-9i\)]/i))
				display.value+='*'+character;
			else
				display.value+=character;
		}
		else
		{
			if(convert.test(display.value.charAt(display.value.length-1),/[\)i]/i)&&!convert.test(character.toString(), /[\)\+\-\*\/\^]/i))
				display.value+='*'+character;
			else
				display.value+=character;
		}
	}
}
function checkNum()
{
	//checks for correctly spelled trig functions and pi (checktrig object)
	var checktrig={
		test:function(str){
			return (this.sin(str)&&this.cos(str)&&this.tan(str)&&this.pi(str)&&this.check_a(str)&&this.check_i(str)&&this.check_n(str)&&this.check_o(str));
		},
		pi:function(str){
			var c=str.indexOf('p');
			if(c==-1)
				return true;
			else if(str.charAt(c)+str.charAt(c+1)!="pi")
				return false;
			return this.pi(str.substring(c+2))
		},
		sin:function(str){
			var c=str.indexOf('s');
			if(c==-1)
				return true;
			//check for sin but make sure it's not the end of cos(
			else if(str.charAt(c)+str.charAt(c+1)+str.charAt(c+2)+str.charAt(c+3)!="sin("&&str.charAt(c-2)!='c')
				return false;
			return this.sin(str.substring(c+4));
		},
		cos:function(str){
			var c=str.indexOf('c');
			if(c==-1)
				return true;
			else if(str.charAt(c)+str.charAt(c+1)+str.charAt(c+2)+str.charAt(c+3)!="cos(")
				return false;
			return this.cos(str.substring(c+4));
		},
		tan:function(str){
			var c=str.indexOf('t');
			if(c==-1)
				return true;
			else if(str.charAt(c)+str.charAt(c+1)+str.charAt(c+2)+str.charAt(c+3)!="tan(")
				return false;
			return this.tan(str.substring(c+4));
		},
		check_a:function(str){
			var c=str.indexOf('a');
			if(c==-1)
				return true;
			else if(str.charAt(c-1)!="t"&&!(str.charAt(c+1)=="c"||str.charAt(c+1)=="s"||str.charAt(c+1)=="t"))
				return false;
			return this.check_a(str.substring(c+1))
		},
		check_i:function(str){
			var c=str.indexOf('i');
			if(c==-1)
				return true;
			else if(str.charAt(c-1)!="p"&&str.charAt(c-1)!="s")
				return false;
			return this.check_i(str.substring(c+1))
		},
		check_n:function(str){
			var c=str.indexOf('n');
			if(c==-1)
				return true;
			else if(str.charAt(c-1)!="i"&&str.charAt(c-1)!="a")
				return false;
			return this.check_n(str.substring(c+1))
		},
		check_o:function(str){
			var c=str.indexOf('o');
			if(c==-1)
				return true;
			else if(str.charAt(c-1)!="c")
				return false;
			return this.check_o(str.substring(c+1))
		}
	}
	return (checktrig.test(display.value)&&convert.test(display.value, /[0-9pesincota\(\)\+\-\.\*\/\^]/i));
}
function cos(eqtn)
{
	if(eqtn.toString()==null)
		throw "error";
	else
	{
		if(calc.angle[0].checked)
			return roundFloat(Math.cos(eval(compute(eqtn.toString())*pi/180)),13);
		else
			return roundFloat(Math.cos(compute(eqtn.toString())),13);
	}
}
function sin(eqtn)
{
	if(eqtn)
	{
		if(calc.angle[0].checked)
			return roundFloat(Math.sin(eval(compute(eqtn.toString())*pi/180)),13);
		else
			return roundFloat(Math.sin(compute(eqtn.toString())),13);
	}
	else if(eqtn.toString()==null)
		throw "error";
	else
		return 0;
}
function tan(eqtn)
{
	if(eqtn.toString()==null)
		throw "error";
	else if(cos(eqtn).toString()=='0')
	{
		alert("tangent is undefined, can't divide by zero.");
		throw "error";
	}
	else
	{
		if(calc.angle[0].checked)
			return roundFloat(Math.tan(eval(compute(eqtn.toString())*pi/180)),13);
		else
			return roundFloat(Math.tan(compute(eqtn.toString())),13);
	}
}
function acos(eqtn)
{
	if(eqtn.toString()==null)
		throw "error";
	if(eqtn.toString()=="1")
		return 0;
	else if(compute(eqtn.toString())>1||compute(eqtn.toString())<-1)
	{
		alert("acos(x) error:\nx was either greater than 1 or less than -1\nacos Domain: {x|-1<=x<=1}");
		throw "error";
	}
	else
	{
		if(calc.angle[0].checked)
			return roundFloat(eval(Math.acos(compute(eqtn.toString()))*180/pi),13);
		else
			return Math.acos(compute(eqtn.toString()));
	}
}
function asin(eqtn)
{
	if(eqtn.toString()==null)
		throw "error";
	if(eqtn.toString()=="0")
		return 0;
	else if(compute(eqtn.toString())>1||compute(eqtn.toString())<-1)
	{
		alert("asin(x) error:\nx was either greater than 1 or less than -1\nasin Domain: {x|-1<=x<=1}");
		throw "error";
	}
	else
	{
		if(calc.angle[0].checked)
			return roundFloat(eval(Math.asin(compute(eqtn.toString()))*180/pi),13);
		else
			return Math.asin(compute(eqtn.toString()));
	}
}
function atan(eqtn)
{
	if(eqtn.toString()==null)
		throw "error";
	else
	{
		if(calc.angle[0].checked)
			return roundFloat(eval(Math.atan(compute(eqtn.toString()))*180/pi),13);
		else
			return Math.atan(compute(eqtn.toString()));
	}
}
function sqrt()
{
	if(compute(display.value.toString()))
		display.value=Math.sqrt(compute(display.value.toString()));
}
function ln()
{
	if(display.value.toString()=='0')
		alert("ln(0)=Undefined or Negative Infinity\nln(x) Domain: {x|x>0}")
	if(compute(display.value.toString())<=0)
		alert("Can't compute ln of a negative number.\nOutside of domain.\nln(x) Domain: {x|x>0}")
	else if(compute(display.value.toString()))
		display.value=Math.log(compute(display.value.toString()));
}
function rlog()
{
	if(display.value.toString()=='0')
		alert("ln(0)=Undefined or Negative Infinity\nlog(x) Domain: {x|x>0}")
	if(compute(display.value.toString())<=0)
		alert("Can't compute log of a negative number.\nOutside of domain.\nlog(x) Domain: {x|x>0}")
	else if(compute(display.value.toString()))
		display.value=eval(Math.log(compute(display.value.toString()))/Math.log(10));
}
function exp()
{
	if(display.value.toString()=='0')
		display.value=Math.exp(0);
	else if(compute(display.value.toString()))
		display.value=Math.exp(compute(display.value.toString()));
}
function square()
{
	if(compute(display.value.toString()))
		display.value=eval(compute(display.value.toString())*compute(display.value.toString()));
}
function cube()
{
	if(compute(display.value.toString()))
		display.value=pow(compute(display.value.toString()),3);
}
function pow(x,y)
{//power function simplified for calculator use
	return Math.pow(x,y);
}
function deleteChar()
{//deletes a char from right to left in display
	//detect trig functions but delete single chars if trig functions are misspelled
	if(display.value.charAt(display.value.length-1)=='('&&(display.value.charAt(display.value.length-4)=='s'||display.value.charAt(display.value.length-4)=='c'||display.value.charAt(display.value.length-4)=='t'))
	{
		if(display.value.charAt(display.value.length-5)=='a')
		display.value=display.value.substring(0,display.value.length-5);//delete acos(, asin(, atan(
		else
			display.value=display.value.substring(0,display.value.length-4);//delete cos(, sin(, tan(
	}
	else if(display.value.charAt(display.value.length-1)=='i'&&display.value.charAt(display.value.length-2)=='p')
		display.value=display.value.substring(0,display.value.length-2);//delete pi
	else
		display.value=display.value.substring(0,display.value.length-1);//delete single char

	if(display.value=='')
		display.value=0;//if there are no chars to delete,then set display=0
}
function changeSign()
{
	if(display.value=="0")
		return;
	if(checkNum())
	{
		try
		{//test for equation errors
			result=displayToPower(display.value);
			eval(result);
		}
		catch(e)
		{
			alert(general_error[0]);
			return false;
		}
		//if no errors then flip the sign
		if(convert.test(display.value,/[0-9\.\-]/))
		{
			if(convert.test(display.value.substring(1,display.value.length),/[0-9\.]/))
			{
				if(display.value.substring(0, 1)=="-")
					display.value=display.value.substring(1, display.value.length);
				else
					display.value="-"+display.value;
			}
			else
				display.value="-("+display.value+")";
			
		}
		else if(display.value.substring(0, 2)=="-(")
		{
			if(display.value.substring(display.value.length-1,display.value.length)==")")
			{
				var backup=display.value;
				display.value=display.value.substring(2, display.value.length);
				deleteChar();
				try
				{
					var test_str=eval(display.value);
				}
				catch(e)
				{
					display.value="-("+backup+")";
				}
			}
			else
				display.value="-("+display.value+")";
		}
		else if(displayToPower(display.value))
			display.value="-("+display.value+")";
		else
			alert(general_error[0]);
	}
	else
		alert(general_error[1]);
}
function displayToPower(str)
{
	var regExp=/[\+\-\*\/\(\)]/;
	var results=new Array();
	var exit,i,j;
	if(str=='0')
		return 0;
	if(str.indexOf('^')!=-1)
	{
		if(str.charAt(str.indexOf('^')-1)==')')
		{
			//this is where you start programming for (2+2)^2 to be turned into pow((2+2),2)
			i=str.indexOf('^')-1;
			exit=false;
			j=1;
			while(!exit&&i>0)
			{
				i--;
				if(str.charAt(i)==')')
					j++;
				else if(str.charAt(i)=='(')
					j--;
				if(j==0)
				{
					if(str.charAt(i-3)=='s'||str.charAt(i-3)=='c'||str.charAt(i-3)=='t')//detect trig functions
					{
						if(str.charAt(i-4)=='a')
							results[0]=str.substring(i-4,str.indexOf('^'));
							else
								results[0]=str.substring(i-3,str.indexOf('^'));
					}
					else
						results[0]=str.substring(i,str.indexOf('^'));//handle normally
					exit=true;
				}
			}
			if(j)
				return false;
		}
		else
		{
			i=str.indexOf('^')-1;
			exit=false;
			do
			{
				if(regExp.test(str.charAt(i)))
				{
					results[0]=str.substring(i+1,str.indexOf('^'));
					exit=true;
				}
				i--;
			}
			while(!exit&&i>-1);
			if(!exit)
				results[0]=str.substring(0,str.indexOf('^'));
		}
		
		if(str.charAt(str.indexOf('^')+1)=='('||(((str.charAt(str.indexOf('^')+1)=='+')||(str.charAt(str.indexOf('^')+1)=='-'))&&str.charAt(str.indexOf('^')+2)=='(')?true:false)
		{
			//this is where you start programming for 2^(2+2) to be turned into pow(2,(2+2))
			if(str.charAt(str.indexOf('^')+1)=='+'||str.charAt(str.indexOf('^')+1)=='-')//accomodate for 10^-(1+2)
				i=str.indexOf('^')+3;
			else
				i=str.indexOf('^')+1;
			exit=false;
			j=1;
			while(!exit&&i<str.length)
			{
				i++;
				if(str.charAt(i)==')')
					j--;
				else if(str.charAt(i)=='(')
					j++;
				if(j==0)
				{
					results[1]=str.substring(str.indexOf('^')+1,i);
					exit=true;
				}
			}
			if(j)
				return false;
		}
		else
		{
			if(str.charAt(str.indexOf('^')+1)=='+'||str.charAt(str.indexOf('^')+1)=='-')//accomodate for 10^-3
				i=str.indexOf('^')+2;
			else
				i=str.indexOf('^');
			exit=false;
			do
			{
				if(regExp.test(str.charAt(i)))
				{
					results[1]=str.substring(str.indexOf('^')+1,i);
					exit=true;
				}
				i++;
			}
			while(!exit&&i<str.length)
			if(!exit)
				results[1]=str.substring(str.indexOf('^')+1,str.length);
		}
		str=eval("str.replace('"+results[0]+"^"+results[1]+"', 'pow("+results[0]+","+results[1]+")')");
		if(str.indexOf('^')!=-1)
			return displayToPower(str);
	}
	return str;
}
function display_compute()
{
	var original=display.value,result=compute(display.value.toString());
	if(result.toString()!="false")		
		display.value=compute(display.value.toString());
}
function compute(eqtn)
{
	var result;
	try
	{
		if(checkNum())
		{
			if(eqtn=='pi')
				return "3.1415926535897932384626433832795";
			else if(eqtn=='0')
				return 0;
			else if(displayToPower(eqtn))
			{
				result=displayToPower(eqtn);
				if(eval(result)=="Infinity")
				{
					alert("Can't divide by zero.");
					return false;
				}
				else
				{
					return eval(result);
				}
					
			}
			else
			{
				alert(general_error[0]);
				return false;
			}
			return true;
		}
		else
		{
			alert(general_error[1]);
		}
	}
	catch(e)
	{
		alert(general_error[0]);
	}
	return false;
}
function flip()
{
	if(compute(display.value.toString()))
	{
		if(display.value=='pi')
			display.value=eval("1/3.1415926535897932384626433832795");
		else
			display.value=eval("1/("+compute(display.value.toString())+")");
	}
	else
		return false;
}
function StoreMem()
{
	if(compute(display.value.toString()))
	{
		if(display.value!=0)
		{
			mem=compute(display.value.toString());
			store=true;
			calc.memory.value="M";
		}
	}
	else
		return false;
}
function ClearMem()
{
	mem="";
	store=false;
	calc.memory.value="";
	return;
}
function RecallMem()
{
	if(store)
		addChar(mem);
	else
		return false;
}
function MemPlus()
{
	if(compute(display.value.toString()))
	{
		if(mem)
		{
			arg=eval(mem+"+"+compute(display.value.toString()));
			mem=arg;
		}
	}
}