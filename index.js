window.addEventListener("load", savedStock);

//declaration of everything to make it easily accessible
const pledges = document.querySelectorAll(".enter-pledge");
const inputs = document.querySelectorAll("input");
const stocksLeft = document.querySelectorAll(".main-stock");
const pledgePageStock = document.querySelectorAll(".pledge-stock");
const loadProject = document.getElementById("back-project");
const bodyContent = document.querySelector(".body-content");
const header = document.querySelector(".header");
const selected = document.querySelector(".selected");
const pledgeSuccess = document.querySelector(".pledge-success");
const buttonSelectReward = document.querySelectorAll(".btn-select");
const selectPledgeBtnDiv = document.querySelectorAll(".enter-pledge");
const titleDiv = document.getElementsByClassName("web-name");
const close = document.querySelector(".close-btn");
const successBtn = document.getElementById("sucess-btn");

const pledgeTotalDiv = document.getElementById('pledge-total');
const getPledgeValue = document.getElementById('pledge-valueT'); //pledge value total in raw form(as a string)
const pledgeTotal = parseInt(getPledgeValue.innerText); //pledge total in int form

const backerTotalDiv = document.getElementById('backer-total');
const getBackerValue = document.getElementById('backer-valueT')
const backerTotal = parseInt(getBackerValue.innerText);

const daysLeftDiv = document.getElementById('days-left');
const getdaysLeftValue = document.getElementById('days-valueT')
const daysLeft = parseInt(getdaysLeftValue.innerText);

const progressBar = document.querySelector("progress");

const progressValue = document.querySelectorAll('progress').value
const pledge0 = document.getElementById("continue-$0");
const pledge25 = document.getElementById("continue-$25");
const pledge75 = document.getElementById("continue-$75");
const pledge200 = document.getElementById("continue-$200");

const continuePledges = document.getElementsByName("continue");

function savedStock() {
    if (localStorage.getItem("Bamboo-Stock") == null) {
        localStorage.setItem("Bamboo-Stock", "5");
        stocksLeft[0].innerText = parseInt(localStorage.getItem("Bamboo-Stock"));
        pledgePageStock[0].innerText = (stocksLeft[0].innerText);
    } else {
        stocksLeft[0].innerText = parseInt(localStorage.getItem("Bamboo-Stock"));
        pledgePageStock[0].innerText = (stocksLeft[0].innerText);
    }

    if (localStorage.getItem("Black-Edition-Stock") == null) {
        localStorage.setItem("Black-Edition-Stock", "4");
        stocksLeft[1].innerText = parseInt(localStorage.getItem("Black-Edition-Stock"));
        pledgePageStock[1].innerText = (stocksLeft[1].innerText);
    } else {
        stocksLeft[1].innerText = parseInt(localStorage.getItem("Black-Edition-Stock"));
        pledgePageStock[1].innerText = (stocksLeft[1].innerText);
    }

    if (localStorage.getItem("Mahogany-Stock") == null) {
        localStorage.setItem("Mahogany-Stock", "3");
        stocksLeft[2].innerText = parseInt(localStorage.getItem("Mahogany-Stock"));
        pledgePageStock[2].innerText = (stocksLeft[2].innerText);
    } else {
        stocksLeft[2].innerText = parseInt(localStorage.getItem("Mahogany-Stock"));
        pledgePageStock[2].innerText = (stocksLeft[2].innerText);
    }

    if (localStorage.getItem("Total Pleople pledged") == null) {
        localStorage.setItem("Total People pledged", backerTotal);
    }

    if (localStorage.getItem("Total Amount Pledged") == null) {
        localStorage.setItem("Total Amount Pledged", pledgeTotal);
    }
    changeRwrdDiv();
    changePldgeDiv();
}

function changeRwrdDiv() { //disables the reward div if stock left is 0
    stocksLeft.forEach(stock => {
        stockValue = parseInt(stock.innerText);
        if (stockValue == 0) {
            var changeBtnText;
            changeBtnText = stock.parentNode.nextElementSibling;
            changeBtnText.firstElementChild.text = "Out of Stock";
            stock.parentNode.parentElement.parentNode.style = "background-color:white; filter:brightness(0.6); pointer-events:none;";
        }
    })
}

function changePldgeDiv() { //disable the pledge div if stock left is 0
    pledgePageStock.forEach(pledge => {
        if (parseInt(pledge.innerText) == 0) {
            pledge.parentElement.parentElement.parentElement.previousElementSibling.checked = false;
            pledge.parentElement.parentElement.parentElement.parentElement.style = "background-color:white; filter:brightness(0.6); pointer-events:none;";
        }
    })
}

window.addEventListener("load", () => {
    document.addEventListener("load", changePldgeDiv) //checks whether there is stock left to select pledge
    document.addEventListener("load", changeRwrdDiv) //checks whether there is stock left to select reward
})

//keeps track of when the webpage content was last motified;
console.log("Content modified last on " + bodyContent.ownerDocument.lastModified);
var stockValue;

//window.addEventListener("load", () => {
//    buttonSelectReward.forEach(rewardBtn => {
//        rewardBtn.style = "pointer-events:none;background-color:orange"
//    })
//})



//when the "Back this Project" button is clicked
loadProject.addEventListener("click", () => {
    bodyContent.style = "filter:brightness(0.5);transition:all 0.2s ease-out; pointer-events: none"
    header.style = "filter:brightness(0.5);transition:all 0.2s ease-out; pointer-events: none"
    selected.style = "visibility:visible; transition:all 0.2s ease-in; z-index:5;"
});

//section to bookmark page when "Bookmark" is clicked
var bookmarkTitle = "Frontend Mentor | Crowdfunding product page";
var bookmarkUrl = "file:///C:/Users/DELL/Desktop/html_js%20practise/crowdfunding-product-page-main/Project/index.html#";
const btnBookmark = document.getElementById('bookmark');
btnBookmark.addEventListener('click', () => {
    btnBookmark.style = "background-color:#F5F5F5;";
    btnBookmark.querySelector('p').innerText = "Bookmarked";

    if (window.sidebar) { //mozilla firefox bookmark
        window.sidebar.addPanel(bookmarkTitle, bookmarkUrl, "");
    } else if (window.external || document.all) { //IE favourite tab
        window.external.AddFavourite(bookmarkUrl, bookmarkTitle);
    } else {
        alert('Your browser does not support this bookmark action');
        return false;
    }
})


//section for when the "X" button is clicked to close the "Back this project" section
close.addEventListener("click", () => {
    selected.style = "visibility:hidden; transition:all 0.2s ease-in-out;"
    bodyContent.style = "opacity:100%; transition:all 0.25s ease-in;"
    header.style = "opacity:100%; transition:all 0.25s ease-in;"

    inputs.forEach(input => {
        if (input.checked == true) {
            input.checked = false;
            pledges.forEach(pledgeDiv => {
                pledgeDiv.style = "display:none;"
            })
        }
        input.parentNode.style = "border:1px solid black";
    })
});



//set onclick event attribute with function for all radio button inputs
inputs.forEach(input => {
    input.setAttribute("onclick", "changeBorder()")
})

//change border color for selected radio option	and also display the continue button
function changeBorder() {
    //no-reward pledge
    if (inputs[0].checked == true) {
        inputs[0].parentNode.style = "border:1px solid hsl(176, 50%, 47%)"
        pledges[0].style = "display:initial; padding-bottom:21px; padding-top:33px; transition:all 0.2s ease-in;"
        continuePledges[0].addEventListener("click", () => {
            pledges[0].style = "display:none; transition:all 0.1s ease-out;"
            selectPledgeBtnDiv.style = "visibility:hidden";
        })
    } else {
        inputs[0].parentNode.style = "border:1px solid gray; padding-bottom:0px;"
        pledges[0].style = "display:none; transition:all 0.1s ease-out;"
    }
    //bamboo pledge
    if (parseInt(pledgePageStock[0].innerText) != 0) {
        if (inputs[1].checked == true) {
            inputs[1].parentNode.style = "border:1px solid hsl(176, 50%, 47%)"
            pledges[1].style = "display:initial; padding-bottom:21px; padding-top:33px; transition:all 0.2s ease-in;"
            continuePledges[1].addEventListener("click", () => {
                pledges[1].style = "display:none; transition:all 0.1s ease-out;"
                selectPledgeBtnDiv.style = "visibility:hidden";
            })
        } else {
            inputs[1].parentNode.style = "border:1px solid gray; padding-bottom:0px;"
            pledges[1].style = "display:none; transition:all 0.1s ease-out;"
        }
    } else {
        inputs[1].parentElement.style = "background-color:white; filter:brightness(0.6); pointer-events:none;";
    }

    //black-edition pledge
    if (parseInt(pledgePageStock[1].innerText) != 0) {
        if (inputs[2].checked == true) {
            inputs[2].parentNode.style = "border:1px solid hsl(176, 50%, 47%)"
            pledges[2].style = "display:initial; padding-bottom:21px; padding-top:33px; transition:all 0.2s ease-in;"
            continuePledges[2].addEventListener("click", () => {
                pledges[2].style = "display:none; transition:all 0.1s ease-out;"
                selectPledgeBtnDiv.style = "visibility:hidden";
            })
        } else {
            inputs[2].parentNode.style = "border:1px solid gray; padding-bottom:0px;"
            pledges[2].style = "display:none; transition:all 0.1s ease-out;"
        }
    } else {
        inputs[2].parentElement.style = "background-color:white; filter:brightness(0.6); pointer-events:none;";
    }

    //mahogany pledge
    if (parseInt(pledgePageStock[2].innerText) != 0) {
        if (inputs[3].checked == true) {
            inputs[3].parentNode.style = "border:1px solid hsl(176, 50%, 47%)"
            pledges[3].style = "display:initial; padding-bottom:21px; padding-top:33px; transition:all 0.2s ease-in;"
            continuePledges[3].addEventListener("click", () => {
                pledges[3].style = "display:none; transition:all 0.1s ease-out;"
                selectPledgeBtnDiv.style = "visibility:hidden";
            })
        } else {
            inputs[3].parentNode.style = "border:1px solid gray; padding-bottom:0px;"
            pledges[3].style = "display:none; transition:all 0.1s ease-out;"
        }
    } else {
        inputs[3].parentElement.style = "background-color:white; filter:brightness(0.6); pointer-events:none;";
    }
}



let pledgeSum = 0;
let backerSum = 0;


continuePledges.forEach(continuePledge => {
    //continuePledge.setAttribute("onclick", "success()")
    continuePledge.addEventListener("click", () => {
        if (continuePledges[0].getAttribute('id') == continuePledge.getAttribute('id')) {
            success(continuePledges[0].id);
            backerSum = backerTotal + 1;
            pledgeSum = pledgeTotal + 0;

            console.log("pledge total for $0 pledge: " + pledgeSum)
            localStorage.setItem("Total People pledged", backerSum);
            localStorage.setItem("Total Amount Pledged", pledgeSum);

            getBackerValue.innerText = localStorage.getItem("Total People pledged").toString();
            getPledgeValue.innerText = localStorage.getItem("Total Amount Pledged").toString();

            progressBar.value = parseInt(localStorage.getItem("Total Amount Pledged"));

        } else if (continuePledges[1].getAttribute('id') == continuePledge.getAttribute('id')) {
            success(continuePledges[1].id);
            var bambooStorageValue = parseInt(localStorage.getItem("Bamboo-Stock")) //subtract 1 from total stock every time continue pledge btn is clicked
            var newBambooValue = bambooStorageValue - 1;
            localStorage.setItem("Bamboo-Stock", newBambooValue);
            console.log("The value is " + newBambooValue);
            backerSum = backerTotal + 1;
            pledgeSum = pledgeTotal + 25;

            console.log("pledge total for $25 pledge: " + pledgeSum)

            localStorage.setItem("Total People pledged", backerSum);
            localStorage.setItem("Total Amount Pledged", pledgeSum);

            getBackerValue.innerText = localStorage.getItem("Total People pledged").toString();
            getPledgeValue.innerText = localStorage.getItem("Total Amount Pledged").toString();

            progressBar.value = parseInt(localStorage.getItem("Total Amount Pledged"));

            stocksLeft[0].innerText = parseInt(localStorage.getItem("Bamboo-Stock"));
            pledgePageStock[0].innerText = (stocksLeft[0].innerText);


        } else if (continuePledges[2].getAttribute('id') == continuePledge.getAttribute('id')) {
            success(continuePledges[2].id);
            var blackEditionStorageValue = parseInt(localStorage.getItem("Black-Edition-Stock")) //subtract 1 from total stock every time continue pledge btn is clicked
            var newBlackEditionValue = blackEditionStorageValue - 1;
            localStorage.setItem("Black-Edition-Stock", newBlackEditionValue);
            console.log("The value is " + newBlackEditionValue);
            backerSum = backerTotal + 1;
            pledgeSum = pledgeTotal + 75;

            console.log("pledge total for $75 pledge: " + pledgeSum)

            localStorage.setItem("Total People pledged", backerSum);
            localStorage.setItem("Total Amount Pledged", pledgeSum);

            getBackerValue.innerText = localStorage.getItem("Total People pledged").toString();
            getPledgeValue.innerText = localStorage.getItem("Total Amount Pledged").toString();

            progressBar.value = parseInt(localStorage.getItem("Total Amount Pledged"));

            stocksLeft[1].innerText = parseInt(localStorage.getItem("Black-Edition-Stock"));
            pledgePageStock[1].innerText = (stocksLeft[1].innerText);

        } else if (continuePledges[3].getAttribute('id') == continuePledge.getAttribute('id')) {
            success(continuePledges[3].id);
            var mahoganyStorageValue = parseInt(localStorage.getItem("Mahogany-Stock")) //subtract 1 from total stock every time continue pledge btn is clicked
            var newMahoganyValue = mahoganyStorageValue - 1;
            localStorage.setItem("Mahogany-Stock", newMahoganyValue);
            console.log("The value is " + newMahoganyValue);
            backerSum = backerTotal + 1;
            pledgeSum = pledgeTotal + 200;

            console.log("pledge total for $200 pledge: " + pledgeSum)

            localStorage.setItem("Total People pledged", backerSum);
            localStorage.setItem("Total Amount Pledged", pledgeSum);

            getBackerValue.innerText = localStorage.getItem("Total People pledged").toString();
            getPledgeValue.innerText = localStorage.getItem("Total Amount Pledged").toString();

            progressBar.value = parseInt(localStorage.getItem("Total Amount Pledged"));

            stocksLeft[2].innerText = parseInt(localStorage.getItem("Mahogany-Stock"));
            pledgePageStock[2].innerText = (stocksLeft[2].innerText);
        } else {
            console.log("failed");
        }

        changeRwrdDiv();
        changePldgeDiv();
    })

})


function success(pledgedItem) {

    selected.style = "visibility:hidden; transition:all 0.25s ease-out;"
    bodyContent.style = "filter:brightness(0.5); transition:all 0.25s ease-in; pointer-events: none"
        //header.style="transition:all 0.25s ease-in; pointer-events: none"
    pledgeSuccess.style = "visibility:visible; transition:all 0.25s ease-in; background-color:white;"
    console.log('success');

    inputs.forEach(input => {
        if (input.checked == true) {
            input.checked = false;
            pledges.forEach(pledgeDiv => {
                pledgeDiv.style = "display:none;"
            })
        }
        input.parentNode.style = "border:1px solid black";
    })

    reward(pledgedItem);
}
var yesReward = false;

function reward(item) {
    yesReward = true;
    if (yesReward == true) {
        if (item == "continue-$0") {
            console.log("You pledged without reward")
            buttonSelectReward.forEach(rewardBtn => {
                rewardBtn.style = "pointer-events:none;background-color:orange"
            })
        } else if (item == "continue-$25") {
            console.log("You pledged $25")
            buttonSelectReward[0].style = "pointer-events:all; background-color:blue";
            buttonSelectReward[0].addEventListener("click", (event) => {
                yesReward = false;
                event.source.style = "background-color:yellow; pointer-events:none";
            })
        } else if (item == "continue-$75") {
            console.log("You pledged $75")
            buttonSelectReward[1].style = "pointer-events:all; background-color:blue";
            buttonSelectReward[1].addEventListener("click", (event) => {
                yesReward = false;
                event.source.style = "background-color:yellow; pointer-events:none";
            })
        } else if (item == "continue-$200") {
            console.log("You pledged $200")
            buttonSelectReward[2].style = "pointer-events:all; background-color:blue";
            buttonSelectReward[2].addEventListener("click", (event) => {
                yesReward = false;
                //event.source.style = "background-color:yellow; pointer-events:none";
                console.log(event.source.parentElement)
            })
        }
        //item.style = "pointer-events:all; background-color:cyan";
    } else {
        item.style = "pointer-events:none; background-color:lime";
        console.log("fail:" + item)
    }
}

window.addEventListener("load", () => {
    if (yesReward == false) {
        buttonSelectReward.forEach(rewardBtn => {
            rewardBtn.style = "pointer-events:none;background-color:orange"
        })
    }
})

function homepage() {
    selected.style = "visibility:hidden; transition:all 0.01s ease-out;"
    bodyContent.style = "visibility:visible; transition:all 0.02s ease-in;"
    header.style = "visibility:visible; transition:all 0.02s ease-in;"
    pledgeSuccess.style = "visibility:hidden; transition:all 0.02s ease-in"
    pledges.style = "display:none";

}