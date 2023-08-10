let amount = document.getElementById("Amount");
let date = document.getElementById("Date");
let message = document.getElementById("Message");
let bal = document.getElementById("balance");
let btn = document.getElementById("addbtn");
let addbal = document.getElementById("addbal");
let cdata = document.getElementById("cdata");

showtrans();
btn.addEventListener("click", () => {
    let a = localStorage.getItem('a');
    let d = localStorage.getItem('d');
    let msg = localStorage.getItem('msg');
    let paisa =localStorage.getItem('paisa');
    if (amount.value == "" || date.value == "" || message.value == "" ||  bal.innerText==0) {
        alert("Either field is empty or Balance is zero");
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
        if(amount.value>0){
            amountobj.push(amount.value);
        }
        else{
            alert("Amount is less then zero");
            return;
        }
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
    let totalspent=0;
    amountobj.forEach(index => {
        totalspent+=parseFloat(index);
    });
    let tspent = document.getElementById("tspent");
    let spent = document.querySelector(".spent")
    tspent.innerHTML = totalspent.toFixed(2);
    if(totalspent==0)
    {
        spent.style.display='none';
    }
}

addbal.addEventListener('click',()=>{
    paisa =localStorage.getItem('paisa');
    let value = prompt("Please enter amount:","");
    let pattern =/([a-z]|[A-Z]|[`~!@#$%^&*()_+-{[};:'"/?><,.])/gi;
    let res = pattern.test(value);
    console.log(res);
    if(res  || Number(value)< 0)
    {
        alert("Not a valid Input");
        return;
    }
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

cdata.addEventListener('click',()=>{
    let res = confirm("Are you sure you want to clear Data?");
    if(res){
    localStorage.removeItem("a");
    localStorage.removeItem("d");
    localStorage.removeItem("msg");
    localStorage.removeItem("paisa");
    location.reload()
    }
})

