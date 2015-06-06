/*********************************************\
*                                             *
*           Functions below run other         *
*     functions when pressing certain keys    *
*                                             *
\*********************************************/
function keydown(e)
{
	var keyCode;
	if(msie)
	{
		keyCode=event.keyCode;
		if (keyCode == 13 || keyCode == 61)
		{//Enter Key
			calc.enter.focus();
			return compute();
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
			calc.enter.focus();
			if(checkNum(display.value))
			{
				return compute(calc);
			}
		}
	}
	if(keyCode==46)
	{//DeleteKey
		display.value=0;
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
		calc.parl.focus();
		addChar('(');
	}
	if(keyCode==41)
	{
		calc.parr.focus();
		addChar(')');
	}
	if(keyCode==42)
	{
		calc.multiply.focus();
		addChar('*');
	}
	if(keyCode==43)
	{
	calc.add.focus();
	addChar('+');
	}
	if(keyCode==44)
		addChar(',');
	if(keyCode==45)
	{
		calc.subtract.focus();
		addChar('-');
	}
	if(keyCode==46)
	{
		calc.dot.focus();
		addChar('.');
	}
	if(keyCode==47)
	{
		calc.divide.focus();
		addChar('/');
	}
	if(keyCode==48)
	{
		calc.btn0.focus();
		addChar('0');
	}
	if(keyCode==49)
	{
		calc.btn1.focus();
		addChar('1');
	}
	if(keyCode==50)
	{
		calc.btn2.focus();
		addChar('2');
	}
	if(keyCode==51)
	{
		calc.btn3.focus();
		addChar('3');
	}
	if(keyCode==52)
	{
		calc.btn4.focus();
		addChar('4');
	}
	if(keyCode==53)
	{
		calc.btn5.focus();
		addChar('5');
	}
	if(keyCode==54)
	{
		calc.btn6.focus();
		addChar('6');
	}
	if(keyCode==55)
	{
		calc.btn7.focus();
		addChar('7');
	}
	if(keyCode==56)
	{
		calc.btn8.focus();
		addChar('8');
	}
	if(keyCode==57)
	{
		calc.btn9.focus();
		addChar('9');
	}
	if(keyCode==59)
	{
		addChar(';');
	}
	if(keyCode==99||keyCode==67)
	{//clear the memory when C is pressed (button MC)
		calc.mClear.focus();
		ClearMem();
	}
	if(keyCode==101||keyCode==69)
	{//insert e when E key is pressed
		calc.ekey.focus();
		addChar('e');
	}
	if(keyCode==109||keyCode==77)
	{//add to memory when M is pressed (button M+)
		calc.mPlus.focus();
		MemPlus();
	}
	if(keyCode==112||keyCode==80)
	{//insert pi when P is pressed
		calc.pi.focus();
		addChar('pi');
	}
	if(keyCode==114||keyCode==82)
	{//recall the memory when R is pressed (button MR)
		calc.mRecall.focus();
		RecallMem();
	}
	if(keyCode==115||keyCode==83)
	{//store the memory when S is pressed (button MS)
		calc.mStore.focus();
		StoreMem();
	}
}