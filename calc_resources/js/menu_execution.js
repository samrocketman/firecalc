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
	if(checkbox.checked)
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
	window.focus();
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

function toggle_keys()
{
	var checkbox=document.getElementById('radio3');
	//toggle the checkbox
	checkbox.checked=!checkbox.checked;

	//enable/disable the display
	if(!checkbox.checked)
		enableKeys=false;
	else
		enableKeys=true;
	window.focus();
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
	for(var i=1;i<4;i++)
	{
		document.getElementById("bin"+i).style.display=(isBin)?"":"none";
		document.getElementById("dec"+i).style.display=(isDec)?"":"none";
		document.getElementById("hex"+i).style.display=(isHex)?"":"none";
		document.getElementById("oct"+i).style.display=(isOct)?"":"none";
	}
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