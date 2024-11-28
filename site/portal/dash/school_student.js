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
                            // console.log(value);
                            // console.log(value.email);
                            //document.getElementById('tut_id').innerHTML = value.student_id;
                            //document.getElementById('tut_email').innerHTML = value.email;
                            //document.getElementById('tut_tel').innerHTML = value.tel;
                            document.getElementById('tut_names').innerHTML = "Welcome " + value.name;
                            document.getElementById('tut_date').innerHTML = getToday();
                            document.getElementById('tut_img').src = "data:image/png;base64," + value.pic;
                            getbalance(value.student_id, 'acc_amt','acc_no','1');
                            loadSchool();
                            loadtuitors();
                            loadContent();
                            loadCourse();
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
        ShowError("Exception", ex);
    }
}



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
                // $("#school_div").html('<tr><td colspan="5" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');

            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                //console.log(data);
                try {
                    $("#school_div").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var jdata = data.school;
                        if (!isJsonArray(jdata)) {
                            //console.log(jdata.id);
                            e_data += '<div class="carousel-item">';
                            e_data += '<div class="row">';
                            e_data += '<div class="col-md-3 mb-4 stretch-card transparent">';
                            e_data += '<div class="card card-tale">';
                            e_data += '<div class="card-body">';
                            e_data += '<div class="profile"><img src="../images/logo.png" height="120px" width="100px" alt="image"><span class="online"></span></div>';
                            e_data += '<p class="mb-4">' + jdata.name + '</p>';
                            e_data += '<p class="mb-4">' + jdata.school_id + '</p>';
                            e_data += '<p class="fs-30 mb-2">' + jdata.level + '</p>';
                            e_data += '<p>' + jdata.details + '</p>';
                            e_data += '</div>';
                            e_data += '</div>';
                            e_data += '</div>';
                            e_data += '</div>';
                            e_data += '</div>';
                        } else {
                            $.each(data.school, function (index, value) {
                                //console.log(value.id);
                                e_data += '<div class="carousel-item">';
                                e_data += '<div class="row">';
                                e_data += '<div class="col-md-3 mb-4 stretch-card transparent">';
                                e_data += '<div class="card card-tale">';
                                e_data += '<div class="card-body">';
                                e_data += '<div class="profile"><img src="../images/logo.png" height="120px" width="100px" alt="image"><span class="online"></span></div>';
                                e_data += '<p class="mb-4">' + value.name + '</p>';
                                e_data += '<p class="mb-4">' + value.school_id + '</p>';
                                e_data += '<p class="fs-30 mb-2">' + value.level + '</p>';
                                e_data += '<p>' + value.details + '</p>';
                                e_data += '</div>';
                                e_data += '</div>';
                                e_data += '</div>';
                                e_data += '</div>';
                                e_data += '</div>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="5" align="center">No data</td></tr>';
                    }
                    $('#school_div').append(e_data);
                    $('#school_div').find('.carousel-item:first-child').addClass('active');
                    //pager('st_note_tb');
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


function loadtuitors() {
    try {
        $.ajax({
//
            url: url + "fetch/tuitor",
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



function loadContent() {
    try {
        $.ajax({
//
            url: url + "fetch/content",
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#st_note_bdy").html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#st_note_bdy").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.content;
                        if (!isJsonArray(value)) {
                            //console.log(value.id);
                            e_data += '<tr>';
                            e_data += '<td>';
                            e_data += '<button id="' + value.id + '" name="' + value.doc + '" onclick="gotoPdfView(this)"  type="button"  class="btn btn-primary" >View</button>';
                            e_data += '</td>';
                            e_data += '<td>' + value.content_id + '</td>';
                            e_data += '<td>' + value.title + '</td>';
                            e_data += '<td>' + value.description + '</td>';
                            e_data += '<td>' + value.price + '</td>';
                            e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.content, function (index, value) {
                                //console.log(value.id);
                                e_data += '<tr>';
                                e_data += '<td>';
                                e_data += '<button id="' + value.id + '" name="' + value.doc + '" onclick="gotoPdfView(this)"  type="button"  class="btn btn-primary" >View</button>';
                                e_data += '</td>';
                                e_data += '<td>' + value.content_id + '</td>';
                                e_data += '<td>' + value.title + '</td>';
                                e_data += '<td>' + value.description + '</td>';
                                e_data += '<td>' + value.price + '</td>';
                                e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    $("#st_note_tb").append(e_data);
                    pager('st_note_tb');
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



function loadCourse() {
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
                $("#st_course_bdy").html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#st_course_bdy").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.course;
                        if (!isJsonArray(value)) {
                            //console.log(value.id);
                            e_data += '<tr>';
                            e_data += '<td>' + value.course_id + '</td>';
                            e_data += '<td>' + value.name + '</td>';
                            e_data += '<td>' + value.description + '</td>';
                            e_data += '<td>' + value.details + '</td>';
                            e_data += '<td>' + value.discount + '</td>';
                            e_data += '<td>' + value.price + '</td>';
                            e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.course, function (index, value) {
                                //console.log(value.id);
                                e_data += '<tr>';
                                e_data += '<td>' + value.course_id + '</td>';
                                e_data += '<td>' + value.name + '</td>';
                                e_data += '<td>' + value.description + '</td>';
                                e_data += '<td>' + value.details + '</td>';
                                e_data += '<td>' + value.discount + '</td>';
                                e_data += '<td>' + value.price + '</td>';
                                e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    $("#st_course_tb").append(e_data);
                    pager('st_course_tb');
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