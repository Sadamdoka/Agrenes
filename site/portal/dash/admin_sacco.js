/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var url = "https://avienseconsults.com/api.agro/service/";
//var url = "http://localhost:8080/api.top/service/";

var user = '';
var role = '';
var type = '';
$(document).ready(function () {
    const email = sessionStorage.getItem('user');
    getAccount(email);
    sessionEmpty(email);
});

function createNode(element) {
    return document.createElement(element);
}
function append(parent, el) {
    return parent.appendChild(el);
}



function getAccount(input) {
    try {
        $.ajax({
            url: url + "fetch/user/0/null/" + input,
            dataType: 'json',
            type: 'get',
            cache: false,
            processData: false,
            contentType: false,
            beforeSend: function () {
                //reset container
            },
            complete: function (data) {
                //upon completion
                //alert("Finished Loading");
            },
            success: function (data) {
                var e_data = '';
                try {
                    //$("#logs").empty();
                    let row = "";
                    let i = 1;
                    if (!isEmpty(data)) {
                        row += "";
                        var jdata = data.user;
                        //above must be customised
                        if (!isJsonArray(jdata)) {
                            //Add Singular values
                            var value = jdata;
                            //console.log(jdata);
                            // console.log(value.email);
                            //document.getElementById('tut_id').innerHTML = value.resid;
                            //document.getElementById('tut_email').innerHTML = value.email;
                            //document.getElementById('tut_tel').innerHTML = value.phone;
                            document.getElementById('tut_names').innerHTML = "Welcome " + value.name;
                            getbalance(value.organ, 'acc_amt', 'acc_no', '1');

                            loadInstitute();

                        } else {
                            //Add ArrayList
                            //above must be customised
                            $.each(data.user, function (index, value) {
                                alert("Error while loading user data");
                                //e_data += '<div class="desc"><div class="thumb"><span class="badge bg-theme"><i class="fa fa-clock-o"></i></span></div><div class="details"><p><muted>' + value.datreg + '</muted><br/><a href="#">' + value.activity + '</a>&nbsp&nbsp' + value.act_by + '<br/></p></div></div>';
                                //++i;
                            });
                        }
                    } else {
                        alert("No Data to load");
                    }
                    //appending data
                    //  $("#logs").append(e_data);
                } catch (e) {
                    ShowError("Response Error", e, getAccount);
                }
            },
            error: function (d) {
                //$("#id").html()
                ShowError("Response Error");
                if (ajaxOptions === 'timeout') {
                    ShowError("Ajax Error", "Connection TimeOut");
                } else {
                    ShowError("Ajax Error", "Something went wrong!");
                }
            }});
    } catch (ex) {
        ShowError("Exception", ex);
    }
}




function loadInstitute() {
    try {
        $.ajax({
//
            url: url + "fetch/school_type/1",
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#tab_inst_body").html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#tab_inst_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.school;
                        if (!isJsonArray(value)) {
                            //console.log(value.id);
                            e_data += '<tr>';
                            e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                            e_data += '<td>' + value.school_id + '</td>';
                            e_data += '<td>' + value.name + '</td>';
                            e_data += '<td>' + value.details + '</td>';
                            e_data += '<td>' + getGenStatu(value.status) + '</td>';
                            e_data += '<td>';
                            e_data += '<button id="' + value.school_id + '" name="' + value.name + '" onclick="invite_sacco_members(this)"  type="button"  class="btn btn-primary" >Add Members</button>';
                            e_data += '</td>';
                            e_data += '<td>';
                            e_data += '<button id="' + value.school_id + '" name="' + value.name + '" onclick="view_Sacco_m(this)"  type="button"  class="btn btn-success" >View</button>';
                            e_data += '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.school, function (index, value) {
                                //console.log(value.id);
                                e_data += '<tr>';
                                e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                                e_data += '<td>' + value.school_id + '</td>';
                                e_data += '<td>' + value.name + '</td>';
                                e_data += '<td>' + value.details + '</td>';
                                e_data += '<td>' + getGenStatu(value.status) + '</td>';
                                e_data += '<td>';
                                e_data += '<button id="' + value.school_id + '" name="' + value.name + '" onclick="invite_sacco_members(this)"  type="button"  class="btn btn-primary" >Add Members</button>';
                                e_data += '</td>';
                                e_data += '<td>';
                                e_data += '<button id="' + value.school_id + '" name="' + value.name + '" onclick="view_Sacco_m(this)"  type="button"  class="btn btn-success" >View</button>';
                                e_data += '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    $("#tab_inst").append(e_data);
                    pager('tab_inst');
                    //exportTable('ass_table');
                } catch (e) {
                    console.log(e);
                    //ShowError("Response Error", e, loadAsses);
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
                console.log(d);
            }
        });
    } catch (ex) {
        alert("Exception", ex);
    }
}


document.getElementById('add_sacco').addEventListener('click', createSacco);
function createSacco() {
    //let userid = document.getElementById("s_userid").value;
    //getbalanceSelect(userid, 'v_sel_sacco_acts');
    //loadClubMembers();
    $('#create_sacco').modal('show');
}



document.getElementById('create_sacco_btn').addEventListener('click', createAgrenes_Sacco);
function createAgrenes_Sacco() {
    //event.preventDefault();
    let formData = new FormData();

    let name = document.getElementById("sacco_name").value;
    let det = document.getElementById("sacco_des").value;


    formData.append("name", name);
    formData.append("details", det);
    formData.append("level", 1);

    fetch(url + "create/school",
            {
                body: formData,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            alert("Sacco Created");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).then(function (data) {
        const obj = JSON.parse(data);
        //console.log(obj.error_msg);

    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}


function invite_sacco_members(input) {
    let id = $(input).attr("id");
    //console.log(id);
    getAccountNumber(id, '1', 'acc_id', 'acc_userid');
    loadAllUsers();
    $('#invite_sacco').modal('show');
}



function view_Sacco_m(input) {
    let id = $(input).attr("id");
    getAccountNumber(id, '1', 'v_accid', 'v_userid');
    //let accid = document.getElementById('v_accid').value;
    //console.log(accid);
    $('#view_members').modal('show');
}


function loadClubMembers(input) {
    //console.log(input);
    // let accid = document.getElementById(input).value;
    try {
        $.ajax({
//
            url: url + "fetch/club_members/0/" + input + "/null",
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#v_sel_body").html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                $("#v_sel_body").empty();
                try {
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.club_members;
                        if (!isJsonArray(value)) {
                            //console.log(value.id);
                            e_data += '<tr>';
                            e_data += '<td>' + value.userid + '</td>';
                            e_data += '<td>' + value.name + '</td>';
                            e_data += '<td>' + getRole(value.status) + '</td>';
                            e_data += '<td>';
                            e_data += '<button id="' + value.userid + '" name="' + value.club_id + '"  onclick="makeAdmin(this)"  type="button"  class="btn btn-dark">Make Admin/Treasurer</button>';
                            e_data += '</td>';
                            e_data += '<td>';
                            e_data += '<button id="' + value.userid + '" name="' + value.club_id + '"  onclick="makeSignatory(this)"  type="button"  class="btn btn-success">Make Signatory</button>';
                            e_data += '</td>';
                            e_data += '<td>';
                            e_data += '<button id="' + value.id + '" name="' + value.club_id + '"   type="button"  class="btn btn-info">Remove</button>';
                            e_data += '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.club_members, function (index, value) {
                                //console.log(value.id);
                                e_data += '<tr>';
                                e_data += '<td>' + value.userid + '</td>';
                                e_data += '<td>' + value.name + '</td>';
                                e_data += '<td>' + getRole(value.status) + '</td>';
                                e_data += '<td>';
                                e_data += '<button id="' + value.userid + '" name="' + value.club_id + '"  onclick="makeAdmin(this)"  type="button"  class="btn btn-dark">Make Admin/Treasurer</button>';
                                e_data += '</td>';
                                e_data += '<td>';
                                e_data += '<button id="' + value.userid + '" name="' + value.club_id + '"  onclick="makeSignatory(this)"  type="button"  class="btn btn-success">Make Signatory</button>';
                                e_data += '</td>';
                                e_data += '<td>';
                                e_data += '<button id="' + value.id + '" name="' + value.club_id + '"  type="button"  class="btn btn-info">Remove</button>';
                                e_data += '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    $("#v_sel_table").append(e_data);
                    pager('v_sel_table');
                    //exportTable('ass_table');
                } catch (e) {
                    console.log(e);
                    //ShowError("Response Error", e, loadAsses);
                }
            },
            error: function (d) {
                console.log(d);
            }
        });
    } catch (ex) {
        alert("Exception", ex);
    }
}


function getRole(input) {
    if (input === '0') {
        return '<span class="badge badge-info">Normal</span>';
    } else if (input === '1') {
        return '<span class="badge badge-danger">Signatory</span>';
    } else if (input === '2') {
        return '<span class="badge badge-warning">Admin/Treasurer</span>';
    }
}

function makeSignatory(input) {
    let userid = $(input).attr("id");
    //let name = $(input).attr("name");
    //let club_id = document.getElementById("acc_id").value;
    //let club_id = $("#sel_sacco_acts :selected").attr('id');//document.getElementById("sch_con_level").value;


    var formdata = new FormData();

    formdata.append("userid", userid);
    formdata.append("status", "1");

    fetch(url + "update/club_members_status",
            {
                body: formdata,
                method: 'POST'
            }).then(function (response) {
        //console.log('Response: ' + response);
        if (response.status === 200) {
            alert("User made Signatory");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}

function makeAdmin(input) {
    let userid = $(input).attr("id");
    //let name = $(input).attr("name");
    //let club_id = document.getElementById("acc_id").value;
    //let club_id = $("#sel_sacco_acts :selected").attr('id');//document.getElementById("sch_con_level").value;


    var formdata = new FormData();

    formdata.append("userid", userid);
    formdata.append("status", "2");

    fetch(url + "update/club_members_status",
            {
                body: formdata,
                method: 'POST'
            }).then(function (response) {
        //console.log('Response: ' + response);
        if (response.status === 200) {
            alert("User made Signatory");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}



function addSacco_Member(input) {
    let userid = $(input).attr("id");
    let name = $(input).attr("name");
    let club_id = document.getElementById("acc_id").value;
    //let club_id = $("#sel_sacco_acts :selected").attr('id');//document.getElementById("sch_con_level").value;


    var formdata = new FormData();

    formdata.append("userid", userid);
    formdata.append("name", name);
    formdata.append("club_id", club_id);

    fetch(url + "create/club_members",
            {
                body: formdata,
                method: 'POST'
            }).then(function (response) {
        //console.log('Response: ' + response);
        if (response.status === 200) {
            alert("User Added to Sacco | Union | Group");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}


function loadAllUsers() {
    try {
        $.ajax({
//
            url: url + "fetch/student_bi",
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                //$("#usr_body").html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#usr_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.student;
                        if (!isJsonArray(value)) {
                            //console.log(value.id);
                            e_data += '<tr>';
                            e_data += '<td>' + getStudentLevel(value.study_level) + '</td>';
                            e_data += '<td>' + value.student_id + '</td>';
                            e_data += '<td>' + value.name + '</td>';
                            e_data += '<td>' + value.email + '</td>';
                            e_data += '<td>';
                            e_data += '<button id="' + value.student_id + '"  name="' + value.name + '" onclick="addSacco_Member(this)"  type="button"  class="btn btn-info" >Invite</button>';
                            e_data += '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.student, function (index, value) {
                                //console.log(value.id);
                                e_data += '<tr>';
                                e_data += '<td>' + getStudentLevel(value.study_level) + '</td>';
                                e_data += '<td>' + value.student_id + '</td>';
                                e_data += '<td>' + value.name + '</td>';
                                e_data += '<td>' + value.email + '</td>';
                                e_data += '<td>';
                                e_data += '<button id="' + value.student_id + '" name="' + value.name + '" onclick="addSacco_Member(this)"  type="button"  class="btn btn-info" >Invite</button>';
                                e_data += '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    $("#usr_table").append(e_data);
                    pager('usr_table');
                    //exportTable('ass_table');
                } catch (e) {
                    console.log(e);
                    //ShowError("Response Error", e, loadAsses);
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
                console.log(d);
            }
        });
    } catch (ex) {
        alert("Exception", ex);
    }
}

