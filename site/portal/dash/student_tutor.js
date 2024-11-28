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
                            document.getElementById('tut_names').innerHTML = "Welcome " + value.name;
                            document.getElementById('tut_date').innerHTML = getToday();
                            document.getElementById('tut_img').src = "data:image/png;base64," + value.pic;
                            getbalance(value.student_id, 'acc_amt', 'acc_no','0');
                            loadLessons();
                            loadContent();
                            loadtuitors();
                            //loadVideo();
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




function loadLessons() {
    try {
        $.ajax({
//
            url: url + "fetch/lesson",
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#st_class_bdy").html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#st_class_bdy").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.lesson;
                        if (!isJsonArray(value)) {
                            //console.log(value.id);
                            e_data += '<tr>';
                            e_data += '<td>';
                            e_data += '<button id="' + value.id + '" onclick="manageA(this)"  type="button"  class="btn btn-primary" >Attend</button>';
                            e_data += '</td>';
                            e_data += '<td>' + value.lesson_id + '</td>';
                            e_data += '<td>' + value.name + '</td>';
                            e_data += '<td>' + value.topic + '</td>';
                            e_data += '<td>' + value.details + '</td>';
                            e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.lesson, function (index, value) {
                                //console.log(value.id);
                                e_data += '<tr>';
                                e_data += '<td>';
                                e_data += '<button id="' + value.id + '" onclick="manageA(this)"  type="button"  class="btn btn-primary" >Attend</button>';
                                e_data += '</td>';
                                e_data += '<td>' + value.lesson_id + '</td>';
                                e_data += '<td>' + value.name + '</td>';
                                e_data += '<td>' + value.topic + '</td>';
                                e_data += '<td>' + value.details + '</td>';
                                e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    $("#st_class_tb").append(e_data);
                    pager('st_class_tb');
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





function loadVideo() {
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
                $("#div_content").html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#div_content").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.content;
                        if (!isJsonArray(value)) {
                            //console.log(value.id);
                            e_data += '<div class="carousel-item">';
                            e_data += '<div class="row">';
                            e_data += '    <div class="col-md-12 col-xl-3 d-flex flex-column justify-content-start">';
                            e_data += '       <div class="ml-xl-4 mt-3">';
                            e_data += '          <p class="card-title">' + value.content_id + '</p>';
                            e_data += '          <h3 class="font-weight-500 mb-xl-4 text-primary">' + value.title + '</h3>';
                            e_data += '          <p class="mb-2 mb-xl-0">' + value.description + '</p>';
                            e_data += '          <p class="mb-2 mb-xl-0">Posted: ' + getDate_formart(value.datereg) + '</p>';
                            e_data += '      </div>  ';
                            e_data += '  </div>';
                            e_data += '  <div class="col-md-12 col-xl-9">';
                            e_data += '      <div class="row">';
                            e_data += '         <div class="col-md-12 border-left">';
                            e_data += '             <iframe width="100%" height="500" src="' + value.video_link + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
                            e_data += '        </div>';
                            e_data += '    </div>';
                            e_data += '   </div>';
                            e_data += '  </div>';
                            e_data += '  </div>';

                        } else {
                            $.each(data.content, function (index, value) {
                                //console.log(value.id);
                                e_data += '<div class="carousel-item">';
                                e_data += '<div class="row">';
                                e_data += '    <div class="col-md-12 col-xl-3 d-flex flex-column justify-content-start">';
                                e_data += '       <div class="ml-xl-4 mt-3">';
                                e_data += '          <p class="card-title">' + value.content_id + '</p>';
                                e_data += '          <h3 class="font-weight-500 mb-xl-4 text-primary">' + value.title + '</h3>';
                                e_data += '          <p class="mb-2 mb-xl-0">' + value.description + '</p>';
                                e_data += '          <p class="mb-2 mb-xl-0">Posted: ' + getDate_formart(value.datereg) + '</p>';
                                e_data += '      </div>  ';
                                e_data += '  </div>';
                                e_data += '  <div class="col-md-12 col-xl-9">';
                                e_data += '      <div class="row">';
                                e_data += '         <div class="col-md-12 border-left">';
                                e_data += '             <iframe width="100%" height="500" src="' + value.video_link + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
                                e_data += '        </div>';
                                e_data += '    </div>';
                                e_data += '   </div>';
                                e_data += '  </div>';
                                e_data += '  </div>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    $('#div_content').append(e_data);
                    $('#div_content').find('.carousel-item:first-child').addClass('active');
                    //pager('st_note_tb');
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
                $("#st_tuitor_div").html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#st_tuitor_div").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.tuitor;
                        //console.log(value);
                        if (!isJsonArray(value)) {
                            e_data += '<div class="carousel-item" id="' + value.userid + '"  onclick="loadtuitorDet(this)">';
                            e_data += '    <div class="row">';
                            e_data += '        <div class="col-md-3 mb-4 stretch-card transparent">';
                            e_data += '            <div class="card card-tale">';
                            e_data += '                <div class="card-body">';
                            e_data += '                    <div class="profile"><img src="data:image/png;base64,' + value.pic + '" alt="image" width="100px" height="100px"><span class="online"></span></div>';
                            e_data += '                    <p class="mb-4">' + value.userid + '</p>';
                            e_data += '                    <p class="fs-30 mb-2">' + value.name + '</p>';
                            e_data += '                    <p>' + value.specialities + '</p>';
                            e_data += '                    <p>' + value.details + '</p>';
                            e_data += '                </div>';
                            e_data += '            </div>';
                            e_data += '        </div>';
                            e_data += '    </div>';
                            e_data += '</div>';
                        } else
                        {
                            $.each(data.tuitor, function (index, value) {
                                //console.log(value);
                                e_data += '<div class="carousel-item" id="' + value.userid + '"  onclick="loadtuitorDet(this)">';
                                e_data += '    <div class="row">';
                                e_data += '        <div class="col-md-3 mb-4 stretch-card transparent">';
                                e_data += '            <div class="card card-tale">';
                                e_data += '                <div class="card-body">';
                                e_data += '                    <div class="profile"><img src="data:image/png;base64,' + value.pic + '" alt="image" width="100px" height="100px"><span class="online"></span></div>';
                                e_data += '                    <p class="mb-4">' + value.userid + '</p>';
                                e_data += '                    <p class="fs-30 mb-2">' + value.name + '</p>';
                                e_data += '                    <p>' + value.specialities + '</p>';
                                e_data += '                    <p>' + value.details + '</p>';
                                e_data += '                </div>';
                                e_data += '            </div>';
                                e_data += '        </div>';
                                e_data += '    </div>';
                                e_data += '</div>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    //console.log(e_data);
                    $("#st_tuitor_div").append(e_data);
                    $('#st_tuitor_div').find('.carousel-item:first-child').addClass('active');
                } catch (e)
                {
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
    } catch (ex)
    {
        alert("Exception", ex);
    }
}


function loadtuitorDet(input) {
    let id = $(input).attr("id");
    try {
        $.ajax({
//
            url: url + "fetch/tuitor/0/" + id + "/null",
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                // $("#st_tuitor_div").html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    //$("#st_tuitor_div").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.tuitor;
                        //console.log(value);
                        if (!isJsonArray(value)) {
                            document.getElementById('st_tut_img').src = "data:image/png;base64," + value.pic;
                            document.getElementById('st_tut_name').innerHTML = value.name;
                            document.getElementById('st_tut_loca').innerHTML = value.loca;
                        } else
                        {
                            $.each(data.tuitor, function (index, value) {
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                } catch (e)
                {
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
    } catch (ex)
    {
        alert("Exception", ex);
    }
}

