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

function setPic() {
    const pic = document.getElementById("picture");//.value;
    //let details = document.getElementById("tag").value;
    img.src = URL.createObjectURL(pic.files[0]);
}

document.getElementById('create_account').addEventListener('click', createUser);
function createUser(event) {
    event.preventDefault();
    let formData = new FormData();

    //let schoolid = document.getElementById('sch_id').innerHTML;//document.getElementById("sch_id").value;
    let school = document.getElementById("school").value; //$("#rec_choice :selected").attr('id');
    let name = document.getElementById("name").value;
    let details = document.getElementById("tag").value;
    let email = document.getElementById("email").value;
    let tel = document.getElementById("tel").value;
    let bio = document.getElementById("bio").value;
    let country = document.getElementById("country").value;
    const pic = document.getElementById("picture");//.value;
    let passport = document.getElementById("passport_copy");//.value;
    let passportno = document.getElementById("passport").value;
    let special = document.getElementById("skill").value;
    let doc = document.getElementById("doc");//.value;
    let cv = document.getElementById("cv");//.value;
    let password = document.getElementById("password").value;
    let avail = document.getElementById("avail").value;


    // console.log(pic.files[0]);
    if (valForm(school, "Please choose School") === false || valForm(name, "Provide Name") === false || valForm(details, "Provide Tags") === false || valEmail(email, "Incorrect Email Format") === false
            || valTel(tel, "Provide Correct Phone Number Format") || valForm(bio, "Provide Bio Info") === false || valForm(passportno, "Provide Passport Number") === false || valForm(country, "Choose Country") === false
            || valImg(pic, "Select Picture") === false || valImg(passport, "Select Passort Copy") === false || valImg(cv, "Select CV") === false || valForm(password, "Provide Password") === false) {
        //empty fields
    } else {
        formData.append("school", school);
        formData.append("name", name);
        formData.append("details", details);
        formData.append("email", email);
        formData.append("tel", tel);
        formData.append("bio", bio);
        formData.append("country", country);
        formData.append("loca", "NA");
        formData.append("lati", "NA");
        formData.append("longi", "NA");
        formData.append("pic", pic.files[0]);
        formData.append("passport", passport.files[0]);
        formData.append("passno", passportno);
        formData.append("special", special);
        formData.append("doc", doc.files[0]);
        formData.append("cv", cv.files[0]);
        formData.append("username", email);
        formData.append("password", password);
        formData.append("avail", avail);

        fetch(url + "create/tuitor",
                {
                    body: formData,
                    method: 'POST'
                }).then(function (response) {
            console.log('Response: ' + response.status);
            if (response.status === 200) {
                alert("Account Created proceed to Sign-In");
            } else {
                alert('Error Ocurred Please contact System Admin');
            }
            return response.text();
        }).catch(function (err) {
            console.log('ERROR: ' + err);
        });
    }
}