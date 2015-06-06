/*********************************************\
*                                             *
*             Start of Menu Code              *
*                                             *
\*********************************************/

// Global variable for tracking the currently active button.
/*var activeButton;
var activeButton2;
var button2;*/

// Capture mouse clicks on the page so any active button can be deactivated.

document.onkeypress = pageMousedown;

if (msie)
	document.onmousedown = pageMousedown;
else
	document.addEventListener("mousedown", pageMousedown, true);

function pageMousedown(event)
{

	var className;
	
	// If the object clicked on was not a menu button or item, close any active menu.
	if (msie)
		className = window.event.srcElement.className;
	else
		className = (event.target.className)?event.target.className:event.target.parentNode.className;
	if(className != "menuButton" && className != "menuItem" && className != "menuDisabled" && activeButton)
	{
		resetButton(activeButton);
		if(activeButton2)
			resetButton2(activeButton2);
	}
}

function buttonclick(button, menuName)
{
	// Blur focus from the link to remove that annoying outline.
	button.blur();

	// Associate the named menu to this button if not already done.
	if (!button.menu)
		button.menu = document.getElementById(menuName);

	// Reset the currently active button, if any.

	if (activeButton&& activeButton != button)
		resetButton(activeButton);

	// Toggle the button's state.

	if (button.isDepressed)
		resetButton(button);
	else
		depressButton(button);
	return false;
}


function buttonMouseover(button, menuName)
{
	// If any other button menu is active, deactivate it and activate this one.
	// Note: if this button has no menu, leave the active menu alone.

	if (activeButton && activeButton != button)
	{
		resetButton(activeButton);
		if (menuName)
			buttonclick(button, menuName);
	}
}


function depressButton(button)
{
	// Save current style values so they can be restored later.
	// Only needs to be done once.

	if (!button.oldBackgroundColor)
	{
		button.oldBackgroundColor=button.style.backgroundColor;
		button.oldBorderBottomColor=button.style.borderBottomColor;
		button.oldBorderRightColor=button.style.borderRightColor;
		button.oldBorderTopColor=button.style.borderTopColor;
		button.oldBorderLeftColor=button.style.borderLeftColor;
		button.oldColor=button.style.color;
		button.oldLeft=button.style.left;
		button.oldPosition=button.style.position;
		button.oldTop=button.style.top;
	}

	// Change style value to make the button looks like it's
	// depressed.
	button.style.backgroundColor="#06C";
	button.style.borderLeftColor="#039";
	button.style.borderRightColor="#06F";
	button.style.borderTopColor="#039";
	button.style.borderBottomColor="#06F";
	button.style.color="#FFF";
	button.style.left="0px";
	button.style.position="relative";
	button.style.top="0px";

	// For IE, force first menu item to the width of the parent menu,
	// this causes mouseovers work for all items even when cursor is
	// not over the link text.

	/*if(msie&&!button.menu.firstChild.style.width)
		button.menu.firstChild.style.width=button.menu.offsetWidth+"px";// */

	// Position the associated drop down menu under the button and
	// show it. Note that the position must be adjusted according to
	// browser, styling and positioning.

	x=getPageOffsetLeft(button);
	y=getPageOffsetTop(button)+button.offsetHeight;
	if(msie)
		y+=2;
	if(netscape)
	{
		x--;
		y--;
	}
	button.menu.style.left=x+"px";
	button.menu.style.top=y+"px";
	button.menu.style.visibility="visible";

	// Set button state and let the world know which button is
	// active.

	button.isDepressed=true;
	activeButton=button;
}

function resetButton(button)
{
	// Restore the button's style settings.
	button.style.backgroundColor = button.oldBackgroundColor;
	button.style.borderBottomColor = button.oldBorderBottomColor;
	button.style.borderRightColor = button.oldBorderRightColor;
	button.style.borderTopColor = button.oldBorderTopColor;
	button.style.borderLeftColor = button.oldBorderLeftColor;
	button.style.color = button.oldColor;
	button.style.left = button.oldLeft;
	button.style.position = button.oldPosition;
	button.style.top = button.oldTop;

	// Hide the button's menu.
	if (button.menu)
		button.menu.style.visibility="hidden";

	// Set button state and clear active menu global.
	button.isDepressed=false;
	activeButton=null;
}



function getPageOffsetLeft(el)
{
	// Return the true x coordinate of an element relative to the page.
	return el.offsetLeft+(el.offsetParent?getPageOffsetLeft(el.offsetParent):0);
}

function getPageOffsetTop(el)
{
	// Return the true y coordinate of an element relative to the page.
	return el.offsetTop+(el.offsetParent?getPageOffsetTop(el.offsetParent):0);
}











/*********************************************\
*                                             *
*             Start SubMenu Code              *
*                                             *
\*********************************************/


function buttonclick2(button2, menuName2)
{
	// Blur focus from the link to remove that annoying outline.
	button2.blur();

	// Associate the named menu to this button if not already done.
	if (!button2.menu)
		button2.menu = document.getElementById(menuName2);

	// Reset the currently active button, if any.
	if (activeButton2 && activeButton2 != button2)
		resetButton2(activeButton2);

	// Toggle the button's state.
	if (button2.isDepressed)
		resetButton2(button2);
	else
		depressButton2(button2);
	return false;
}

function buttonMouseover2(button2, menuName2)
{
	// If any other button menu is active, deactivate it and activate this one.
	// Note: if this button has no menu, leave the active menu alone.
	resetButton2(activeButton2);
}


function depressButton2(button2)
{

	// Save current style values so they can be restored later.
	// Only needs to be done once.

	if (!button2.oldBackgroundColor)
	{
		button2.oldBackgroundColor=button2.style.backgroundColor;
		button2.oldBorderBottomColor=button2.style.borderBottomColor;
		button2.oldBorderRightColor=button2.style.borderRightColor;
		button2.oldBorderTopColor=button2.style.borderTopColor;
		button2.oldBorderLeftColor=button2.style.borderLeftColor;
		button2.oldColor=button2.style.color;
		button2.oldLeft=button2.style.left;
		button2.oldPosition=button2.style.position;
		button2.oldTop=button2.style.top;
	}

	// Change style value to make the button looks like it's
	// depressed.

	button2.style.backgroundColor="#06C";
	button2.style.borderLeftColor="#039";
	button2.style.borderRightColor="#06F";
	button2.style.borderTopColor="#039";
	button2.style.borderBottomColor="#06F";
	button2.style.color="#FFF";
	button2.style.left="0px";
	button2.style.position="relative";
	button2.style.top="0px";

	// For IE, force first menu item to the width of the parent menu,
	// this causes mouseovers work for all items even when cursor is
	// not over the link text.

	/*if(msie&&!button2.menu.firstChild.style.width)
		button2.menu.firstChild.style.width=button2.menu.offsetWidth+"px";*/

	// Position the associated drop down menu under the button and
	// show it. Note that the position must be adjusted according to
	// browser, styling and positioning.

	x=getPageOffsetLeft(button2)+button2.offsetWidth;
	y=getPageOffsetTop(button2);
	if(msie)
		y+=2;
	if(netscape)
	{
		x--;
		y--;
	}
	button2.menu.style.left=x+"px";
	button2.menu.style.top=y+"px";
	button2.menu.style.visibility="visible";

	// Set button state and let the world know which button is active.
	button2.isDepressed=true;
	activeButton2=button2;
}

function resetButton2(button2)
{
	if(button2)
	{
		// Restore the button's style settings.
		button2.style.backgroundColor=button2.oldBackgroundColor;
		button2.style.borderBottomColor=button2.oldBorderBottomColor;
		button2.style.borderRightColor=button2.oldBorderRightColor;
		button2.style.borderTopColor=button2.oldBorderTopColor;
		button2.style.borderLeftColor=button2.oldBorderLeftColor;
		button2.style.color=button2.oldColor;
		button2.style.left=button2.oldLeft;
		button2.style.position=button2.oldPosition;
		button2.style.top=button2.oldTop;

		// Hide the button's menu.
		if(button2.menu)
		button2.menu.style.visibility="hidden";

		// Set button state and clear active menu global.
		button2.isDepressed=false;
		activeButton2=null;
	}
}

/*********************************************\
*                                             *
*                IE Only Code                 *
*                                             *
\*********************************************/