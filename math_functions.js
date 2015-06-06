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
	if(checkNum())
	{
		if(convert.test(display.value,/[0-9\.\-]/))
		{
			if(display.value.substring(0, 1)=="-")
				display.value=display.value.substring(1, display.value.length);
			else
				display.value="-"+display.value;
		}
		else if(display.value.substring(0, 2)=="-(")
		{
			if(display.value.substring(display.value.length-1,display.value.length)==")")
			{
				display.value=display.value.substring(2, display.value.length);
				deleteChar();
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
function compute()
{
	if(checkNum())
	{
		if(display.value=='pi')
			display.value="3.1415926535897932384626433832795";
		else
			display.value=eval(display.value);
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