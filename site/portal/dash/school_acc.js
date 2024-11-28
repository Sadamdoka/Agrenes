/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


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

                            document.getElementById('w_userid').value = value.school;
                            document.getElementById('w_name').value = value.name;
                            document.getElementById('w_no').value = value.phone;


                            document.getElementById('d_userid').value = value.school;
                            document.getElementById('d_name').value = value.name;
                            document.getElementById('d_no').value = value.phone;


                            document.getElementById('sw_userid').value = value.school;
                            document.getElementById('sw_name').value = value.name;
                            document.getElementById('sw_no').value = value.phone;


                            document.getElementById('sd_userid').value = value.school;
                            document.getElementById('sd_name').value = value.name;
                            document.getElementById('sd_no').value = value.phone;


                            document.getElementById('s_userid').value = value.school;
                            document.getElementById('s_name').value = value.name;
                            document.getElementById('v_s_userid').value = value.school;
                            document.getElementById('v_s_name').value = value.name;

                            document.getElementById('sch_user_names').innerHTML = "Welcome " + value.name;
                            document.getElementById('sch_date').innerHTML = getToday();
                            document.getElementById('tut_img').src = "data:image/png;base64," + value.pic;


                            //setAccountType(value.status, value.level, 'org_status');
                            getbalance(value.school, 'acc_amt', 'acc_no', '1');
                            getbalanceTable(value.school, 'accounts_table', 'sacco_actions');

                            getAccountNumber(value.school, '1');
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


function getAccountNumber(input, type) {
    try {
        $.ajax({
            //
            url: url + "fetch/account/" + input + "/" + type,
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
                //console.log("Sadam");
                //console.log(e_data);
                try {
                    // $("#school").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var jdata = data.fin_accounts;
                        if (!isJsonArray(jdata)) {
                            //token = jdata.token;
                            loadpayments(jdata.account_id, '2', 'pay_table', 'pay_body');
                            loadpayments(jdata.account_id, '1', 'depo_table', 'depo_body');
                            loadpayments(jdata.account_id, '0', 'with_table', 'with_body');
                            //loadpayments(jdata.account_id);
                            loadtransaction(jdata.account_id);
                        } else {
                            $.each(data.fin_accounts, function (index, value) {

                            });
                        }
                    } else {
                        row += '<tr><td colspan="5" align="center">No data</td></tr>';
                    }
                    // $("#school").append(e_data);
                    //searchInvoices();
                } catch (e) {
                    console.log(e);
                    //ShowError("Response Error", e, getMesiboToken);
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


document.getElementById('edit_btn').addEventListener('click', editUser);
function editUser() {
    document.getElementById('edit_div_1').style.display = 'block';
    document.getElementById('edit_div_2').style.display = 'block';
}



function checkClubSacco(input) {
    try {
        $.ajax({
//
            url: url + "fetch/club_members/0/null/" + input,
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                //$("#v_sel_body").html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    //$("#usr_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.club_members;
                        if (!isJsonArray(value)) {
                            getbalanceTable_byAccount(value.club_id, 'sacco_accounts_table', 'sacco_actions');
                        } else {
                            $.each(data.club_members, function (index, value) {
                                getbalanceTable_byAccount(value.club_id, 'sacco_accounts_table', 'sacco_actions');
                                ++i;
                            });
                        }

                        document.getElementById('my_sacco').style.display = 'block';
                        document.getElementById('sacco_depo_div').style.display = 'block';
                    } else {
                        document.getElementById('my_sacco').style.display = 'none';
                        document.getElementById('sacco_depo_div').style.display = 'none';
                        //row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    //$("#v_sel_table").append(e_data);
                    //pager('v_sel_table');
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


function loadtransaction(input) {
    try {
        $.ajax({
//
            url: url + "fetch/transaction/0/null/" + input,
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#acc_tran_body").html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#acc_tran_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.transaction;
                        if (!isJsonArray(value)) {
                            //console.log(value.id);
                            e_data += '<tr>';
                            e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                            e_data += '<td>' + value.tranid + '</td>';
                            e_data += '<td>' + value.description + '</td>';
                            e_data += '<td>' + value.amount + '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.transaction, function (index, value) {
                                //console.log(value.id);
                                e_data += '<tr>';
                                e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                                e_data += '<td>' + value.tranid + '</td>';
                                e_data += '<td>' + value.description + '</td>';
                                e_data += '<td>' + value.amount + '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    $("#acc_tran").append(e_data);
                    pager('acc_tran');
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





document.getElementById('with_btn').addEventListener('click', with_Div);
function with_Div() {
    var userid = document.getElementById('w_userid').value;
    //var item_id = $(input).attr("name");

    getbalanceSelectAll(userid, 'w_sel_acc');
    getbalance(userid, 'w_bal');
    //getItem(item_id);
    $('#with_div').modal('show');
}

function getBal_dds(input, elm) {
    var sid = $(input).attr('id');
    //console.log(sid);
    let id = $("#" + sid + " :selected").attr('id');
    let name = $("#" + sid + " :selected").attr('value');
    let amt = $("#" + sid + " :selected").attr('name');

    //console.log(id + name + amt);
    document.getElementById(elm).value = "Ugx " + amt;
}


document.getElementById('depo_btn').addEventListener('click', depo_div);
function depo_div() {
    var userid = document.getElementById('d_userid').value;
    //var item_id = $(input).attr("name");
    getbalanceSelectAll(userid, 'd_sel_acc');
    //getbalance(userid, 'd_bal');
    //getItem(item_id);
    $('#depo_div').modal('show');

}


document.getElementById('w_btn_with').addEventListener('click', withdraw);
function withdraw() {
    let userid = document.getElementById("w_userid").value;
    let tel = document.getElementById("w_no").value;
    let amount = document.getElementById("w_amt").value;
    let bal = document.getElementById("w_bal").value;
    let accid = $("#w_sel_acc :selected").attr('id');

    if (parseInt(removeCommas(bal)) >= parseInt(removeCommas(amount))) {
        alert("Insufficient Credit");
    } else {
        if (valForm(tel, "Provid Correct Phone Number") === false || valForm(amount, "Provid Correct Amount") === false) {
            //empty fields
        } else {
            addtransaction(userid, accid, tel, amount, "Withraw", "1");
            minusAcc(accid, userid, amount);
            //minusAcc(userid, amount);
        }
    }
}


document.getElementById('d_btn_depo').addEventListener('click', deposit_credit);
function deposit_credit() {
    let userid = document.getElementById("d_userid").value;
    let tel = document.getElementById("d_no").value;
    let amt = document.getElementById("d_amt").value;
    let accid = $("#d_sel_acc :selected").attr('id');

    console.log(amt);

    if (valForm(tel, "Provid Correct Phone Number") === false || valForm(amt, "Provid Correct Amount") === false) {
        //empty fields
    } else {
        addtransaction(userid, accid, tel, amt, "Deposit", "2");
        addAcc(accid, userid, amt);
    }

}


document.getElementById('sacco_btn').addEventListener('click', sacco_create);
function sacco_create() {
    //loadAllUsers();
    $('#create_sacco').modal('show');
}


document.getElementById('create_sacco_btn').addEventListener('click', create_group_sacco);
function create_group_sacco() {
    let userid = document.getElementById("s_userid").value;
    let name = document.getElementById("sacco_name").value;

    var formdata = new FormData();

    formdata.append("userid", userid);
    formdata.append("name", name);
    formdata.append("number", "NA");
    formdata.append("amt", "100,000");
    formdata.append("type", "1");

    fetch(url + "create/account",
            {
                body: formdata,
                method: 'POST'
            }).then(function (response) {
        //console.log('Response: ' + response);
        if (response.status === 200) {
            alert("Sacco | Union | Group Created");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });

}




document.getElementById('btn_invite').addEventListener('click', invite_sacco_members);
function invite_sacco_members() {
    let userid = document.getElementById("s_userid").value;
    getbalanceSelect(userid, 'sel_sacco_acts');
    loadAllUsers();
    $('#invite_sacco').modal('show');
}


function getbalanceSelectAll(input, elm) {
    try {
        $.ajax({
            //
            url: url + "fetch/account/0/" + input + "/" + input,
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                //$("#" + elm).html('<tr><td colspan="5" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');

            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#" + elm).empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var jdata = data.fin_accounts;
                        if (!isJsonArray(jdata)) {
                            e_data += '<option id="' + jdata.account_id + '" value="' + jdata.userid + '" name="' + jdata.amount + '" ">';
                            e_data += jdata.account_id + " | " + jdata.name;
                            e_data += '</option>';
                        } else {
                            $.each(data.fin_accounts, function (index, value) {

                                e_data += '<option id="' + value.account_id + '" value="' + value.userid + '" name="' + value.amount + '" ">';
                                e_data += value.account_id + " | " + value.name;
                                e_data += '</option>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="5" align="center">No data</td></tr>';
                    }
                    $("#" + elm).append(e_data);
                    //searchInvoices();
                } catch (e) {
                    ShowError("Response Error", e, getbalanceSelectAll);
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


function getbalanceSelect(input, elm) {
    try {
        $.ajax({
            //
            url: url + "fetch/account/" + input + "/1",
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                //$("#" + elm).html('<tr><td colspan="5" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');

            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#" + elm).empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var jdata = data.fin_accounts;
                        if (!isJsonArray(jdata)) {
                            e_data += '<option id="' + jdata.account_id + '" value="' + jdata.userid + '" name="' + jdata.amount + '" ">';
                            e_data += jdata.account_id + " | " + jdata.name;
                            e_data += '</option>';
                        } else {
                            $.each(data.fin_accounts, function (index, value) {

                                e_data += '<option id="' + value.account_id + '" value="' + value.userid + '" name="' + value.amount + '" ">';
                                e_data += value.account_id + " | " + value.name;
                                e_data += '</option>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="5" align="center">No data</td></tr>';
                    }
                    $("#" + elm).append(e_data);
                    //searchInvoices();
                } catch (e) {
                    ShowError("Response Error", e, getbalanceSelect);
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

function loadAllUsers() {
    try {
        $.ajax({
//
            url: url + "fetch/student",
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
                            e_data += '<td>' + value.study_level + '</td>';
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
                                e_data += '<td>' + value.study_level + '</td>';
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


function addSacco_Member(input) {
    let userid = $(input).attr("id");
    let name = $(input).attr("name");
    let club_id = $("#sel_sacco_acts :selected").attr('id');//document.getElementById("sch_con_level").value;


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


document.getElementById('btn_view_sm').addEventListener('click', view_Sacco_m);
function view_Sacco_m() {
    let userid = document.getElementById("s_userid").value;
    getbalanceSelect(userid, 'v_sel_sacco_acts');
    loadClubMembers();
    $('#view_members').modal('show');
}



function loadClubMembers(input) {
    let accid = $("#v_sel_sacco_acts :selected").attr('id');//document.getElementById("sch_con_level").value;
    try {
        $.ajax({
//
            url: url + "fetch/club_members/0/" + accid + "/null",
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                //$("#v_sel_body").html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
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
                        var value = data.club_members;
                        if (!isJsonArray(value)) {
                            //console.log(value.id);
                            e_data += '<tr>';
                            e_data += '<td>' + value.userid + '</td>';
                            e_data += '<td>' + value.name + '</td>';
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





document.getElementById('btn_depo_sacco').addEventListener('click', depoSacco_div);
function depoSacco_div() {
    var userid = document.getElementById('sd_userid').value;
    //var item_id = $(input).attr("name");
    clubAccountID(userid, 'sd_sel_acc');
    //getbalance(userid, 'd_bal');
    //getItem(item_id);
    $('#sacco_depo').modal('show');
}

//document.getElementById('swith_btn').addEventListener('click', withSacco_Div);
function withSacco_Div() {
    var userid = document.getElementById('sw_userid').value;
    //var item_id = $(input).attr("name");
    //clubAccountID(userid, 'w_sel_acc');
    //getbalance(userid, 'w_bal');
    //getItem(item_id);
    $('#sacco_with').modal('show');
}


function clubAccountID(input, elm) {
    try {
        $.ajax({
//
            url: url + "fetch/club_members/0/null/" + input,
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                //$("#v_sel_body").html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    //$("#usr_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.club_members;
                        if (!isJsonArray(value)) {
                            //console.log(value.club_id);
                            getbalanceSelectAll(value.club_id, elm);
                        } else {
                            $.each(data.club_members, function (index, value) {
                                // console.log(value.club_id);
                                getbalanceSelectAll(value.club_id, elm);
                                ++i;
                            });
                        }
                    } else {
                        //row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    //$("#v_sel_table").append(e_data);
                    //pager('v_sel_table');
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


document.getElementById('sd_btn_depo').addEventListener('click', deposit_sacco);
function deposit_sacco() {
    let userid = document.getElementById("sd_name").value;
    let tel = document.getElementById("sd_no").value;
    let amount = document.getElementById("sd_amt").value;
    let bal = document.getElementById("sd_bal").value;
    let accid = $("#sd_sel_acc :selected").attr('id');

    if (valForm(tel, "Provid Correct Phone Number") === false || valForm(amount, "Provid Correct Amount") === false) {
        //empty fields
    } else {
        addtransaction(userid, accid, tel, amount, "Deposit", "2");
        addAcc(accid, userid, amount);
    }

}


function getSacco_Sel(input, elm, elm_2, elm_3) {
    var sid = $(input).attr('id');
    //console.log(sid);
    let id = $("#" + sid + " :selected").attr('id');
    let name = $("#" + sid + " :selected").attr('value');
    let amt = $("#" + sid + " :selected").attr('name');

    //console.log(id + name + amt);
    document.getElementById(elm_2).value = id;
    document.getElementById(elm_3).value = name;
    document.getElementById(elm).value = "Ugx " + amt;
}