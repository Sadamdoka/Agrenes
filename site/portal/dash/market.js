
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
//const email = sessionStorage.getItem('user');
//getAccount(email);
//sessionEmpty(email);

    loadItems();
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
                            document.getElementById('acc_userid').value = value.student_id;
                            document.getElementById('acc_name').value = value.name;
                            document.getElementById('tut_names').innerHTML = "Welcome " + value.name;
                            document.getElementById('tut_date').innerHTML = getToday();
                            document.getElementById('tut_img').src = "data:image/png;base64," + value.pic;
                            //loadSchool();

                            setAccountType(value.status, value.level, 'org_status');
                            getbalance(value.student_id, 'acc_amt', 'acc_no', '0');
                            loadItems();
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



function loadItems_new() {
    try {
        $.ajax({
//
            url: url + "fetch/item_owner/AJ10623294/0",
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                //$("#div_show").html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    // $("#row_1").empty();
                    //$("#row_2").empty();
                    //$("#row_3").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.item;
                        var j = 0;
                        var content = "";
                        for (var x in value) {
                            if (x % 6 === 0) {
                                $("#item_body").append("<tr id='row" + x + "'></tr>");
                                j = x;
                            }
                            $("#row" + j).append("<td><div><img src='" + products[i].image + "' style='width:130px;height:200px;'></div><div class='text-center'>" + products[i].name + " </br><div>" + products[i].price + "</div></div></td>");
                        }

                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }

                    //$('#item_table').append(e_data);
                    //$('#row_2').append(e_data);
                    //$('#row_3').append(e_data);
                    //$('#div_show').append(e_data);
                    //pager('st_class_tb');
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




function loadItems() {
    try {
        $.ajax({
//
            url: url + "fetch/item_owner/AJ10623294/0",
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                //$("#ai_cat_div").html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#ai_cat_div").empty();
                    let i = 0;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.item;
                        if (!isJsonArray(value)) {
                            //console.log(value.id);
                            e_data += '<div class="col-md-3 col-xl-4">'
                                    + '<div class="col-lg-4 grid-margin grid-margin-lg-0 stretch-card">'
                                    + '<div class="card bg-transparent border border-primary mb-3" style="min-width: 275px;">'
                                    + '<img src="data:image/png;base64,' + value.pic + '" class="card-img-top" alt="..." height="200">'
                                    + '<div class="card-body text-center">'
                                    + '<h5 class="card-text" style="color: green">' + value.itemid + '</h5>'
                                    + ' <h5 class="card-subtitle">' + value.name + '</h5>'
                                    + '<p class="card-text">' + value.details + '</p>'
                                        + ' <h4 class="card-text" style="color: red">'+value.cost+'</h4>'
                                    + '</div>'
                                    + '<div class="card-body d-flex justify-content-center">'
                                    + '<button type="button"id="' + value.id + '" name="' + value.itemid + '" onclick="confirm(this)" class="btn btn-primary">Buy</button> &nbsp;&nbsp;&nbsp;&nbsp;'
                                    + ' <a href="https://wa.me/+256702407168?text=Hi%20Agrenes"><button type="button" class="btn btn-success">WhatsApp to Order</button></a>'
                                    + ' </div>'
                                    + ' </div>'
                                    + ' </div>'
                                    + '</div>';
                        } else {
                            $.each(data.item, function (index, value) {
                                e_data += '<div class="col-md-3 col-xl-4">'
                                        + '<div class="col-lg-4 grid-margin grid-margin-lg-0 stretch-card">'
                                        + '<div class="card bg-transparent border border-primary mb-3" style="min-width: 275px;">'
                                        + '<img src="data:image/png;base64,' + value.pic + '" class="card-img-top" alt="..." height="200">'
                                        + '<div class="card-body text-center">'
                                        + '<h5 class="card-text" style="color: green">' + value.itemid + '</h5>'
                                        + ' <h5 class="card-subtitle">' + value.name + '</h5>'
                                        + '<p class="card-text">' + value.details + '</p>'
                                        + ' <h4 class="card-text" style="color: red">'+value.cost+'</h4>'
                                        + '</div>'
                                        + '<div class="card-body d-flex justify-content-center">'
                                        + '<button type="button"id="' + value.id + '" name="' + value.itemid + '" onclick="confirm(this)" class="btn btn-primary">Buy</button> &nbsp;&nbsp;&nbsp;&nbsp;'
                                        + ' <a href="https://wa.me/+256702407168?text=Hi%20Agrenes"><button type="button" class="btn btn-success">WhatsApp to Order</button></a>'
                                        + ' </div>'
                                        + ' </div>'
                                        + ' </div>'
                                        + '</div>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    $("#ai_cat_div").append(e_data);
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
    var item_id = $(input).attr("name");
    getbalance(userid, 'acc_bal', 'acc_name', '0');
    getItem(item_id);
    $('#pay_model').modal('show');
}

function getItem(input) {

    try {
        $.ajax({
            url: url + "fetch/item/0/" + input,
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
                        var jdata = data.item;
                        //above must be customised
                        if (!isJsonArray(jdata)) {
                            var value = jdata;
                            document.getElementById('item_id').value = value.id;
                            document.getElementById('item_syst_id').value = value.itemid;
                            document.getElementById('item_name').value = value.name;
                            document.getElementById('item_det').value = value.details;
                            document.getElementById('item_cost').value = value.cost;
                            document.getElementById('item_owner').value = value.owner;
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

function selectQty() {
    var qty = parseInt(document.getElementById('item_qty').value);
    var cost = parseInt(removeCommas(document.getElementById('item_cost').value));
    var results = parseInt(qty * cost);
    //return results;
    document.getElementById('item_total').value = addCommas(results); //value.cost;
}


document.getElementById('btn_buy').addEventListener('click', addPayment);
function addPayment(event) {
    event.preventDefault();
    var itemid = document.getElementById('item_id').value;
    var item_sys = document.getElementById('item_syst_id').value;
    var name = document.getElementById('item_name').value;
    var det = document.getElementById('item_det').value;
    var cost = document.getElementById('item_cost').value;
    var total = document.getElementById('item_total').value;
    var owner = document.getElementById('item_owner').value;
    //console.log(owner);

    var acc_bal = document.getElementById('acc_bal').value;
    var userid = document.getElementById('acc_userid').value;
    var nfrom = document.getElementById('acc_name').value;
    payItem(item_sys, userid, name + " | " + det, "0", "Wallet", nfrom, total, '0', acc_bal);
    addAcc(owner, owner, total);
    addtransaction(owner, owner, 'Purchase of Agri Inputs', total, "Purchase of Agri Inputs", "0");
}