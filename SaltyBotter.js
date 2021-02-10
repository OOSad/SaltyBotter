// ==UserScript==
// @name        SaltyBotter - saltybet.com
// @namespace   Violentmonkey Scripts
// @match       https://www.saltybet.com/
// @grant       none
// @version     1.5
// @author      OSad
// @description 2/2/2021, 6:37:21 PM
// ==/UserScript==


window.addEventListener('load', function() {
  
    document.getElementsByClassName("navbar-text")[0].remove();
    document.getElementById("chat-wrapper").remove();
    //document.getElementById("balancewrapper").style.visibility = "hidden"; 
    //document.getElementById("lastbet").style.visibility = "hidden";
    document.getElementById("footer-alert").style.color = "white";
    document.getElementById("footer-alert").style.fontSize = "x-large";
    document.getElementById("footer-alert").style.margin = "-20px 0px 0px 0px";
  
    let percentNumberRedTeam = 0;
    let percentNumberBlueTeam = 0;
    let strippedDownNumberRedTeam = 0;
    let strippedDownNumberBlueTeam = 0;
  
    let cashAmount = 0;
    let wagerAmount = 0;
  
    const loopTimer = window.setInterval(EndlessBettingLoop, 30000);


    function EndlessBettingLoop() {
      
            document.getElementsByClassName("alerttext")[0].style.display = "none";
      
      
            ClearTheDebugConsole();
            PrintToTheDebugConsole("Normal match detected! Betting on the favorite!");
            PrintToTheDebugConsole(document.getElementById("footer-alert").textContent);
      
      
            percentNumberRedTeam = GetWinrate("bettors1");
            percentNumberBlueTeam = GetWinrate("bettors2");
      
            strippedDownNumberRedTeam = StripPercentSymbolFromWinrateNumber(percentNumberRedTeam);
            strippedDownNumberBlueTeam = StripPercentSymbolFromWinrateNumber(percentNumberBlueTeam);

            cashAmount = GetCash("balance");
            wagerAmount = CalculateWager(cashAmount);
            TypeInWager(wagerAmount);

      
            if (strippedDownNumberRedTeam > strippedDownNumberBlueTeam) {
              
              ConfirmWager("player1");

            } 
          
              
            else if (strippedDownNumberRedTeam < strippedDownNumberBlueTeam) {
              
              ConfirmWager("player2");
              
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
    let cashAmount = document.getElementById(idToGetCashFrom).textContent;
    cashAmount = parseFloat(cashAmount.replace(/,/g, ''));
    return cashAmount;
  }
  
function CalculateWager(totalCashAmount)
  {
    return Math.round(0.01 * cashAmount);
  }
  
function TypeInWager(wagerForTheRound)
  {
    document.getElementById("wager").value = wagerForTheRound;
  }
  
function ConfirmWager(onWhoYouAreBettingOn)
  {
    document.getElementById(onWhoYouAreBettingOn).click();
  }
  
  
})

