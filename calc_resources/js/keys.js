/*********************************************\
*                                             *
*           Functions below run other         *
*     functions when pressing certain keys    *
*                                             *
\*********************************************/
function keydown(e)
{
	if(enableKeys)
	{
		//grab the key event, if no event able to be grabbed then exit the function
		var keyCode=(msie)?event.keyCode:(window.event)?window.event.keyCode:(e)?e.which:false;
		if(!keyCode)
			return false;
		//detect the keys pressed
		switch(keyCode)
		{
			case 8://Backspace Key
				deleteChar();
				calc.backbtn.focus();
				break;
			case 13://Enter key
			case 61://'=' sign
				calc.enter.focus();
				if(checkNum(display.value))
					compute(calc);
				break;
			case 42://'*' in Opera
			case 106://'*' in other browsers
				calc.multiply.focus();
				addChar('*');
				break;
			case 43://'+' in Opera
			case 107://'+' in other browsers
				calc.add.focus();
				addChar('+');
				break;
			case 45://'-' in Opera
			case 109://'-' in other browsers
				calc.subtract.focus();
				addChar('-');
				break;
			case 46://Delete Key
				display.value=0;
				calc.delbtn.focus();
				break;
			case 47://'/' in Opera
			case 111://'/' in other browsers
				calc.divide.focus();
				addChar('/');
				break;
			case 78://'.' in Opera
			case 110://'.' in other browsers
				calc.dot.focus();
				addChar('.');
				break;
		}
		return false;
	}
}



function keypress(e)
{
	var keyCode=(msie)?event.keyCode:(window.event)?window.event.keyCode:(e)?e.which:false;
	if(!keyCode)
		return false;
	if(enableKeys)
	{
		if('function'==typeof e.preventDefault)
		{
			e.preventDefault();
		}
		else
		{
			e.returnValue=false;
		}
		if(!keyCode)
			return false;
		
		//detect the keys pressed
		switch(keyCode)
		{
			case 40:
				calc.parl.focus();
				addChar('(');
				break;
			case 41:
				calc.parr.focus();
				addChar(')');
				break;
			case 44:
				addChar(',');
				break;
			case 48:
				calc.btn0.focus();
				addChar('0');
				break;
			case 49:
				calc.btn1.focus();
				addChar('1');
				break;
			case 50:
				calc.btn2.focus();
				addChar('2');
				break;
			case 51:
				calc.btn3.focus();
				addChar('3');
				break;
			case 52:
				calc.btn4.focus();
				addChar('4');
				break;
			case 53:
				calc.btn5.focus();
				addChar('5');
				break;
			case 54:
				calc.btn6.focus();
				addChar('6');
				break;
			case 55:
				calc.btn7.focus();
				addChar('7');
				break;
			case 56:
				calc.btn8.focus();
				addChar('8');
				break;
			case 57:
				calc.btn9.focus();
				addChar('9');
				break;
			case 67:
			case 99:
				//clear the memory when C is pressed (button MC)
				calc.mClear.focus();
				ClearMem();
				break;
			case 69:
			case 101:
				//insert e when E key is pressed
				calc.ekey.focus();
				addChar('e');
				break;
			case 77:
			case 109:
				//add to memory when M is pressed (button M+)
				calc.mPlus.focus();
				MemPlus();
				break;
			case 80:
			case 112:
				//insert pi when P is pressed
				calc.pi.focus();
				addChar('pi');
				break;
			case 82:
			case 114:
				//recall the memory when R is pressed (button MR)
				calc.mRecall.focus();
				RecallMem();
				break;
			case 83:
			case 115:
				//store the memory when S is pressed (button MS)
				calc.mStore.focus();
				StoreMem();
				break;
			case 94://'^'
				calc.c7.focus();
				addChar('^');
				break;
		}
	}
}
