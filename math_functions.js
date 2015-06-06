/*********************************************\
*                                             *
*              Calc buttons Code              *
*                                             *
\*********************************************/
function addChar(character) 
{
	var display=document.calc.display;
	if(display.value==null || display.value=="0")
		display.value=character;
	else
		display.value += character;
}
function checkNum()
{
	var display=document.calc.display;
	return convert.test(display.value,/[0-9javscript\/*+-.()eE^owxy,:;]/);
}
function cos()
{
	var display=document.calc.display;
	if(checkNum())
		display.value = Math.cos(display.value);
}
function sin()
{
	var display=document.calc.display;
	if(checkNum())
		display.value = Math.sin(display.value);
}
function tan()
{
	var display=document.calc.display;
	if(checkNum())
		display.value = Math.tan(display.value);
}

function sqrt()
{
	var display=document.calc.display;
	compute();
	if(checkNum())
		display.value = Math.sqrt(display.value);
}

function ln()
{
	var display=document.calc.display;
	if(checkNum())
		display.value = Math.log(display.value);
}

function exp()
{
	var display=document.calc.display;
	if(checkNum())
		display.value = Math.exp(display.value);
}
function square()
{
	var display=document.calc.display;
	if(!checkNum())
		return false;
	eval(display.value);
	display.value*=display.value;
}
function cube()
{
	var display=document.calc.display;
	if(!checkNum())
		return false;
	eval(display.value)
	display.value=pow(display.value,3);
}
function pow(x,y)
{//power function
	return Math.pow(x,y);
}
function deleteChar()
{//deletes a char from right to left in display
	var display=document.calc.display;
	for(var i=0;i<display.value.length;i++)
	{
		var ch=display.value.substring(i,i+2)
		if(ch=='i')
		{
			display.value=display.value.substring(0,display.value.length-1);
			display.value=display.value.substring(0,display.value.length-1);
			if(display.value=='')
				display.value=0;
			return false;
        }
	}
	display.value=display.value.substring(0,display.value.length-1)
	if (display.value=='')
		display.value=0;
}

function changeSign()
{
	var display=document.calc.display;
	if(!checkNum())
		return false;
	if(display.value.substring(0, 1)=="-")
		display.value=display.value.substring(1, display.value.length);
	else
		display.value="-"+display.value;
}

function compute()
{
	var display=document.calc.display;
	if(!checkNum())
		return false;
	if (display.value == 'pi')
	{
		display.value = "3.1415926535897932384626433832795";
		return false;
	}
	display.value = eval(display.value);
}
function flip()
{
	var display=document.calc.display
	if (display.value == 'pi')
	{
		display.value = eval("1/3.1415926535897932384626433832795");
		return false;
	}
	display.value = eval("1/("+display.value+")");
}


   function StoreMem() {
      var calc = document.calc
      if (calc.display.value != 0) {
         mem = calc.display.value;
         store = 1
         document.calc.memory.value = "M"
      }
      return false
   }

function ClearMem()
{
	var mem="";
	store=0;
	document.calc.memory.value="";
}
function RecallMem()
{
	if (store)
		addChar(mem);
	return false;
}
function MemPlus()
{
	var display=document.calc.display;
	if (mem)
	{
		arg=eval(mem+"+"+display.value);
		mem=arg;
	}
	else
		return false;
}