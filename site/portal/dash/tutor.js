/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var url = "https://avienseconsults.com/api.agro/service/";
//var url = "http://localhost:8080/api.agro/service/";

var user = '';
var role = '';
var type = '';
$(document).ready(function () {
    const email = sessionStorage.getItem('user');
    //console.log(email);
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
            url: url + "fetch/tuitor_email/" + input,
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
                console.log(data);
                try {
                    //$("#logs").empty();
                    let row = "";
                    let i = 1;
                    if (!isEmpty(data)) {
                        row += "";
                        var jdata = data.tuitor;
                        //above must be customised
                        if (!isJsonArray(jdata)) {
                            //Add Singular values
                            var value = jdata;
                            console.log(jdata);
                            // console.log(value.email);
                            document.getElementById('tut_id').innerHTML = value.userid;
                            document.getElementById('tut_email').innerHTML = value.email;
                            document.getElementById('tut_tel').innerHTML = value.tel;
                            document.getElementById('tut_names').innerHTML = "Welcome " + value.name;
                            document.getElementById('tut_date').innerHTML = getToday();
                            document.getElementById('tut_img').src = "data:image/png;base64," + value.pic;
                            // $("#img").attr('src', 'data:image/png;base64,' + value.pic;
                            // loadstudents(value.organ);
                            //getSchool(value.organ);
                            getbalance(jdata.userid, 'acc_amt', 'acc_no', '0');
                            getApi_key(jdata.userid);
                            loadJobs();
                            loadCourses();
                            //loadContent(value.userid);
                            loadForum(value.userid);
                            //e_data += '<div class="desc"><div class="thumb"><span class="badge bg-theme"><i class="fa fa-clock-o"></i></span></div><div class="details"><p><muted>' + value.datreg + '</muted><br/><a href="#">' + value.activity + '</a>&nbsp&nbsp' + value.act_by + '<br/></p></div></div>';
                        } else {
                            //Add ArrayList
                            //above must be customised
                            $.each(data.tuitor, function (index, value) {
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
                    console.log(e);
                    //ShowError("Response Error", e, getAccount);
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
        console.log(ex);
    }
}


function getApi_key(userid) {
    try {
        $.ajax({
            //
            url: url + "fetch/mesibo/0/" + userid,
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
                    // $("#school").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var jdata = data.mesibo_key;
                        if (!isJsonArray(jdata)) {
                            //console.log(jdata);
                            //token = jdata.token;
                            //console.log(jdata);
                            //document.getElementById(token).value = jdata.token;

                            /* App ID used to create a user token. */
                            //var appid = jdata.app_id;
                            sessionStorage.setItem('appid', jdata.app_id);

                            //var user_token = jdata.api_key;
                            sessionStorage.setItem('user_token', jdata.api_key);


                        } else {
                            $.each(data.mesibo_key, function (index, value) {

                            });
                        }
                    } else {
                        row += '<tr><td colspan="5" align="center">No data</td></tr>';
                    }
                    // $("#school").append(e_data);
                    //searchInvoices();
                } catch (e) {
                    ShowError("Response Error", e, getApi_key);
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



function loadJobs() {
    try {
        $.ajax({
//
            url: url + "fetch/job",
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
                            e_data += '<td>' + value.job_id + '</td>';
                            e_data += '<td>' + value.name + '</td>';
                            e_data += '<td>' + value.details + '</td>';
                            e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                            e_data += '<td>';
                            e_data += '<button id="' + value.id + '" onclick="delJob(this)"  type="button"  class="btn btn-info" >Apply</button>';
                            e_data += '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.job, function (index, value) {
                                //console.log(value.id);
                                e_data += '<tr>';
                                e_data += '<td>' + value.job_id + '</td>';
                                e_data += '<td>' + value.name + '</td>';
                                e_data += '<td>' + value.details + '</td>';
                                e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                                e_data += '<td>';
                                e_data += '<button id="' + value.id + '" onclick="delJob(this)"  type="button"  class="btn btn-info" >Apply</button>';
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

document.getElementById('cr_add_btn').addEventListener('click', addCourse);
function addCourse(event) {
    event.preventDefault();
    let formData = new FormData();

    //let userid = document.getElementById('tut_id').innerHTML;//document.getElementById("sch_id").value;
    let title = document.getElementById("cr_name").value; //$("#rec_choice :selected").attr('id');
    let description = document.getElementById("cr_des").value;
    let details = document.getElementById("cr_det").value;
    let price = document.getElementById("cr_price").value;


    formData.append('name', title);
    formData.append('description', description);
    formData.append('details', details);
    formData.append('price', "0");
    formData.append('discount', "0");
    formData.append('currency', "UGX");

    fetch(url + "create/course",
            {
                body: formData,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            alert("Course Created");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}


function loadCourses() {
    try {
        $.ajax({
//
            url: url + "fetch/course",
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#cr_table_body").html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#cr_table_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.course;
                        if (!isJsonArray(value)) {
                            //console.log(value.id);
                            e_data += '<tr>';
                            e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                            e_data += '<td>' + value.course_id + '</td>';
                            e_data += '<td>' + value.name + '</td>';
                            e_data += '<td>' + value.description + '</td>';
                            e_data += '<td>' + value.details + '</td>';
                            e_data += '<td>';
                            e_data += '<button id="' + value.id + '" name="' + value.course_id + '"  onclick="ManageCourse(this)"  type="button"  class="btn btn-primary" >Manage</button>';
                            e_data += '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.course, function (index, value) {
                                //console.log(value.id);
                                e_data += '<tr>';
                                e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                                e_data += '<td>' + value.course_id + '</td>';
                                e_data += '<td>' + value.name + '</td>';
                                e_data += '<td>' + value.description + '</td>';
                                e_data += '<td>' + value.details + '</td>';
                                e_data += '<td>';
                                e_data += '<button id="' + value.id + '"  name="' + value.course_id + '" onclick="ManageCourse(this)"  type="button"  class="btn btn-primary" >Manage</button>';
                                e_data += '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    $("#cr_table").append(e_data);
                    pager('cr_table');
                    //exportTable('ass_table');
                } catch (e) {
                    //console.log(e);
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


function ManageCourse(input) {
    var userid = document.getElementById('tut_id').innerHTML;
    //console.log(userid);
    var item_id = $(input).attr("id");
    var cid = $(input).attr("name");
    //getbalance(userid, 'acc_bal', 'acc_name', '0');
    getCourse(item_id);
    loadContent(userid, cid);

    $('#manage_content_model').modal('show');
}

function getCourse(input) {

    try {
        $.ajax({
            url: url + "fetch/course/" + input,
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
                        var jdata = data.course;
                        //above must be customised
                        if (!isJsonArray(jdata)) {
                            var value = jdata;
                            document.getElementById('m_cr_name').value = value.name;
                            document.getElementById('m_cr_courseid').value = value.course_id;
                        } else {
                            $.each(data.item, function (index, value) {
                                alert("Error while loading user data");

                            });
                        }
                    } else {
                        alert("No Data to load");
                    }
                } catch (e) {
                    console.log(e);
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




document.getElementById('sch_con_add').addEventListener('click', addContent);
function addContent(event) {
    event.preventDefault();
    let formData = new FormData();

    let userid = document.getElementById('tut_id').innerHTML;//document.getElementById("sch_id").value;
    let title = document.getElementById("sch_con_name").value; //$("#rec_choice :selected").attr('id');
    let description = document.getElementById("sch_con_des").value;
    let doc = document.getElementById("sch_con_banner");//.value;
    let course_id = document.getElementById("m_cr_courseid").value;
    let price = document.getElementById("sch_con_price").value;
    //let type = $("#sch_con_level :selected").attr('id');//document.getElementById("sch_con_level").value;


    formData.append('userid', userid);
    formData.append('title', title);
    formData.append('desciption', description);
    formData.append('doc', doc.files[0]);
    formData.append('course_id', course_id);
    formData.append('price', price);
    formData.append('type', "2");

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



function loadContent(userid, cid) {
    try {
        $.ajax({
//
            url: url + "fetch/content_course/" + userid + "/" + cid,
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#cr_body_content_tb").html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#cr_body_content_tb").empty();
                    let i = 1;
                    let row = "";
                    console.log(data);
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
                            e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                            e_data += '<td>';
                            e_data += '<button id="' + value.id + '"  name="' + value.doc + '" onclick="delContent(this)"  type="button"  class="btn btn-danger" >Clear</button>';
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
                                e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                                e_data += '<td>';
                                e_data += '<button id="' + value.id + '"  name="' + value.doc + '" onclick="delContent(this)"  type="button"  class="btn btn-danger" >Clear</button>';
                                e_data += '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    $("#cr_model_content_tb").append(e_data);
                    pager('cr_model_content_tb');
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

function delContent(input) {
    let id = $(input).attr("id");
    let formData = new FormData();
    formData.append('id', id);
    $.ajax({
        url: url + "delete/content",
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


document.getElementById('sch_sm_add').addEventListener('click', addSm);
function addSm(event) {
    event.preventDefault();
    let formData = new FormData();

    let userid = document.getElementById('tut_id').innerHTML;//document.getElementById("sch_id").value;
    let plat = document.getElementById("sch_sm_plat").value; //$("#rec_choice :selected").attr('id');
    let link = document.getElementById("sch_sm_link").value;

    formData.append('userid', userid);
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

    let userid = document.getElementById('tut_id').innerHTML;//document.getElementById("sch_id").value;
    let bank = document.getElementById("sch_bank_name").value; //$("#rec_choice :selected").attr('id');
    let accname = document.getElementById("sch_bank_acc").value;
    let accno = document.getElementById("sch_bank_no").value;

    formData.append('userid', userid);
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



//document.getElementById('btn_upload').addEventListener('click', upload);
function upload() {
    let photo = document.getElementById("file_upload").files[0];
    console.log(photo);
    let formData = new FormData();

    formData.append("photo", photo);
    fetch('../uploads/', {method: "POST", body: formData});
}