var btnClass = document.getElementsByClassName('signin-side-btn')[0];
var btnList = btnClass.getElementsByTagName('li');

var btnActive = document.getElementsByClassName("active");
var textIcon = document.getElementsByTagName('h4');
var btnSubmit = document.getElementsByTagName('button');

var anim = document.getElementById('anim');

var username = document.getElementById('username');
var email = document.getElementById('email');
var pass = document.getElementById('password');
var passRepeat = document.getElementById('passwordrepeat');

var inputList = document.getElementsByClassName('form-group');

// Anmation
var mainDiv=document.getElementsByClassName('signin-main');


for(var i=0; i<btnList.length ;i++){
    btnList[i].addEventListener('click',function(){
        anim.style.display="none";
        if(this.innerText==='Log in'){
            btnList[1].className = btnList[1].className.replace("active","");
            btnList[0].className="active";

            inputList[0].className = 'form-group hide';
            inputList[3].className = 'form-group hide';

            btnSubmit[0].innerText = "Get Start";
        }
        else{
            btnList[0].className = btnList[0].className.replace("active","");
            btnList[1].className="active";

            inputList[0].className = 'form-group';
            inputList[3].className = 'form-group';

            btnSubmit[0].innerText = "Join us now";
        }
        clear();

        if(mainDiv[0].classList.contains("anime")){
            mainDiv[0].classList.remove("anime");
            mainDiv[0].classList.add("anime");
        }
        
        anim.style.display="block";

    });
}

// btnSubmit[0].addEventListener('click',function(){
//     if(btnActive[0].innerText==='Log in'){
//         if(email.value===null || pass.value===null){
//             alert("please fill the inputs correctly.");
//         }
//         else if(localStorage[email.value]!==pass.value){
//             alert("Username/Email or Password is not correct.");
//         }
//         else if(localStorage[email.value]===pass.value){
//             alert("Welcome!");
//         }
//     }
//     else{
//         if(username.value===null || email.value===null || pass.value===null || passRepeat.value===null ){
//             alert("please fill the inputs correctly.");
//         }
//         else if(localStorage[email.value]!=null || localStorage[pass.value]!=null){
//             alert("Email or Username tekrari ast");
//         }
//         else if(pass.value!==passRepeat.value){
//             alert("pleas input same password");
//         }
//         else{
//             localStorage.setItem(username.value,pass.value);
//             localStorage.setItem(email.value,pass.value);
//             alert("Done. now you are one of us");
//         }
//     }
//     clear();
// });

function clear(){
    username.value="";
    email.value="";
    passRepeat.value="";
    pass.value="";
}