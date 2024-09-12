const Base_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");

for(let select of dropdowns){
    for(currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name=="From" && currCode==="USD"){
            newOption.selected="selected";
        }
        else if(select.name=="To" && currCode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}
const updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
}

btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateAmount();
});

const updateAmount= async ()=>{
    let amount=document.querySelector("form input");
    let amtVal=amount.value;
    if(amtVal==="" ||amtVal<1){
        amtVal=1;
        amount.value="1";
    }

    let URL=`${Base_URL}/${fromCurr.value.toLowerCase()}.json`;
    //console.log(toCurr.value.toLowerCase());
    let response = await fetch(URL);
    let data = await response.json();
    //console.log(data.fromCurr.value.toLowerCase());
    let rate= data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    //console.log(rate);

    let finalAmt=rate*amtVal;
    msg.innerText=`${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`
};

window.addEventListener("load",()=>{
    updateAmount();
});