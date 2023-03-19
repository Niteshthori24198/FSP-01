// javascript code

// user registration data fields

let UserShow = document.getElementById("displayuser");

let loginUser = JSON.parse(localStorage.getItem("loginuser")) || null;

if(loginUser){
    UserShow.innerText= `${loginUser.username}  ~~~  Logout`;
}

UserShow.addEventListener("click", (e)=>{
    if(UserShow.innerText==="Login/Sign Up"){
        location.href = "loginregister.html"
    }
    else{
        localStorage.clear()
        location.reload()
    }
})

let formelement = document.querySelector("form");

let registeruser_username = document.getElementById("username");

let registeruser_email = document.getElementById("userid");

let registeruser_date = document.getElementById("regdate");

let registeruser_role =  document.getElementById("roleselect");

let registeruser_location = document.getElementById("userlocation");

let registeruser_password = document.getElementById("userpass1");

let registeruser_con_password = document.getElementById("userpass2");


// user login data fields 


let loginuser_username = document.getElementById("loginusername");

let loginuser_password = document.getElementById("loginuserpass");

let loginbutton = document.getElementById("loginbtn");


// event listner on registerform 


formelement.addEventListener("submit", function (e){

    e.preventDefault();

    RegisterUser();

})



function RegisterUser(){

    let un = registeruser_username.value;
    let uemail = registeruser_email.value;
    let role = registeruser_role.value;
    let date = registeruser_date.value;
    let loc = registeruser_location.value;
    let upass1 = registeruser_password.value;
    let upass2 = registeruser_con_password.value;

    if(un && uemail && role && date && loc && upass1 && upass2){

        if(upass1 === upass2){

            let payload = {
                username:un,
                email:uemail,
                role:role,
                location:loc,
                password:upass1,
                dob:date
            }

            fetch("http://localhost:3000/register", {
                method:"POST",
                headers:{'content-type':'application/json'},
                body:JSON.stringify(payload)
            })
                .then((res)=>{
                    return res.json()
                })
                .then((data)=>{
                    alert("User Registration successfull.")
                })
                .catch((err)=>{
                    alert("Something wend wrong kindly reenter details.")
                })

        }

        else{

            alert("kindly check your password again")

        }


    }

    else{

        alert("kindly provide all mandatory details for registration.")
    }


}




// event listner on login


loginbutton.addEventListener("click", function(e){

    if(loginuser_username.value && loginuser_password.value){

        let payload = {
            username : loginuser_username.value,
            password : loginuser_password.value
        }

        // now make a post request and do further processing

        fetch("http://localhost:3000/login", {
                method:"POST",
                headers:{'content-type':'application/json'},
                body:JSON.stringify(payload)
            })
                .then((res)=>{
                    return res.json()
                })
                .then((data)=>{

                    if(data.length){
                        localStorage.setItem("loginuser",JSON.stringify(data[0]));
                        location.href = "home.html";
                    }

                    else{
                        alert("Wrong Crendentials.")

                    }

                })
                .catch((err)=>{
                    alert("Something wend wrong kindly reenter details.")
                })

    }

    else{

        alert("kindly provide the required details to login.");

    }

})