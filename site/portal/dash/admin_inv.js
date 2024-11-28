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
                            //console.log(value.school);
                            document.getElementById('tut_names').innerHTML = "Welcome " + value.name;

                            //setAccountType(value.status, value.level, 'org_status');
                            getbalance(value.school, 'acc_amt', 'acc_no', '1');
                            loadItems(value.school);
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



function loadItems(input) {
    try {
        $.ajax({
//
            url: url + "fetch/item",
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#item_body").html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#item_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.item;
                        if (!isJsonArray(value)) {
                            //console.log(value.id);
                            e_data += '<tr>';
                            e_data += '<td>' + getItemStatus(value.status) + '</td>';
                            e_data += '<td>' + value.itemid + '</td>';
                            e_data += '<td>' + value.name + '</td>';
                            e_data += '<td>' + value.details + '</td>';
                            e_data += '<td>' + value.cost + '</td>';
                            e_data += '<td>';
                            e_data += '<button id="' + value.id + '" name="' + value.itemid + '" onclick="variyfItem(this)"  type="button"  class="btn btn-success" >Varify</button>';
                            e_data += '<button id="' + value.id + '" name="' + value.itemid + '" onclick="UnvariyfItem(this)"  type="button"  class="btn btn-danger" >Unvarify</button>';
                            e_data += '</td>';
                            e_data += '</tr>';

                            //$("#div_show").append(e_data);
                        } else {
                            $.each(data.item, function (index, value) {
                                //console.log(data.item.length);

                                e_data += '<tr>';
                                e_data += '<td>' + getItemStatus(value.status) + '</td>';
                                e_data += '<td>' + value.itemid + '</td>';
                                e_data += '<td>' + value.name + '</td>';
                                e_data += '<td>' + value.details + '</td>';
                                e_data += '<td>' + value.cost + '</td>';
                                e_data += '<td>';
                                e_data += '<button id="' + value.id + '" name="' + value.itemid + '" onclick="variyfItem(this)"  type="button"  class="btn btn-success" >Varify</button>';
                                e_data += '<button id="' + value.id + '" name="' + value.itemid + '" onclick="UnvariyfItem(this)"  type="button"  class="btn btn-danger" >Unvarify</button>';
                                e_data += '</td>';
                                e_data += '</tr>';

                                ++i;

                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    $('#items_table').append(e_data);
                    pager('items_table');
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

document.getElementById('add_item').addEventListener('click', addI);
function addI() {
    $('#depo_div').modal('show');

}
function setPic() {
    const pic = document.getElementById("item_pic");//.value;
    //let details = document.getElementById("tag").value;
    img.src = URL.createObjectURL(pic.files[0]);
}

document.getElementById('item_btn').addEventListener('click', addItem);
function addItem() {
    var formdata = new FormData();


    let cat = document.getElementById("item_cat").value;
    let owner = document.getElementById("owner").value;
    let name = document.getElementById("item").value;
    let details = document.getElementById("qty").value;
    let cost = document.getElementById("cost").value;
    let pic = document.getElementById("item_pic");//.value;

    formdata.append("category", cat);
    formdata.append("owner", "AJ10623294");
    formdata.append("pic", pic.files[0]);
    formdata.append("name", name);
    formdata.append("details", details);
    formdata.append("cost", cost);
    formdata.append("status", "0");

    fetch(url + "create/item",
            {
                body: formdata,
                method: 'POST'
            }).then(function (response) {
        //console.log('Response: ' + response);
        if (response.status === 200) {
            alert("Item Added");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });

}



function variyfItem(input) {
    var formdata = new FormData();
    let itemid = $(input).attr("name");

    formdata.append("itemid", itemid);
    formdata.append("status", "1");

    fetch(url + "update/item_status",
            {
                body: formdata,
                method: 'POST'
            }).then(function (response) {
        //console.log('Response: ' + response);
        if (response.status === 200) {
            alert("Product Varified");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });

}

function UnvariyfItem(input) {
    var formdata = new FormData();
    let itemid = $(input).attr("name");

    formdata.append("itemid", itemid);
    formdata.append("status", "0");

    fetch(url + "update/item_status",
            {
                body: formdata,
                method: 'POST'
            }).then(function (response) {
        //console.log('Response: ' + response);
        if (response.status === 200) {
            alert("Product Unvarified");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });

}