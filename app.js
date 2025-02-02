const BASE_URL = "https://v6.exchangerate-api.com/v6/78245cf049bfae63fd1e5ce0/latest";
const flags = document.querySelectorAll(".flags select");
const btn = document.querySelector(".exchange");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
for(let select of flags) {
    for (currCode in countryList) {
        let NewOption = document.createElement("option");
        NewOption.innerText = currCode;
        NewOption.value = currCode;
        if(select.name === "from" && currCode === "USD") {
            NewOption.selected = "selected";
        }
        else if(select.name === "to" && currCode === "INR") {
            NewOption.selected = "selected";
        }
        select.append(NewOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}
const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}
btn.addEventListener("click",async(evt)=>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal < 0 || amtVal === "") {
        amtVal = 1;
        amount.value = "1";
    }
    let url = `${BASE_URL}/${fromCurr.value}`;
    fetch(url).then(response => (response.json())).then(result => {
        let exchangeRate = result.conversion_rates[toCurr.value];
        let Rate = exchangeRate * amtVal;
        let msg = document.querySelector(".msg");
        msg.innerText = `${amtVal} ${fromCurr.value} = ${Rate} ${toCurr.value}`;
    })
})
