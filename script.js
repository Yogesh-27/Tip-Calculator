let bill = document.querySelector("#bill");
let people= document.querySelector("#people");
let customTip= document.querySelector(".tip-container input[type='number']");
let tipRadio = document.querySelectorAll(".tip-container input[type='radio']");
let lastSelectedRadio= null;

function getSelectedTip() {
    let selectedTip = document.querySelector('input[name="tip"]:checked');
    return selectedTip ? selectedTip.value : "0"; 
}

function getPeople() {
    return people.value? people.value : "1";
}

function calculate() {
    let billAmount = parseFloat(bill.value?bill.value:"0");
    let tip = parseFloat(customTip.value?customTip.value:getSelectedTip());
    let people= parseInt(getPeople());

    let tipAmount= billAmount*tip/100;
    let totalAmount= (tipAmount+billAmount) / people;
    tipAmount /= people;

    let tipOutput = document.querySelector(".tip-amount");
    let totalOutput = document.querySelector(".total-amount");

    tipOutput.innerText="₹"+tipAmount.toFixed(2);
    totalOutput.innerText="₹"+totalAmount.toFixed(2);
}

bill.addEventListener("input",calculate);

tipRadio.forEach(radio => {
    radio.addEventListener("click",(event)=>{
        customTip.value="";
        if(lastSelectedRadio==event.target){
            lastSelectedRadio.checked=false;
            lastSelectedRadio=null;
        }
        else{
            lastSelectedRadio=event.target;
        }
        calculate();
    });
});

people.addEventListener("input", calculate);
customTip.addEventListener("input",()=>{
    let selectedTip = document.querySelector('input[name="tip"]:checked');
    if(selectedTip){
        selectedTip.checked=false;
        lastSelectedRadio=null;
    }
    calculate();
});

let btn = document.querySelector('button[type="reset"]');
btn.addEventListener("click",() => {
    setTimeout(calculate, 1);
});

