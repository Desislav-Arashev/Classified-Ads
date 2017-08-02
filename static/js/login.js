var AnimationStep = 25; 
var AnimationInterval = 10; 
var LoginHeight = 240;
var c_step=0;

function ShowLogin() 
{
	var oDiv = document.getElementById("main-login-form");
		
	if (c_step < (LoginHeight / AnimationInterval))
	{
		oDiv.style.display = "block";
	 
		Animate(oDiv);
	}
	else
	{
		HideAnimate(oDiv);
	}
}

function HideLogin() 
{
	
	var oDiv = document.getElementById("main-login-form");
	HideAnimate(oDiv);
}

function HideAnimate(element) 
{
   
    if (c_step <= 0)
	{
		element.style.display = "none";
		return true;
	}
        
	
	c_step--;	
	
	element.style.clip="rect(0px 500px "+(c_step*AnimationStep)+"px 0px)";
	
    window.setTimeout(function() {
        HideAnimate(element);
    }, AnimationInterval);
    return false;
}


function Animate(element) 
{
   
    if (c_step >= (LoginHeight / AnimationInterval))
        return true;
	
	c_step++;	
	
	element.style.clip="rect(0px 500px "+(c_step*AnimationStep)+"px 0px)";
	
    window.setTimeout(function() {
        Animate(element);
    }, AnimationInterval);
    return false;
}
