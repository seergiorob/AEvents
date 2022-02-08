function login(){
    let user, pass;

    user = document.getElementById("usuario").value;
    pass = document.getElementById("password").value;

    if(user == "admin" && pass == "admin"){
        window.location = "./estadistica2.html";
    }
}