/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var url = "https://avienseconsults.com/api.agro/service/";
//var url = "http://localhost:8080/api.agro/service/";

$(document).ready(function () {
    document.addEventListener('contextmenu', event => event.preventDefault());
    loadSchool();
});


function loadSchool() {
    try {
        $.ajax({
            //
            url: url + "fetch/school",
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                // $("#prop_body").html('<tr><td colspan="5" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');

            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#school").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var jdata = data.school;
                        if (!isJsonArray(jdata)) {
                            //console.log(jdata.id);
                            e_data += '<option id="' + jdata.id + '" value="' + jdata.school_id + '" ">';
                            e_data += jdata.school_id + " | " + jdata.name;
                            e_data += '</option>';
                        } else {
                            $.each(data.school, function (index, value) {
                                //console.log(value.id);
                                e_data += '<option id="' + value.id + '" value="' + value.school_id + '" ">';
                                e_data += value.school_id + " | " + value.name;
                                e_data += '</option>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="5" align="center">No data</td></tr>';
                    }
                    $("#school").append(e_data);
                    //searchInvoices();
                } catch (e) {
                    ShowError("Response Error", e, loadSchool);
                }
            },
            error: function (d) {
                //$("#gallery_table").html('<tr><td colspan="5" align="center">Sorry an Expected error Occured.</td></tr>');
                if (ajaxOptions === 'timeout') {
                    alert("ajax Error", "Connection Timeout");
                } else {
                    alert("ajax Error", "Sorry! Something wrong, please try again");
                    //ShowError("ajax Error", thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
                }
                //console.log(d);
            }
        });
    } catch (ex) {
        alert("Exception", ex);
    }
}

document.getElementById('create_account').addEventListener('click', createSchool);
function createSchool() {
    //event.preventDefault();
    let formData = new FormData();

    let schname = document.getElementById("sch_name").value;
    let schdetails = document.getElementById("sch_detail").value;
    let schlevel = $("#school_level :selected").attr('id');
    //let schlevel = document.getElementById("school_level").value;
    //let organ = document.getElementById("school").value; //$("#rec_choice :selected").attr('id');
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let tel = document.getElementById("tel").value;
    let pass = document.getElementById("password").value;
    let bio = document.getElementById("bio").value;
    let address = document.getElementById("address").value;
    let pic = document.getElementById("picture");//.value;

    formData.append("name", schname);
    formData.append("details", schdetails);
    formData.append("level", schlevel);

    fetch(url + "create/school",
            {
                body: formData,
                method: 'POST'
            }).then(function (response) {
        return response.text();
    }).then(function (data) {
        const obj = JSON.parse(data);
        if (obj.status === true) {
            //console.log(obj.error_msg);
            createUser(name, bio, tel, email, address, obj.error_msg, pass, pic);
        } else {
            alert(obj.error_msg);
        }
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}




function createUser(name, bio, tel, email, address, school, password, pic) {


    let formData = new FormData();

    formData.append("name", name);
    formData.append("bio", bio);
    formData.append("study_level", "1");
    formData.append("phone", tel);
    formData.append("email", email);
    formData.append("address", address);
    formData.append("country", "Uganda");
    formData.append("school", school);
    formData.append("username", email);
    formData.append("password", password);
    formData.append("level", "1");
    formData.append("reference", "NA");
    formData.append("pic", pic.files[0]);


    fetch(url + "create/student",
            {
                body: formData,
                method: 'POST'
            }).then(function (response) {
        return response.text();
    }).then(function (data) {
        const obj = JSON.parse(data);
        //console.log(obj);
        if (obj.status === true) {
            document.getElementById('act_userid').value = obj.msg_a;
            //document.getElementById('tut_date').value = obj.msg_b;
            alert("Account Created,Awaiting Activation");
            sendVarifcationCode(tel, obj.msg_b);
            showActiviater();
        } else {
            alert(obj.error_msg);
        }
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });

}


function setPic() {
    const pic = document.getElementById("picture");//.value;
    //let details = document.getElementById("tag").value;
    img.src = URL.createObjectURL(pic.files[0]);
}


document.getElementById('sms_test').addEventListener('click', smsTEst);
function smsTEst(event) {
    event.preventDefault();
    showActiviater();
    //sendVarifcationCode("0751073507", "12345678");
}

function showActiviater() {
    $('#activate_div').modal('show');
}


document.getElementById('act_btn').addEventListener('click', activateAccount);
function activateAccount() {
    //event.preventDefault();
    var userid = document.getElementById("act_userid").value;
    var code = document.getElementById("act_otp").value;


    var formdata = new FormData();

    formdata.append("userid", userid);
    formdata.append("code", code);

    if (valForm(code, "Provide OTP Code") === false) {
        //empty fields
    } else {
        fetch(url + "authentication/otp",
                {
                    body: formdata,
                    method: 'POST'
                }).then(function (response) {
            //console.log('Response: ' + response);
            return response.text();
        }).then(function (data) {
            const obj = JSON.parse(data);
            // console.log(obj);
            if (obj.status === true) {
                alert("Account Varified");
                document.getElementById('lab_call').style.display = 'none';
                document.getElementById('vari_btn').style.display = 'block';
            } else {
                alert(obj.error_msg);
                //console.log(obj.error_msg);
            }
        }).catch(function (err) {
            console.log('ERROR: ' + err);
        });
    }
}


document.getElementById('vari_btn').addEventListener('click', gotoLogin);
function gotoLogin() {
    location.href = 'index.html';
    //sendVarifcationCode("0751073507", "12345678");
}