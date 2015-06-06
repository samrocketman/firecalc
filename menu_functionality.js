/*********************************************\
*                                             *
*              Shared Menu Code               *
*                                             *
\*********************************************/

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
	if(className != "submenu" && className != "menuButton" && className != "menuItem" && className != "menuDisabled" && activeButton)
	{
		resetMenu();
		if(activeButton2)
			resetButton2(activeButton2);
	}
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

function buttonclick(i,button, menuName)
{
	// Blur focus from the link to remove that annoying outline.
	button.blur();

	// Associate the named menu to this button if not already done.
	if (!button.menu)
		button.menu = document.getElementById(menuName);

	// Reset the currently active button, if any.

	if (activeButton[i] && activeButton[i] != button)
		resetMenu(i);

	// Toggle the button's state.
	if (button.isDepressed)
		resetMenu(i);
	else
		depressButton(i,button);
	return false;
}

function resetButton(i,button)
{
	// Restore the button's style settings.
	if(button)
	{
		button.style.backgroundColor = button.old.backgroundColor;
		button.style.borderBottomColor = button.old.borderBottomColor;
		button.style.borderRightColor = button.old.borderRightColor;
		button.style.borderTopColor = button.old.borderTopColor;
		button.style.borderLeftColor = button.old.borderLeftColor;
		button.style.color = button.old.color;
		button.style.left = button.old.left;
		button.style.position = button.old.position;
		button.style.top = button.old.top;
	}

	// Hide the button's menu.
	if (button.menu)
		button.menu.style.visibility="hidden";

	// Set button state and clear active menu global.
	button.isDepressed=false;
	activeButton[i]="";
}

function buttonMouseover(i,button, menuName)
{
	unitCheck();
	// If any other button menu is active, deactivate it and activate this one.
	if(i>0)
	{
		if(!activeButton[i])
			buttonclick(i,button, menuName)
	}
	if (activeButton[i] && activeButton[i] != button)
	{
		resetMenu(i);
		if (menuName)
			buttonclick(i,button, menuName);
	}
}

function depressButton(i,button)
{
	// Save current style values so they can be restored later.
	// Only needs to be done once.

	if (!button.old)
	{
		button.old=new Object();
		button.old.backgroundColor = button.style.backgroundColor;
		button.old.borderBottomColor = button.style.borderBottomColor;
		button.old.borderRightColor = button.style.borderRightColor;
		button.old.borderTopColor = button.style.borderTopColor;
		button.old.borderLeftColor = button.style.borderLeftColor;
		button.old.color = button.style.color;
		button.old.left = button.style.left;
		button.old.position = button.style.position;
		button.old.top = button.style.top;
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
	if(i<1)
	{
		x=getPageOffsetLeft(button);
		y=getPageOffsetTop(button)+button.offsetHeight;
	}
	else
	{
		x=getPageOffsetLeft(button)+button.offsetWidth;
		y=getPageOffsetTop(button);
	}
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
	activeButton[i]=button;
}

function resetMenu(j)
{
	if(activeButton)
	{
		if(j>0)
		{
			for(var i=j;i<activeButton.length;i++)
			{
				if(activeButton[i])
					resetButton(i,activeButton[i]);
			}
		}
		else
		{
			for(var i=0;i<activeButton.length;i++)
			{
				if(activeButton[i])
					resetButton(i,activeButton[i]);
			}
		}
	}
	else
		return false;
}