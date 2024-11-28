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
            url: url + "fetch/student/0/" + input,
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
                        var jdata = data.student;
                        //above must be customised
                        if (!isJsonArray(jdata)) {
                            //Add Singular values
                            var value = jdata;
                            //console.log(value);
                            // console.log(value.email);
                            //console.log(value.school);
                            getbalance(value.school, 'acc_amt', 'acc_no','1');
                            
                            document.getElementById('sch_user_names').innerHTML = "Welcome " + value.name;
                            document.getElementById('sch_date').innerHTML = getToday();
                            loadstudents(value.organ);
                            getSchool(value.school);
                            loadJobs(value.school);
                            loadUsers(value.school);
                            loadForum(value.school);
                            loadtuitors(value.school);

                            loadContent(value.organ);

                            //setAccountType(value.status, value.level, 'org_status');


                            //e_data += '<div class="desc"><div class="thumb"><span class="badge bg-theme"><i class="fa fa-clock-o"></i></span></div><div class="details"><p><muted>' + value.datreg + '</muted><br/><a href="#">' + value.activity + '</a>&nbsp&nbsp' + value.act_by + '<br/></p></div></div>';
                        } else {
                            //Add ArrayList
                            //above must be customised
                            $.each(data.student, function (index, value) {
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




function getSchool(input) {
    try {
        $.ajax({
            url: url + "fetch/school/0/" + input,
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
                        var jdata = data.school;
                        //above must be customised
                        if (!isJsonArray(jdata)) {
                            //Add Singular values
                            var value = jdata;
                            // console.log(value.email);
                            document.getElementById('sch_gen').innerHTML = value.id;
                            document.getElementById('sch_id').innerHTML = value.school_id;
                            document.getElementById('sch_name').innerHTML = value.name;
                            document.getElementById('sch_address').innerHTML = value.details;
                            document.getElementById('sch_level').innerHTML = value.level;

                            //e_data += '<div class="desc"><div class="thumb"><span class="badge bg-theme"><i class="fa fa-clock-o"></i></span></div><div class="details"><p><muted>' + value.datreg + '</muted><br/><a href="#">' + value.activity + '</a>&nbsp&nbsp' + value.act_by + '<br/></p></div></div>';
                        } else {
                            //Add ArrayList
                            //above must be customised
                            $.each(data.school, function (index, value) {
                                alert("Error while loading user data");
                                //e_data += '<div class="desc"><div class="thumb"><span class="badge bg-theme"><i class="fa fa-clock-o"></i></span></div><div class="details"><p><muted>' + value.datreg + '</muted><br/><a href="#">' + value.activity + '</a>&nbsp&nbsp' + value.act_by + '<br/></p></div></div>';
                                //++i;
                            });
                        }
                    } else {
                        alert("No Data to load");
                    }
                    //appending data
                    //$("#logs").append(e_data);
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


function loadstudents(input) {
    try {
        $.ajax({
//
            url: url + "fetch/student_school/" + input,
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#sch_student_body").html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#sch_student_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.student;
                        if (!isJsonArray(value)) {
                            //console.log(value.id);
                            e_data += '<tr>';
                            e_data += '<td>' + value.id + '</td>';
                            e_data += '<td>' + value.student_id + '</td>';
                            e_data += '<td>' + value.name + '</td>';
                            e_data += '<td>' + value.bio + '</td>';
                            e_data += '<td>' + value.email + '</td>';
                            e_data += '<td>' + value.phone + '</td>';
                            e_data += '<td>' + value.level + '</td>';
                            e_data += '<td>' + value.address + '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.student, function (index, value) {
                                //console.log(value.id);
                                e_data += '<tr>';
                                e_data += '<td>' + value.id + '</td>';
                                e_data += '<td>' + value.student_id + '</td>';
                                e_data += '<td>' + value.name + '</td>';
                                e_data += '<td>' + value.bio + '</td>';
                                e_data += '<td>' + value.email + '</td>';
                                e_data += '<td>' + value.phone + '</td>';
                                e_data += '<td>' + value.level + '</td>';
                                e_data += '<td>' + value.address + '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    $("#sch_student_table").append(e_data);
                    pager('sch_student_table');
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



function loadtuitors(sch) {
    try {
        $.ajax({
//
            url: url + "fetch/tuitor/0/null/" + sch,
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#sch_tuitor_div").html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#sch_tuitor_div").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.tuitor;
                        //console.log(value);
                        if (!isJsonArray(value)) {
                            //console.log(value.id);
                            e_data += '<li>';
                            e_data += '<div class="d-flex">';
                            e_data += '<img src="../images/faces/face1.jpg" alt="user">';
                            e_data += '<div>';
                            e_data += '<p class="text-info mb-1">' + value.name + '</p>';
                            e_data += '<p class="mb-0">' + value.specialities + '</p>';
                            e_data += '<small>' + value.availability + '</small>';
                            e_data += '</div>';
                            e_data += '</div>';
                            e_data += '</li>';
                        } else {
                            $.each(data.tuitor, function (index, value) {
                                //console.log(value.id);
                                e_data += '<li>';
                                e_data += '<div class="d-flex">';
                                e_data += '<img src="../images/faces/face1.jpg" alt="user">';
                                e_data += '<div>';
                                e_data += '<p class="text-info mb-1">' + value.name + '</p>';
                                e_data += '<p class="mb-0">' + value.specialities + '</p>';
                                e_data += '<small>' + value.availability + '</small>';
                                e_data += '</div>';
                                e_data += '</div>';
                                e_data += '</li>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    $("#sch_tuitor_div").append(e_data);
                    //pager('sch_student_table');
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



document.getElementById('sch_job_add').addEventListener('click', addJob);
function addJob(event) {
    event.preventDefault();
    let formData = new FormData();

    let name = document.getElementById("sch_job_name").value;
    let details = document.getElementById("sch_job_detail").value; //$("#rec_choice :selected").attr('id');
    let schoolid = document.getElementById('sch_id').innerHTML;//document.getElementById("sch_id").value;
    //console.log(schoolid);

    formData.append('name', name);
    formData.append('details', details);
    formData.append('tuitorid', "NA");
    formData.append('schoolid', schoolid);

    fetch(url + "create/job",
            {
                body: formData,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            alert("Job Created");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}



function loadJobs(input) {
    try {
        $.ajax({
//
            url: url + "fetch/job/0/" + input,
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#sch_job_body").html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                // console.log(data);
                try {
                    $("#sch_job_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.job;
                        if (!isJsonArray(value)) {
                            //console.log(value.id);
                            e_data += '<tr>';
                            e_data += '<td>' + value.id + '</td>';
                            e_data += '<td>' + value.job_id + '</td>';
                            e_data += '<td>' + value.name + '</td>';
                            e_data += '<td>' + value.details + '</td>';
                            e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                            e_data += '<td>';
                            e_data += '<button id="' + value.id + '" onclick="delJob(this)"  type="button"  class="btn btn-danger" >Clear</button>';
                            e_data += '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.job, function (index, value) {
                                //console.log(value.id);
                                e_data += '<tr>';
                                e_data += '<td>' + value.id + '</td>';
                                e_data += '<td>' + value.job_id + '</td>';
                                e_data += '<td>' + value.name + '</td>';
                                e_data += '<td>' + value.details + '</td>';
                                e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                                e_data += '<td>';
                                e_data += '<button id="' + value.id + '" onclick="delJob(this)"  type="button"  class="btn btn-danger" >Clear</button>';
                                e_data += '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    $("#sch_job_table").append(e_data);
                    pager('sch_job_table');
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

function delJob(input) {
    let id = $(input).attr("id");
    let formData = new FormData();
    formData.append('id', id);
    $.ajax({
        url: url + "delete/job",
        //dataType: 'json',
        data: formData,
        type: 'POST',
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            //checker(data.status, email);
            alert("Cleared");
        },
        error: function (d) {
            console.log(d);
        }
    });
}


document.getElementById('sch_sch_edit').addEventListener('click', editSchool);
function editSchool(event) {
    event.preventDefault();
    let formData = new FormData();
    let id = document.getElementById('sch_gen').innerHTML;
    let sid = document.getElementById('sch_id').innerHTML;
    let name = document.getElementById("sch_sch_name").value;
    let details = document.getElementById("sch_sch_detail").value;
    let level = document.getElementById("sch_sch_lev").value;


    formData.append("id", id);
    formData.append("sid", sid);
    formData.append("name", name);
    formData.append("details", details);
    formData.append("level", level);

    fetch(url + "update/school",
            {
                body: formData,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            alert("School Updated");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}


document.getElementById('sch_sm_add').addEventListener('click', addSm);
function addSm(event) {
    event.preventDefault();
    let formData = new FormData();

    let schoolid = document.getElementById('sch_id').innerHTML;//document.getElementById("sch_id").value;
    let plat = document.getElementById("sch_sm_plat").value; //$("#rec_choice :selected").attr('id');
    let link = document.getElementById("sch_sm_link").value;

    formData.append('userid', schoolid);
    formData.append('platform', plat);
    formData.append('link', link);

    fetch(url + "create/social_media",
            {
                body: formData,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            alert("Social Media Created");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}


document.getElementById('sch_bank_add').addEventListener('click', addBank);
function addBank(event) {
    event.preventDefault();
    let formData = new FormData();

    let schoolid = document.getElementById('sch_id').innerHTML;//document.getElementById("sch_id").value;
    let bank = document.getElementById("sch_bank_name").value; //$("#rec_choice :selected").attr('id');
    let accname = document.getElementById("sch_bank_acc").value;
    let accno = document.getElementById("sch_bank_no").value;

    formData.append('userid', schoolid);
    formData.append('bank_name', bank);
    formData.append('acc_name', accname);
    formData.append('acc_no', accno);

    fetch(url + "create/bank_account",
            {
                body: formData,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            alert("Bank Account Created");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}



document.getElementById('sch_con_add').addEventListener('click', addContent);
function addContent(event) {
    event.preventDefault();
    let formData = new FormData();

    let schoolid = document.getElementById('sch_id').innerHTML;//document.getElementById("sch_id").value;
    let title = document.getElementById("sch_con_name").value; //$("#rec_choice :selected").attr('id');
    let description = document.getElementById("sch_con_des").value;
    let doc = document.getElementById("sch_con_banner");//.value;
    let link = document.getElementById("sch_con_link").value;
    let price = document.getElementById("sch_con_price").value;
    let type = $("#sch_con_level :selected").attr('id');//document.getElementById("sch_con_level").value;

    formData.append('userid', schoolid);
    formData.append('title', title);
    formData.append('desciption', description);
    formData.append('doc', doc.files[0]);
    formData.append('link', link);
    formData.append('price', price);
    formData.append('type', type);

    fetch(url + "create/content",
            {
                body: formData,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            alert("Content Created");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}


function loadUsers(input) {
    try {
        $.ajax({
//
            url: url + "fetch/users/" + input,
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#sch_users_body").html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#sch_users_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.user;
                        //console.log(value);
                        if (!isJsonArray(value)) {
                            //console.log(value.id);
                            e_data += '<tr>';
                            e_data += '<td>' + value.id + '</td>';
                            e_data += '<td>' + value.resid + '</td>';
                            e_data += '<td>' + value.name + '</td>';
                            e_data += '<td>' + value.phone + '</td>';
                            e_data += '<td>' + value.email + '</td>';
                            e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.user, function (index, value) {
                                //console.log(value.id);
                                e_data += '<tr>';
                                e_data += '<td>' + value.id + '</td>';
                                e_data += '<td>' + value.resid + '</td>';
                                e_data += '<td>' + value.name + '</td>';
                                e_data += '<td>' + value.phone + '</td>';
                                e_data += '<td>' + value.email + '</td>';
                                e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    $("#sch_users_table").append(e_data);
                    // pager('sch_users_table');
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


document.getElementById('tut_club_add').addEventListener('click', addClub);
function addClub(event) {
    event.preventDefault();
    let formData = new FormData();

    let userid = document.getElementById('tut_id').innerHTML;//document.getElementById("sch_id").value;
    let name = document.getElementById("tut_club_name").value; //$("#rec_choice :selected").attr('id');
    let det = document.getElementById("tut_club_des").value;

    formData.append('name', name);
    formData.append('details', det);
    formData.append('type', "NA");
    formData.append('club_by', userid);
    formData.append('approved', "Cleared");

    fetch(url + "create/club",
            {
                body: formData,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            alert("Forum Created");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}


function loadForum(input) {
    try {
        $.ajax({
//
            url: url + "fetch/club/0/" + input,
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#tut_club_body").html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#tut_club_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.club;
                        if (!isJsonArray(value)) {
                            //console.log(value.id);
                            e_data += '<tr>';
                            e_data += '<td>' + value.id + '</td>';
                            e_data += '<td>' + value.club_id + '</td>';
                            e_data += '<td>' + value.name + '</td>';
                            e_data += '<td>' + value.details + '</td>';
                            e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                            e_data += '<td>';
                            e_data += '<button id="' + value.id + '" onclick="delJob(this)"  type="button"  class="btn btn-danger" >Clear</button>';
                            e_data += '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.club, function (index, value) {
                                //console.log(value.id);
                                e_data += '<tr>';
                                e_data += '<td>' + value.id + '</td>';
                                e_data += '<td>' + value.club_id + '</td>';
                                e_data += '<td>' + value.name + '</td>';
                                e_data += '<td>' + value.details + '</td>';
                                e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                                e_data += '<td>';
                                e_data += '<button id="' + value.id + '" onclick="delJob(this)"  type="button"  class="btn btn-danger" >Clear</button>';
                                e_data += '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    $("#tut_club_table").append(e_data);
                    pager('tut_club_table');
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



function loadContent(input) {
    try {
        $.ajax({
//
            url: url + "fetch/content/0/" + input,
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#tut_cont_body").html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#tut_cont_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.content;
                        if (!isJsonArray(value)) {
                            //console.log(value.id);
                            e_data += '<tr>';
                            e_data += '<td>' + value.content_id + '</td>';
                            e_data += '<td>' + value.title + '</td>';
                            e_data += '<td>' + value.description + '</td>';
                            e_data += '<td>' + value.price + '</td>';
                            e_data += '<td>';
                            e_data += '<button id="' + value.id + '"  name="' + value.doc + '" onclick="gotoPdfView(this)"  type="button"  class="btn btn-primary" >View</button>';
                            e_data += '</td>';
                            e_data += '<td>';
                            e_data += '<iframe width="200" height="200" src="https://www.youtube.com/embed/' + getYoutubeID(value.video_link) + '" frameborder="0" allowfullscreen></iframe>';
                            e_data += '<td>';
                            e_data += '<button id="' + value.id + '"  name="' + value.doc + '" onclick="gotoPdfView(this)"  type="button"  class="btn btn-primary" >View</button>';
                            e_data += '</td>';
                            e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                            e_data += '<td>';
                            e_data += '<button id="' + value.id + '" onclick="delJob(this)"  type="button"  class="btn btn-danger" >Clear</button>';
                            e_data += '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.content, function (index, value) {
                                //console.log(value.id);
                                e_data += '<tr>';
                                e_data += '<td>' + value.content_id + '</td>';
                                e_data += '<td>' + value.title + '</td>';
                                e_data += '<td>' + value.description + '</td>';
                                e_data += '<td>' + value.price + '</td>';
                                e_data += '<td>';
                                e_data += '<button id="' + value.id + '"  name="' + value.doc + '" onclick="gotoPdfView(this)"  type="button"  class="btn btn-primary" >View</button>';
                                e_data += '</td>';
                                e_data += '<td>';
                                e_data += '<iframe width="200" height="200" src="https://www.youtube.com/embed/' + getYoutubeID(value.video_link) + '" frameborder="0" allowfullscreen></iframe>';
                                e_data += '<td>';
                                e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                                e_data += '<td>';
                                e_data += '<button id="' + value.id + '" onclick="delJob(this)"  type="button"  class="btn btn-danger" >Clear</button>';
                                e_data += '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    $("#tut_cont_table").append(e_data);
                    pager('tut_cont_table');
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