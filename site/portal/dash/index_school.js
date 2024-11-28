/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



var url = "https://avienseconsults.com/api.agro/service/";
//var url = "http://localhost:8080/api.top/service/";

$(document).ready(function () {
    document.addEventListener('contextmenu', event => event.preventDefault());
});


document.getElementById('authe').addEventListener('click', login);
function login(event) {
    event.preventDefault();
    let formData = new FormData();
    let email = document.getElementById("exampleInputEmail1").value;
    let password = document.getElementById("exampleInputPassword1").value;
    if (valEmail(email, "Incorrect Email Format") === false || valForm(password, "Provid Password") === false) {
        //empty fields
    } else {
        formData.append('email', email);
        formData.append('password', password);
        $.ajax({
            url: url + "authentication/student",
            //dataType: 'json',
            data: formData,
            type: 'POST',
            processData: false,
            contentType: false,
            cache: false,
            success: function (data) {
                checker(data.status, email);
                //console.log(data);
            }
            ,
            error: function (d) {
                console.log(d);
            }
        });
    }

}

function checker(status, email) {
    if (status === true) {
        sessionStorage.setItem('user', email);
        //var queryString = "?" + email;
        location.href = 'home.html';
    } else {
        alert("Wrong Userid or Password");
    }
}

