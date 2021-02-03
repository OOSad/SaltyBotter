// ==UserScript==
// @name        New script - saltybet.com
// @namespace   Violentmonkey Scripts
// @match       https://www.saltybet.com/
// @grant       none
// @version     1.0
// @author      -
// @description 2/2/2021, 6:37:21 PM
// ==/UserScript==


//window.addEventListener("load", function(){
  
let percentageNumberRegex = /[0-9][0-9]%/;
let strippedDownNumberRegex = /[0-9][0-9]/;
let percentageNumberRedTeam = 0;
let strippedDownNumberRedTeam = 0;
let percentageNumberBlueTeam = 0;
let strippedDownNumberBlueTeam = 0;
let cashAmount = 0;
let betAmount = 0;



window.addEventListener('load', function () {
  //alert("It's loaded!")
  
var intervalID = window.setInterval(myCallback, 30000);
  
  
  function myCallback()
{

  console.log(document.getElementById("bettors1").innerHTML);
  console.log(percentageNumberRegex.exec(document.getElementById("bettors1").innerHTML));
    
  percentageNumberRedTeam = percentageNumberRegex.exec(document.getElementById("bettors1").innerHTML);
  strippedDownNumberRedTeam = strippedDownNumberRegex.exec(percentageNumberRedTeam);
  console.log(strippedDownNumberRedTeam);
  
  console.log(document.getElementById("bettors2").innerHTML);
  console.log(percentageNumberRegex.exec(document.getElementById("bettors2").innerHTML));
  percentageNumberBlueTeam = percentageNumberRegex.exec(document.getElementById("bettors2").innerHTML);
  strippedDownNumberBlueTeam = strippedDownNumberRegex.exec(percentageNumberBlueTeam);
  console.log(strippedDownNumberBlueTeam);
    
  cashAmount = document.getElementById("balance").textContent;
  console.log(cashAmount);
  cashAmount = parseFloat(cashAmount.replace(/,/g, ''));
  console.log(cashAmount);
  betAmount = Math.round(0.01 * cashAmount);
  
    
  if (strippedDownNumberRedTeam > strippedDownNumberBlueTeam)
    {
       document.getElementById("wager").value = betAmount;
       document.getElementById("player1").click(); 
    }
  else if (strippedDownNumberRedTeam < strippedDownNumberBlueTeam)
    {
       document.getElementById("wager").value = betAmount;
       document.getElementById("player2").click(); 
    }
  else {}

}

})