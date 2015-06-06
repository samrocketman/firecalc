/*********************************************\
*                                             *
*           Functions below run other         *
*     functions when pressing certain keys    *
*                                             *
\*********************************************/

var msie;

function keydown(e)
{
	var keyCode;
	if(msie)
	{
		keyCode=event.keyCode;
		if (keyCode == 13 || keyCode == 61)
		{//Enter Key
			document.calc.enter.focus();
			if (checkNum(document.calc.display.value))
				return compute(document.calc);
		}
	}
	else
	{
		if(window.event)
			keyCode=window.event.keyCode;
		else if(e)
			keyCode=e.which;
		
		if(keyCode==13||keyCode==61)
		{//EnterKey
			document.calc.enter.focus();
			if(checkNum(document.calc.display.value))
			{
				return compute(document.calc);
			}
		}
	}
	if(keyCode==46)
	{//DeleteKey
		document.calc.display.value=0;
		document.getElementById("delbtn").focus();
	}
	if(keyCode==8)
	{//BackspaceKey
		deleteChar();
		document.getElementById("backbtn").focus();
	}
}



function keypress(e)
{
	var keyCode;
	if(msie)
		keyCode=event.keyCode;
	else
	{
		if(window.event)keycode=window.event.keyCode;
		else if(e)
			keyCode=e.which;
	}
	if(keyCode==40)
	{
		document.calc.parl.focus();
		addChar('(');
	}
	if(keyCode==41)
	{
		document.calc.parr.focus();
		addChar(')');
	}
	if(keyCode==42)
	{
		document.calc.multiply.focus();
		addChar('*');
	}
	if(keyCode==43)
	{
	document.calc.add.focus();
	addChar('+');
	}
	if(keyCode==44)
		addChar(',');
	if(keyCode==45)
	{
		document.calc.subtract.focus();
		addChar('-');
	}
	if(keyCode==46)
	{
		document.calc.dot.focus();
		addChar('.');
	}
	if(keyCode==47)
	{
		document.calc.divide.focus();
		addChar('/');
	}
	if(keyCode==48)
	{
		document.calc.btn0.focus();
		addChar('0');
	}
	if(keyCode==49)
	{
		document.calc.btn1.focus();
		addChar('1');
	}
	if(keyCode==50)
	{
		document.calc.btn2.focus();
		addChar('2');
	}
	if(keyCode==51)
	{
		document.calc.btn3.focus();
		addChar('3');
	}
	if(keyCode==52)
	{
		document.calc.btn4.focus();
		addChar('4');
	}
	if(keyCode==53)
	{
		document.calc.btn5.focus();
		addChar('5');
	}
	if(keyCode==54)
	{
		document.calc.btn6.focus();
		addChar('6');
	}
	if(keyCode==55)
	{
		document.calc.btn7.focus();
		addChar('7');
	}
	if(keyCode==56)
	{
		document.calc.btn8.focus();
		addChar('8');
	}
	if(keyCode==57)
	{
		document.calc.btn9.focus();
		addChar('9');
	}
	if(keyCode==59)
	{
		addChar(';');
	}
	if(keyCode==99||keyCode==67)
	{//clear the memory when C is pressed (button MC)
		document.calc.mClear.focus();
		ClearMem();
	}
	if(keyCode==101||keyCode==69)
	{//insert e when E key is pressed
		document.calc.ekey.focus();
		addChar('e');
	}
	if(keyCode==109||keyCode==77)
	{//add to memory when M is pressed (button M+)
		document.calc.mPlus.focus();
		MemPlus();
	}
	if(keyCode==112||keyCode==80)
	{//insert pi when P is pressed
		document.calc.pi.focus();
		addChar('pi');
	}
	if(keyCode==114||keyCode==82)
	{//recall the memory when R is pressed (button MR)
		document.calc.mRecall.focus();
		RecallMem();
	}
	if(keyCode==115||keyCode==83)
	{//store the memory when S is pressed (button MS)
		document.calc.mStore.focus();
		StoreMem();
	}
}