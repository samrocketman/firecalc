/*********************************************\
*                                             *
*             Start of Menu Code              *
*                                             *
\*********************************************/
//Toggle functions for the View Menu
function set_titles()
{
		calc.memory.title="Shows if there is something stored in memory";
		calc.backbtn.title="Delete a character from Equation from right to left";
		calc.delbtn.title="Clears the Equation";
		calc.ac.title="Clears the Equation and the memory";
		calc.mClear.title="Clears the memory";
		calc.btn7.title="Inserts the character 7";
		calc.btn8.title="Inserts the character 8";
		calc.btn9.title="Inserts the character 9";
		calc.divide.title="Inserts the '/' character";
		calc.b6.title="Takes the exponential of the Equation [e^x]";
		calc.b7.title="Takes the natural log of the Equation";
		calc.mRecall.title="Recalls the memory into the Equation (inserts)";
		calc.btn4.title="Inserts the character 4";
		calc.btn5.title="Inserts the character 5";
		calc.btn6.title="Inserts the character 6";
		calc.multiply.title="Inserts the '*' character";
		calc.c6.title="Computes and then takes the square root of the Equation";
		calc.c7.title="Power of X to Y";
		calc.mStore.title="Computes and then stores the Equation into memory";
		calc.btn1.title="Inserts the character 1";
		calc.btn2.title="Inserts the character 2";
		calc.btn3.title="Inserts the character 3";
		calc.subtract.title="Inserts the '+' character";
		calc.d6.title="Computes and then squares the Equation";
		calc.d7.title="Computes and then cubes the Equation";
		calc.mPlus.title="Computes and then adds Equation to the value stored in memory";
		calc.btn0.title="Inserts the character 0";
		calc.e3.title="Changes the negativity of the whole equation";
		calc.dot.title="Inserts the '.' character";
		calc.add.title="Inserts the '+' character";
		calc.enter.title="Computes the current Equation";
		calc.e7.title="Computes and then inverts the current Equation";
		calc.pi.title="Inserts 'pi'";
		calc.parl.title="Inserts the '(' character";
		calc.parr.title="Inserts the ')' character";
		calc.f4.title="Inserts 'cos('";
		calc.f5.title="Inserts 'sin('";
		calc.f6.title="Inserts 'tan('";
		calc.ekey.title="Inserts the 'e' character [1e3=1x10^3=1000] (not exp)";
		calc.g1.title="Inserts 'acos('";
		calc.g3.title="Inserts 'asin('";
		calc.g5.title="Inserts 'atan('";
		calc.log.title="Computes and then takes the log of the current equation";
		
}

function toggle_display()
{
	var checkbox=document.getElementById('radio2');
	//toggle the checkbox
	checkbox.checked=!checkbox.checked;

	//enable/disable the display
	if(!checkbox.checked)
		display.readOnly=false;
	else
		display.readOnly=true;
	window.focus();
}

function toggle_keys(opt)
{
	//toggle hotkeys when focused on calc display
	if(opt)
	{
		if(opt=='on')
			enableKeys=true;
		else if(opt=='off')
			enableKeys=false;
	}
}

function roundFloat(num,float_val)
{
	if(document.getElementById('float').value=='Not Set' || document.getElementById('float').value=='null')
	{
		alert('Float Not Set');
		return void(0);
	};
	if(!float_val)
		float_val=document.getElementById('float').value;
	comp=1;
	for(var i=float_val; i > 0; i--)
	{
		comp=comp+'0'
	};
	if(!num)
		display.value=Math.round(eval(document.calc.display.value)*comp)/comp;
	else
		return Math.round(eval(num)*comp)/comp;
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

function convBase(base1,base2)
{
	display.value = eval("convert."+base1+base2+"(\""+display.value+"\")");
}

function convTemp(temp1,temp2)
{
	display.value = eval("temperature."+temp1+"."+temp2+"("+display.value+")");
}

function unitCheck()
{
	//Change the conversion lists based on the display
	
	//Base converter
	//Example: if there are chars that can't be converted such as there is a 2 then binary to whatever will be hidden
	var isBin,isDec,isHex,isOct;
	isBin=convert.isBin(display.value);
	isDec=convert.isDec(display.value);
	isHex=convert.isHex(display.value);
	isOct=convert.isOct(display.value);
	//for(var i=1;i<4;i++)
	//{
		document.getElementById("bin").style.display=(isBin)?"":"none";
		document.getElementById("dec").style.display=(isDec)?"":"none";
		document.getElementById("hex").style.display=(isHex)?"":"none";
		document.getElementById("oct").style.display=(isOct)?"":"none";
	//}
	document.getElementById("nooption1").style.display=(isBin||isDec||isHex||isOct)?"none":"";
	
	//Temp converter
	var isCon,isCel,isFah,isKel,isRan,isRea;
	try
	{
		var disp=eval(display.value);
		isCon=(checkNum()&&(convert.test(disp,/[0-9\-\.]/)))?1:0;
		isCel=(disp>=-273.15)?1:0;
		isFah=(disp>=-459.66999999999996)?1:0;
		isKel=(disp>=0)?1:0;
		isRan=(disp>=0)?1:0;
		isRea=(disp>=-218.51999999999998)?1:0;
	}
	catch(e)
	{
		isCon=false;
	}
	document.getElementById("celsius").style.display=(isCon&&isCel)?"":"none";
	document.getElementById("fahr").style.display=(isCon&&isFah)?"":"none";
	document.getElementById("kelvin").style.display=(isCon&&isKel)?"":"none";
	document.getElementById("rankine").style.display=(isCon&&isRan)?"":"none";
	document.getElementById("reaumur").style.display=(isCon&&isRea)?"":"none";
	document.getElementById("nooption2").style.display=(isCon&&isCel||isFah||isKel||isRan||isRea)?"none":"";
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