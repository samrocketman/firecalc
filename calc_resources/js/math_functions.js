/*********************************************\
*                                             *
*              Calc buttons Code              *
*                                             *
\*********************************************/
function addChar(character) 
{
	if(display.value==null || display.value=="0")
		display.value=character;
	else
		display.value+=character;
}
function checkNum()
{
	return convert.test(display.value,/[0-9peiow\(\),\+\-\*\/\.\^]/i);
}
function cos()
{
	if(compute())
		display.value=Math.cos(display.value);
}
function sin()
{
	if(compute())
		display.value=Math.sin(display.value);
}
function tan()
{
	if(compute())
		display.value=Math.tan(display.value);
}
function sqrt()
{
	if(compute())
		display.value=Math.sqrt(display.value);
}
function ln()
{
	if(compute())
		display.value=Math.log(display.value);
}
function exp()
{
	if(compute())
		display.value=Math.exp(display.value);
}
function square()
{
	if(compute())
		display.value*=display.value;
}
function cube()
{
	if(compute())
		display.value=pow(display.value,3);
}
function pow(x,y)
{//power function simplified for calculator use
	return Math.pow(x,y);
}
function deleteChar()
{//deletes a char from right to left in display
	display.value=display.value.substring(0,display.value.length-1)
	if(display.value=='')
		display.value=0;
}
function changeSign()
{
	if(display.value=="0")
		return;
	if(checkNum())
	{
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
		else
			display.value="-("+display.value+")";
	}
	else
		alert("Invalid characters in display");
}
function displayToPower(str)
{
	var regExp=/[\+\-\*\/\(\)]/;
	var results=new Array();
	var exit,i,j;
	
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
					results[0]=str.substring(i,str.indexOf('^'));
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
		
		if(str.charAt(str.indexOf('^')+1)=='(')
		{
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
function compute()
{
	var result;
	if(checkNum())
	{
		if(display.value=='pi')
			display.value="3.1415926535897932384626433832795";
		else if(displayToPower(display.value))
		{
			result=displayToPower(display.value);
			display.value=eval(result);
		}
		else
		{
			alert("Incorrectly formated equation");
			return false;
		}
		return true;
	}
	else
		alert("Invalid characters in display");
	return false;
}
function flip()
{
	if(compute())
	{
		if(display.value=='pi')
			display.value=eval("1/3.1415926535897932384626433832795");
		else
			display.value=eval("1/("+display.value+")");
	}
	else
		return false;
}
function StoreMem()
{
	if(compute())
	{
		if(display.value!=0)
		{
			mem=display.value;
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
	if(compute())
	{
		if(mem)
		{
			arg=eval(mem+"+"+display.value);
			mem=arg;
		}
	}
}