// ==UserScript==
// @name        SaltyBotter - saltybet.com
// @namespace   Violentmonkey Scripts
// @match       https://www.saltybet.com/
// @grant       none
// @version     1.2
// @author      OSad
// @description 2/2/2021, 6:37:21 PM
// ==/UserScript==


let percentageNumberRegex = /[0-9][0-9]%/;
let strippedDownNumberRegex = /[0-9][0-9]/;
let exhibitionGameModeRegex = /exhibition/;
let tournamentGameModeStartRegex = /Tournament mode start!/;
let tournamentGameModeRegexPlural = /[0-9][0-9] characters are left in the bracket!/;
let tournamentGameModeRegexSingular = /[0-9] characters are left in the bracket!/;
let percentageNumberRedTeam = 0;
let strippedDownNumberRedTeam = 0;
let percentageNumberBlueTeam = 0;
let strippedDownNumberBlueTeam = 0;
let cashAmount = 0;
let betAmount = 0;


window.addEventListener('load', function() {
    //alert("It's loaded!")
  
    document.getElementsByClassName("navbar-text")[0].remove();
    document.getElementById("chat-wrapper").remove();
    document.getElementById("stream").remove();
    document.getElementById("balancewrapper").style.visibility = "hidden"; 
    document.getElementById("lastbet").style.visibility = "hidden";
    document.getElementById("footer-alert").style.color = "white";
    document.getElementById("footer-alert").style.fontSize = "x-large";
    document.getElementById("footer-alert").style.margin = "-165px 0px 0px 0px";
    
  
    var intervalID = window.setInterval(myCallback, 5000);


    function myCallback() {
      
            document.getElementsByClassName("alerttext")[0].style.display = "none";


      
            console.clear();
      
            console.log("Normal match detected! Betting on the favorite!");
            console.log(document.getElementById("footer-alert").textContent);
            percentageNumberRedTeam = percentageNumberRegex.exec(document.getElementById("bettors1").innerHTML);
            strippedDownNumberRedTeam = strippedDownNumberRegex.exec(percentageNumberRedTeam);

            percentageNumberBlueTeam = percentageNumberRegex.exec(document.getElementById("bettors2").innerHTML);
            strippedDownNumberBlueTeam = strippedDownNumberRegex.exec(percentageNumberBlueTeam);

            cashAmount = document.getElementById("balance").textContent;
            cashAmount = parseFloat(cashAmount.replace(/,/g, ''));
            betAmount = Math.round(0.01 * cashAmount);


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

            
      
            
      
      //The following block of code was intended to differentiate between bets in Exhibition game mode and every other game mode.
      //After some observation, differentiating between bets turned out to be kind of a dumb idea and it's better to just vote for the character most likely to win every time.


        /*if (exhibitionGameModeRegex.test(document.getElementById("footer-alert").textContent) === true) 
        {
            
            console.clear();
            console.log("Exhibs detected! Betting on the favorite!");


            percentageNumberRedTeam = percentageNumberRegex.exec(document.getElementById("bettors1").innerHTML);
            strippedDownNumberRedTeam = strippedDownNumberRegex.exec(percentageNumberRedTeam);

            percentageNumberBlueTeam = percentageNumberRegex.exec(document.getElementById("bettors2").innerHTML);
            strippedDownNumberBlueTeam = strippedDownNumberRegex.exec(percentageNumberBlueTeam);

            cashAmount = document.getElementById("balance").textContent;
            cashAmount = parseFloat(cashAmount.replace(/,/g, ''));
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
      
      
        else  { }*/

    

})

