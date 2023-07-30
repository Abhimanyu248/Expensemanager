let amount = document.getElementById("Amount");
let date = document.getElementById("Date");
let message = document.getElementById("Message");
let bal = document.getElementById("balance");
let btn = document.getElementById("addbtn");
let addbal = document.getElementById("addbal");
showtrans();
btn.addEventListener("click", () => {
    let a = localStorage.getItem('a');
    let d = localStorage.getItem('d');
    let msg = localStorage.getItem('msg');
    let paisa =localStorage.getItem('paisa');
    if (amount.value == "" || date.value == "" || message.value == "") {
        alert("All fields are required!");
    }
    else {
        if (a == null && d == null && msg == null) {
            amountobj = [];
            dateobj = [];
            msgobj = [];
        }
        else {
            amountobj = JSON.parse(a);
            dateobj = JSON.parse(d);
            msgobj = JSON.parse(msg);
            paisaobj =JSON.parse(paisa);

        }

        let leftbal = +bal.innerText - amount.value;
        bal.innerText = leftbal;
        
        paisaobj[0]=leftbal;
        amountobj.push(amount.value);
        dateobj.push(date.value);
        msgobj.push(message.value);

        localStorage.setItem('a', JSON.stringify(amountobj));
        localStorage.setItem('d', JSON.stringify(dateobj));
        localStorage.setItem('msg', JSON.stringify(msgobj));
        localStorage.setItem('paisa',JSON.stringify(paisaobj))

        amount.value = "";
        date.value = "";
        message.value = "";
        showtrans();
    }
});

function showtrans() {
    a = localStorage.getItem('a');
    d = localStorage.getItem('d');
    msg = localStorage.getItem('msg');
    paisa =localStorage.getItem('paisa');
    if(paisa==undefined)
    {
        bal.innerText=0;
    }
    if ((a == null && d == null && msg == null)) {
        amountobj = [];
        dateobj = [];
        msgobj = [];
    }
    else {
        amountobj = JSON.parse(a);
        dateobj = JSON.parse(d);
        msgobj = JSON.parse(msg);
    }
    paisaobj =JSON.parse(paisa);
    if(paisa==undefined)
    {
        bal.innerText=0;
    }
    else{
    bal.innerText = paisaobj[0];
    }
    let len = amountobj.length;
    let html = "";
    for (i = len-1; i >= 0; i--) {
            html+=`<tr>
            <td>${dateobj[i]}</td>
            <td>${amountobj[i]}</td>
            <td>${msgobj[i]}</td>
        </tr>`
    }
    let table=document.getElementById("table");
    table.innerHTML=html;
}

addbal.addEventListener('click',()=>{
    paisa =localStorage.getItem('paisa');
    let value = prompt("Please enter amount:","");
    if(paisa==undefined)
    {
        paisaobj=[];
    }
    else{
    paisaobj =JSON.parse(paisa);
    }
    if(paisa==null)
    {
        paisaobj.push(Number(value));
    }
    else{
    paisaobj[0] = Number(value) + Number(paisaobj[0]);
    }
    bal.innerText = paisaobj[0];
    localStorage.setItem('paisa',JSON.stringify(paisaobj));
})
