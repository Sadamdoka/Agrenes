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
                            document.getElementById('acc_userid').value = value.student_id;
                            document.getElementById('acc_name').value = value.name;
                            document.getElementById('tut_id').innerHTML = value.student_id;
                            document.getElementById('tut_email').innerHTML = value.email;
                            document.getElementById('tut_tel').innerHTML = value.phone;
                            document.getElementById('tut_names').innerHTML = "Welcome " + value.name;
                            document.getElementById('tut_date').innerHTML = getToday();
                            document.getElementById('tut_img').src = "data:image/png;base64," + value.pic;

                            setAccountType(value.status, value.level, 'org_status');
                            getbalance(value.student_id, 'acc_amt', 'acc_no', '0');
                            getApi_key(value.student_id);
                            loadLessons();
                            loadCourses();
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
                    ShowError("Response Error", e, getMesiboToken);
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
                            e_data += '<button id="' + value.id + '" name="' + value.course_id + '"  onclick="ManageCourse(this)"  type="button"  class="btn btn-primary" >View</button>';
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
                                e_data += '<button id="' + value.id + '"  name="' + value.course_id + '" onclick="ManageCourse(this)"  type="button"  class="btn btn-primary" >View</button>';
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
    //var userid = document.getElementById('tut_id').innerHTML;
    //console.log(userid);
    var item_id = $(input).attr("id");
    var cid = $(input).attr("name");
    //getbalance(userid, 'acc_bal', 'acc_name', '0');
    getCourse(item_id);
    loadContent(cid);

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


function loadContent(cid) {
    try {
        $.ajax({
//
            url: url + "fetch/content_bi/0/null/" + cid,
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
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.content;
                        if (!isJsonArray(value)) {
                            //console.log(value.id);
                            e_data += '<tr>';
                            e_data += '<td>';
                            e_data += '<button id="' + value.id + '"  name="' + value.doc + '" onclick="confirm(this)"  type="button"  class="btn btn-primary" >View</button>';
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
                                e_data += '<button id="' + value.id + '"  name="' + value.doc + '" onclick="confirm(this)"  type="button"  class="btn btn-primary" >View</button>';
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



function loadVideo() {
    try {
        $.ajax({
//
            url: url + "fetch/content/1",
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

                //console.log(data);
                try {
                    $("#div_content").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.content;
                        if (!isJsonArray(value)) {
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
                            // e_data += '             <iframe width="100%" height="500" src="' + getYoutubeID(value.video_link) + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>';
                            e_data += '             <iframe width="100%" height="500" src="https://www.youtube.com/embed/' + getYoutubeID(value.video_link) + '" frameborder="0" allowfullscreen></iframe>';
                            e_data += '        </div>';
                            e_data += '    </div>';
                            e_data += '   </div>';
                            e_data += '  </div>';
                            e_data += '  </div>';

                        } else {
                            $.each(data.content, function (index, value) {
                                //console.log(getYoutubeID(value.video_link));
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
                                //e_data += '             <iframe width="100%" height="500" src="' + getYoutubeID(value.video_link) + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>';
                                e_data += '             <iframe width="100%" height="500" src="https://www.youtube.com/embed/' + getYoutubeID(value.video_link) + '" frameborder="0" allowfullscreen></iframe>';
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



function confirm(input) {
    var userid = document.getElementById('acc_userid').value;
    //console.log(userid);
    var item_id = $(input).attr("id");
    //let pdf = $(input).attr("name");
    //document.getElementById('item_data').setAttribute('name', pdf);
    //const pdf_xs = sessionStorage.setItem('pdf', pdf);
    getbalance(userid, 'acc_bal', 'acc_no', '0');
    getContent(item_id);
    document.getElementById('div_loading').style.display = 'none';
    document.getElementById('acc_det_div').style.display = 'none';
    document.getElementById('acc_div').style.display = 'none';
    document.getElementById('acc_read_div').style.display = 'none';
    document.getElementById('btn_read').style.display = 'none';
    document.getElementById('btn_buy').style.display = 'none';
    document.getElementById('div_loading').style.display = 'block';
    $('#manage_content_model').modal('hide');
    $('#pay_model').modal('show');
}


function getContent(input) {
    try {
        $.ajax({
            url: url + "fetch/content/" + input + "/null",
            dataType: 'json',
            type: 'get',
            cache: false,
            processData: false,
            contentType: false,
            beforeSend: function () {
                //reset container
                // $("#div_pay").html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');

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
                        var jdata = data.content;
                        //above must be customised
                        if (!isJsonArray(jdata)) {
                            var value = jdata;
                            //console.log(value.userid);
                            document.getElementById('item_id').value = value.id;
                            document.getElementById('item_syst_id').value = value.content_id;
                            document.getElementById('item_name').value = value.title;
                            document.getElementById('item_det').value = value.description;
                            document.getElementById('item_total').value = value.price;
                            document.getElementById('item_tut_id').value = value.userid;
                            document.getElementById('item_data').setAttribute('name', value.doc);
                            const pdf_xs = sessionStorage.setItem('pdf', value.doc);

                            var usr = document.getElementById('acc_userid').value;
                            var pc = value.price;
                            if (pc === '0' || !pc || pc === 'Free' || pc === null) {
                                //gotoPdfView(data);

                                document.getElementById('div_loading').style.display = 'none';
                                document.getElementById('acc_read_div').style.display = 'block';
                                document.getElementById('btn_read').style.display = 'block';
                                document.getElementById('acc_div').style.display = 'none';
                                document.getElementById('acc_det_div').style.display = 'none';
                                document.getElementById('btn_buy').style.display = 'none';
                            } else {
                                //console.log(value.content_id + "|" + usr);
                                checkItems(value.content_id, usr);
                            }
                        } else {
                            $.each(data.content, function (index, value) {
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


document.getElementById('btn_buy').addEventListener('click', addPayment);
function addPayment(event) {
    event.preventDefault();

    var itemid = document.getElementById('item_id').value;
    var item_sys = document.getElementById('item_syst_id').value;
    var name = document.getElementById('item_name').value;
    var det = document.getElementById('item_det').value;
    //var cost = document.getElementById('item_cost').value;
    var total = document.getElementById('item_total').value;
    var data = document.getElementById('item_data');

    //console.log(total);

    var bal = document.getElementById('acc_bal').value;
    var userid = document.getElementById('acc_userid').value;
    var nfrom = document.getElementById('acc_name').value;
    var tut = document.getElementById('item_tut_id').value;

    //console.log(bal);
    //getRecos(userid, total, tut, det);

    //addtransaction(tut, tut, det, total, "Content Purchase", "0");
    payItem(item_sys, userid, name + " | " + det, "0", "Wallet", nfrom, total, "0", bal);

    var top = calc_Charge('AC_220323469', total, '15');
    //To Tuitor
    addAcc(tut, tut, total);
    addtransaction(tut, tut, det, total, "Content Purchase", "0");
    //Agrenes
    addAcc('AC_220323469', 'AC_220323469', top);
    addtransaction('AC_220323469', 'AC_220323469', 'Commission Earning', top, "Commission Earnings", "0");
    minusAcc(tut, tut, top);
    addtransaction(tut, tut, det, top, "Commission Deduction", "0");



}


document.getElementById('btn_read').addEventListener('click', readBook);
function readBook(event) {
    event.preventDefault();
    var data = document.getElementById('item_data');
    //console.log(data);
    gotoPdfView(data);
}

function checkItems(ref, usr) {
    try {
        $.ajax({
            url: url + "fetch/payment_ref/" + ref + "/" + usr,
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
                        var jdata = data.payment;
                        //console.log(jdata);
                        //if(jdata.){}else{}
                        document.getElementById('div_loading').style.display = 'none';
                        document.getElementById('acc_read_div').style.display = 'block';
                        document.getElementById('btn_read').style.display = 'block';
                        document.getElementById('acc_div').style.display = 'none';
                        document.getElementById('acc_det_div').style.display = 'none';
                        document.getElementById('btn_buy').style.display = 'none';
                        //alert('You already own this, please proceed to read');
                    } else {
                        //alert('You dont own this, please proceed to purchase');
                        document.getElementById('div_loading').style.display = 'none';
                        document.getElementById('acc_det_div').style.display = 'block';
                        document.getElementById('acc_div').style.display = 'block';
                        document.getElementById('acc_read_div').style.display = 'none';
                        document.getElementById('btn_read').style.display = 'none';
                        document.getElementById('btn_buy').style.display = 'block';
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