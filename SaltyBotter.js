// ==UserScript==
// @name        SaltyBotter - saltybet.com
// @namespace   Violentmonkey Scripts
// @match       https://www.saltybet.com/
// @grant       none
// @version     1.3
// @author      OSad
// ==UserScript==
// @name        SaltyBotter - saltybet.com
// @namespace   Violentmonkey Scripts
// @match       https://www.saltybet.com/
// @grant       none
// @version     1.4
// @author      OSad
// @description 2/2/2021, 6:37:21 PM
// ==/UserScript==


let percentNumberRedTeam = 0;
let strippedDownNumberRedTeam = 0;
let percentNumberBlueTeam = 0;
let strippedDownNumberBlueTeam = 0;
let cashAmount = 0;
let betAmount = 0;



window.addEventListener('load', function() {
  
    document.getElementsByClassName("navbar-text")[0].remove();
    document.getElementById("chat-wrapper").remove();
    //document.getElementById("stream").remove();
    //document.getElementById("balancewrapper").style.visibility = "hidden"; 
    //document.getElementById("lastbet").style.visibility = "hidden";
    document.getElementById("footer-alert").style.color = "white";
    document.getElementById("footer-alert").style.fontSize = "x-large";
    document.getElementById("footer-alert").style.margin = "-20px 0px 0px 0px";
  
  
    var intervalID = window.setInterval(myCallback, 30000);


    function myCallback() {
      
            document.getElementsByClassName("alerttext")[0].style.display = "none";
      
            ClearTheDebugConsole();
      
            PrintToTheDebugConsole("Normal match detected! Betting on the favorite!");
            PrintToTheDebugConsole(document.getElementById("footer-alert").textContent);
      
            percentNumberRedTeam = GetWinrate("bettors1");
            strippedDownNumberRedTeam = StripPercentSymbolFromWinrateNumber(percentNumberRedTeam)

            percentNumberBlueTeam = GetWinrate("bettors2");
            strippedDownNumberBlueTeam = StripPercentSymbolFromWinrateNumber(percentNumberBlueTeam);

            cashAmount = document.getElementById("balance").textContent;
            cashAmount = parseFloat(cashAmount.replace(/,/g, ''));
            betAmount = CalculateWager(cashAmount);


            if (strippedDownNumberRedTeam > strippedDownNumberBlueTeam) {
              
              document.getElementById("wager").value = betAmount;
              document.getElementById("player1").click();

            } 
          
              
            else if (strippedDownNumberRedTeam < strippedDownNumberBlueTeam) {
              
                document.getElementById("wager").value = betAmount;
                document.getElementById("player2").click();

            } 
          
            else {}

                
          }

          
function ClearTheDebugConsole()
  {
    console.clear();
  }
  
function PrintToTheDebugConsole(stringToPrint)
  {
    return console.log(stringToPrint);
  }
  
function GetWinrate(idToGetNumberFrom)
  {
    let percentageNumberRegex = /[0-9][0-9]%/;
    return percentageNumberRegex.exec(document.getElementById(idToGetNumberFrom).innerHTML);
  }

function StripPercentSymbolFromWinrateNumber(winrateWithPercentageSymbol)
  {
    let strippedDownNumberRegex = /[0-9][0-9]/;
    return strippedDownNumberRegex.exec(winrateWithPercentageSymbol);
  }
  
function GetCash(idToGetCashFrom)
  {
    document.getElementById(idToGetCashFrom).textContent;
    return parseFloat(idToGetCashFrom.replace(/,/g, ''));
  }
  
function CalculateWager(totalCashAmount)
  {
    return Math.round(0.005 * cashAmount);
  }

})

