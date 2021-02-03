// ==UserScript==
// @name        SaltyBotter - saltybet.com
// @namespace   Violentmonkey Scripts
// @match       https://www.saltybet.com/
// @grant       none
// @version     1.1
// @author      OSad
// @description 2/2/2021, 6:37:21 PM
// ==/UserScript==


let percentageNumberRegex = /[0-9][0-9]%/;
let strippedDownNumberRegex = /[0-9][0-9]/;
let exhibitionGameModeRegex = /exhibition/;
let percentageNumberRedTeam = 0;
let strippedDownNumberRedTeam = 0;
let percentageNumberBlueTeam = 0;
let strippedDownNumberBlueTeam = 0;
let cashAmount = 0;
let betAmount = 0;



window.addEventListener('load', function() {
    //alert("It's loaded!")

    var intervalID = window.setInterval(myCallback, 30000);


    function myCallback() {


        if (exhibitionGameModeRegex.test(document.getElementById("footer-alert").textContent) === true) 
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
      
      
        else 
        
          {
            console.clear();
            console.log("Normal matches detected! Betting on the underdog.");

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
                document.getElementById("player2").click();

            } 
          
            else if (strippedDownNumberRedTeam < strippedDownNumberBlueTeam) 
            {
              
                document.getElementById("wager").value = betAmount;
                document.getElementById("player1").click();

            } 
          
            else {}
        }

    }

})