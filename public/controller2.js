//CONTROLLER PAGE JS
document.addEventListener('gesturestart', function (e) 
{
    e.preventDefault();
});

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

var portrait=false;

var changedToPortraitFromLandscape=false;

var isAppMode=window.navigator.standalone;

var playerName="";
var username="";

var socket = io
({
	transports: ['websocket']
});


function Flash()
{
	document.getElementById('flash').style.opacity=1;

	setTimeout(function() 
    {
		document.getElementById('flash').style.opacity=0;
	}, 100);
}

function Reset()
{
	window.location='';
}

var layout=0;

function ResetLayout()
{
	layout++;

	if(layout==122)
	{
		document.getElementById("reset_button").style.right="250px";

		document.getElementById("boost_button").style.right="180px";
		document.getElementById("acc_button").style.left="180px";
		document.getElementById("rev_button").style.left="180px";
	}

	if(layout==22)
	{
		document.getElementById("reset_button").style.right="250px";

		document.getElementById("boost_button").style.right="180px";
		document.getElementById("acc_button").style.left="180px";
		document.getElementById("rev_button").style.left="180px";

		document.getElementById("acc_button").style.transform = "rotate(90deg)";
		document.getElementById("rev_button").style.transform = "rotate(-270deg)";

		document.getElementById("left_button").style.transform = "rotate(90deg)";
		document.getElementById("right_button").style.transform = "rotate(-270deg)";

	}


	if(layout==1)
	{
		document.getElementById("reset_button").style.right="250px";

		document.getElementById("boost_button").style.right="180px";
		document.getElementById("acc_button").style.left="180px";
		document.getElementById("rev_button").style.left="180px";

		document.getElementById("acc_button").style.transform = "rotate(90deg)";
		document.getElementById("rev_button").style.transform = "rotate(-270deg)";

		document.getElementById("left_button").style.transform = "rotate(90deg)";
		document.getElementById("right_button").style.transform = "rotate(-270deg)";

		document.getElementById("left_button").style.left = "170px";
		document.getElementById("right_button").style.right = "170px";
	}
	

	if(layout>1)
	{

		document.getElementById("left_button").style.left = "10px";
		document.getElementById("right_button").style.right = "10px";

		document.getElementById("acc_button").style.transform = "rotate(0deg)";
		document.getElementById("rev_button").style.transform = "rotate(0deg)";
		document.getElementById("left_button").style.transform = "rotate(0deg)";
		document.getElementById("right_button").style.transform = "rotate(0deg)";

		document.getElementById("boost_button").style.right="10px";
		document.getElementById("reset_button").style.right="70px";
		document.getElementById("acc_button").style.left="10px";
		document.getElementById("rev_button").style.left="10px";
		layout=0;
	}
}

function SelectCar(carName)
{	
	username = carName;
	socket.emit('add user', carName);

	$('#loginPage').hide()
	$('#playPage').show()

	socket.emit('enterGame', { user: playerName, direction: playerName });
}

function Start()
{
	if(document.getElementById('name_input').value=="")
	{
		alert("Please enter in your name!");
		return;
	}
	
	document.getElementById('landing_page').style.display="none";

	//localStorage.setItem("userNaam",document.getElementById('name_input').value);

	playerName = document.getElementById('name_input').value;

	socket.emit('add user', playerName);

	$('#loginPage').hide()
	$('#playPage').show()

	document.getElementById('top_section').innerHTML=playerName+"<br> Score: 0";

}

var cur_answer="";

var readyToAnswer=true;

$(document).ready(function() 
{
	window.scrollTo(0,1);

	var naam = localStorage.getItem("userNaam");

	if(naam!=null)
	{
		document.getElementById('name_input').value = naam;
	}

	socket.emit('openPage',"wut");

	socket.on('client set Q', (data) => 
	{
		var userData = JSON.parse(data);

		if(userData.score == "END")
		{
			document.getElementById("mainQ").innerHTML = "QUIZ OVER! LOOK ON SCREEN TO SEE SCORES!!";

			document.getElementById("buttonA").innerHTML = "";
			document.getElementById("buttonB").innerHTML = "";
			document.getElementById("buttonC").innerHTML = "";
			document.getElementById("buttonD").innerHTML = "";
			
			document.getElementById("butt_holder").style.display="none";
			readyToAnswer=false;
			return;
		}
		else
		{
			document.getElementById("butt_holder").style.display="block";

			var res = userData.score.split("~");

			document.getElementById("mainQ").innerHTML = res[0];

			document.getElementById("buttonA").innerHTML = res[1];
			document.getElementById("buttonB").innerHTML = res[2];
			document.getElementById("buttonC").innerHTML = res[3];
			document.getElementById("buttonD").innerHTML = res[4];

			cur_answer = res[5];

			document.getElementById("buttonA").style.opacity="1.0";
			document.getElementById("buttonB").style.opacity="1.0";
			document.getElementById("buttonC").style.opacity="1.0";
			document.getElementById("buttonD").style.opacity="1.0";

			readyToAnswer=true;
		}
	});

	socket.on('client set score', (data) => 
	{
		var userData = JSON.parse(data);

		//alert(userData.score);

		document.getElementById('top_section').innerHTML=playerName+"<br> Score: "+userData.score;
	});

	socket.on('user left', (data) => 
	{
		var userData = JSON.parse(data);	

		if(userData.username === username)
		{
			$.get( "https://mustardinteractive.co.za/MTN_wheels/api/update_score.php?username="+playerName+"&score="+userData.score, function( data ) {});
		}

		if(userData.username === "1")
		{
			document.getElementById("car_1").style.opacity="1.0";
			document.getElementById('car_1').onclick = function() { SelectCar('1') };
		}

		if(userData.username === "2")
		{
			document.getElementById("car_2").style.opacity="1.0";
			document.getElementById('car_2').onclick = function() { SelectCar('2') };
		}

		if(userData.username === "3")
		{
			document.getElementById("car_3").style.opacity="1.0";
			document.getElementById('car_3').onclick = function() { SelectCar('3') };
		}

		if(userData.username === "4")
		{
			document.getElementById("car_4").style.opacity="1.0";
			document.getElementById('car_4').onclick = function() { SelectCar('4') };
		}

		if(userData.username === "5")
		{
			document.getElementById("car_5").style.opacity="1.0";
			document.getElementById('car_5').onclick = function() { SelectCar('5') };
		}

		if(userData.username === "6")
		{
			document.getElementById("car_6").style.opacity="1.0";
			document.getElementById('car_6').onclick = function() { SelectCar('6') };
		}

		if(userData.username === "7")
		{
			document.getElementById("car_7").style.opacity="1.0";
			document.getElementById('car_7').onclick = function() { SelectCar('7') };
		}

		if(userData.username === "8")
		{
			document.getElementById("car_8").style.opacity="1.0";
			document.getElementById('car_8').onclick = function() { SelectCar('8') };
		}
	});

	socket.on('client get powerup', (data) => 
	{
		var userData = JSON.parse(data);

		if(userData.username === username)
		{
			if(userData.score=="EMP")
				document.getElementById("boostIMG").src="art/emp.png";

			if(userData.score=="SHIELD")
				document.getElementById("boostIMG").src="art/shield.png";

			if(userData.score=="REPAIR")
				document.getElementById("boostIMG").src="art/repair.png";

			if(userData.score=="SWITCH")
				document.getElementById("boostIMG").src="art/switch.png";
		}
		
	});

	socket.on('client set color', (data) => 
	{
		var userData = JSON.parse(data);
		
		//PERFORM ONLY FOR SPECIFIED PLAYER [CHANGE PLAYERS CONTROLLER COLOR]
		if(userData.username === username)
		{//<---- User specific check

			var hex="";

			if(userData.username === "1")
			{
					hex="#036987";
			}

			if(userData.username === "2")
			{
					hex="#F4F4F2";
			}

			if(userData.username === "3")
			{
					hex="#4BC0ED";
			}

			if(userData.username === "4")
			{
					hex="#F57E20";
			}

			if(userData.username === "5")
			{
					hex="#E4256E";
			}

			if(userData.username === "6")
			{
					hex="#663F5C";
			}

			if(userData.username === "7")
			{
					hex="#FFCB0A";
			}

			if(userData.username === "8")
			{
					hex="#87B08C";
			}

			document.getElementById("boost_button").style.backgroundColor=hex;
			document.getElementById("reset_button").style.backgroundColor=hex;
			document.getElementById("right_button").style.backgroundColor=hex;
			document.getElementById("left_button").style.backgroundColor=hex;
			document.getElementById("acc_button").style.backgroundColor=hex;
			document.getElementById("rev_button").style.backgroundColor=hex;

		}//<---- End user specific check

		//PERFORM FOR ALL PLAYERS(DISABLE CAR THAT JUST ENTERED GAME SO OTHER PLAYERS CANNOT USE IT - NO DUPLICATE CARS)

		if(userData.username === "1")
		{
				document.getElementById("car_1").style.opacity="0.4";
				document.getElementById('car_1').removeAttribute("onclick");
		}

		if(userData.username === "2")
		{
				document.getElementById("car_2").style.opacity="0.4";
				document.getElementById('car_2').removeAttribute("onclick");
		}

		if(userData.username === "3")
		{
				document.getElementById("car_3").style.opacity="0.4";
				document.getElementById('car_3').removeAttribute("onclick");
		}

		if(userData.username === "4")
		{
				document.getElementById("car_4").style.opacity="0.4";
				document.getElementById('car_4').removeAttribute("onclick");
		}

		if(userData.username === "5")
		{
				document.getElementById("car_5").style.opacity="0.4";
				document.getElementById('car_5').removeAttribute("onclick");
		}

		if(userData.username === "6")
		{
				document.getElementById("car_6").style.opacity="0.4";
				document.getElementById('car_6').removeAttribute("onclick");
		}

		if(userData.username === "7")
		{
				document.getElementById("car_7").style.opacity="0.4";
				document.getElementById('car_7').removeAttribute("onclick");
		}

		if(userData.username === "8")
		{
				document.getElementById("car_8").style.opacity="0.4";
				document.getElementById('car_8').removeAttribute("onclick");
		}

	});


    $('#buttonA').on('click', function()
	{
		if(readyToAnswer==true)
		{
			socket.emit('action', { user: username, direction: 'A' });  CheckAnswer("A");
			readyToAnswer=false;
		}
	});

	$('#buttonB').on('click', function()
	{
		if(readyToAnswer==true)
		{
			socket.emit('action', { user: username, direction: 'B' });  CheckAnswer("B"); 
			readyToAnswer=false;
		}
	});

	$('#buttonC').on('click', function()
	{
		if(readyToAnswer==true)
		{	
			socket.emit('action', { user: username, direction: 'C' });  CheckAnswer("C");
			readyToAnswer=false;
		}
	});

	$('#buttonD').on('click', function()
	{
		if(readyToAnswer==true)
		{
			socket.emit('action', { user: username, direction: 'D' }); CheckAnswer("D");
			readyToAnswer=false;
		}
	});

	function CheckAnswer(value)
	{
		if(value==cur_answer)
		{
			document.getElementById("mainQ").innerHTML = "CORRECT!!!"
		}
		else
		{
			document.getElementById("mainQ").innerHTML = "WRONG!!!"
		}

		if(cur_answer=="A")
		{
			document.getElementById("buttonA").style.opacity="1.0";
			document.getElementById("buttonB").style.opacity="0.2";
			document.getElementById("buttonC").style.opacity="0.2";
			document.getElementById("buttonD").style.opacity="0.2";
		}

		if(cur_answer=="B")
		{
			document.getElementById("buttonA").style.opacity="0.2";
			document.getElementById("buttonB").style.opacity="1.0";
			document.getElementById("buttonC").style.opacity="0.2";
			document.getElementById("buttonD").style.opacity="0.2";
		}

		if(cur_answer=="C")
		{
			document.getElementById("buttonA").style.opacity="0.2";
			document.getElementById("buttonB").style.opacity="0.2";
			document.getElementById("buttonC").style.opacity="1.0";
			document.getElementById("buttonD").style.opacity="0.2";
		}

		if(cur_answer=="D")
		{
			document.getElementById("buttonA").style.opacity="0.2";
			document.getElementById("buttonB").style.opacity="0.2";
			document.getElementById("buttonC").style.opacity="0.2";
			document.getElementById("buttonD").style.opacity="1.0";
		}
	}

	var lastTouchEnd = 0;
	document.addEventListener('touchend', function (event) 
	{
	
		var now = (new Date()).getTime();
		
		if (now - lastTouchEnd <= 300) 
		{
			event.preventDefault();
		}
		lastTouchEnd = now;
	
	}, 
	false);

});
