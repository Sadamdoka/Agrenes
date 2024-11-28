/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var url = "https://esafeafrica.com/api.agro/service/";
//var url = "http://localhost:8080/api.agro/service/";
var user = '';
var role = '';
$(document).ready(function () {
    //getting email in url
    document.addEventListener('contextmenu', event => event.preventDefault());
});

function sessionEmpty(input) {
    if (input === null) {
        // ...
        //console.log("No Session Logged In");
        window.location.href = 'index.html';
        //location.location.href = 'index.html';
        //Alert("");
    }
}

function navLink(input) {
    var usr = '?' + user;
    input.href += input;
}

function isJson(value) {
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        return true; // It's a JSON object
    } else if (typeof value === 'string') {
        return isValidJsonString(value); // Check if it's a valid JSON string
    }
    return false; // Neither
}

function setRole(input) {
    if (input === '3') {
        document.getElementById('acc_div').style.visibility = 'visible';
    } else {
        document.getElementById('acc_div').style.visibility = 'hidden';
    }
}

// Set timeout variables.
var timoutWarning = 840000; // Display warning in 14 Mins.
var timoutNow = 60000; // Warning has been shown, give the user 1 minute to interact
var logoutUrl = 'index.html'; // URL to logout page.

var warningTimer;
var timeoutTimer;

// Start warning timer.
function StartWarningTimer() {
    warningTimer = setTimeout("IdleWarning()", timoutWarning);
}

// Reset timers.
function ResetTimeOutTimer() {
    clearTimeout(timeoutTimer);
    StartWarningTimer();
    $("#timeout").dialog('close');
}

// Show idle timeout warning dialog.
function IdleWarning() {
    clearTimeout(warningTimer);
    timeoutTimer = setTimeout("IdleTimeout()", timoutNow);
    $("#timeout").dialog({
        modal: true
    });
    // Add code in the #timeout element to call ResetTimeOutTimer() if
    // the "Stay Logged In" button is clicked
}

// Logout the user.
function IdleTimeout() {
    window.location = logoutUrl;
}


//Printing Tables
function printTable(input) {
    var divToPrint = document.getElementById(input);
    var htmlToPrint = '' +
            '<style type="text/css">' +
            'table th, table td {' +
            'border:0.5px solid #000;' +
            'padding:0.5em;' +
            '}' +
            '</style>';
    htmlToPrint += divToPrint.outerHTML;
    newWin = window.open("");
    newWin.document.write(htmlToPrint);
    newWin.print();
    newWin.close();
}

function exportTable(input) {
    $('#' + input).tableHTMLExport({
        type: 'csv',
        filename: 'excel_export.csv'
    });

}
function pager(input) {
    $('#' + input).DataTable({
        //scrollY: 800,
        scrollX: true,
    });
}

function idle_timeout() {

    const idleDurationSecs = 60;    // X number of seconds
    const redirectUrl = 'index.html';  // Redirect idle users to this URL
    let idleTimeout; // variable to hold the timeout, do not modify

    const resetIdleTimeout = function () {

        // Clears the existing timeout
        if (idleTimeout)
            clearTimeout(idleTimeout);

        idleTimeout = setTimeout(() => location.href = redirectUrl, idleDurationSecs * 10000);
    };

    // Init on page load
    resetIdleTimeout();

    // Reset the idle timeout on any of the events listed below
    ['click', 'touchstart', 'mousemove'].forEach(evt =>
        document.addEventListener(evt, resetIdleTimeout, false)
    );
}

function disableRight() {
    //edit this message to say what you want

    var message = "Function Disabled!";
///////////////////////////////////
    function clickIE4() {
        if (event.button === 2) {
            alert(message);
            return false;
        }
    }

    function clickNS4(e) {
        if (document.layers || document.getElementById && !document.all) {
            if (e.which === 2 || e.which === 3) {
                alert(message);
                return false;
            }
        }
    }

    if (document.layers) {
        document.captureEvents(Event.MOUSEDOWN);
        document.onmousedown = clickNS4;
    } else if (document.all && !document.getElementById) {
        document.onmousedown = clickIE4;
    }

    document.oncontextmenu = new Function("alert(message);return false");
}

function touchHandler(event)
{
    var touches = event.changedTouches,
            first = touches[0],
            type = "";
    switch (event.type)
    {
        case "touchstart":
            type = "mousedown";
            break;
        case "touchmove":
            type = "mousemove";
            break;
        case "touchend":
            type = "mouseup";
            break;
        default:
            return;
    }


    var simulatedEvent = document.createEvent("MouseEvent");
    simulatedEvent.initMouseEvent(type, true, true, window, 1,
            first.screenX, first.screenY,
            first.clientX, first.clientY, false,
            false, false, false, 0/*left*/, null);

    first.target.dispatchEvent(simulatedEvent);
    event.preventDefault();
}

function init()
{
    document.addEventListener("touchstart", touchHandler, true);
    document.addEventListener("touchmove", touchHandler, true);
    document.addEventListener("touchend", touchHandler, true);
    document.addEventListener("touchcancel", touchHandler, true);
}

function datepicker(input) {
    $('#' + input).pickadate();
}



function getDate_formart(input) {
    var date = new Date(input).toISOString().slice(0, 10);
    //var date = input.getHours() + ":" + input.getMinutes() + ", " + input.toDateString();
    return date;
}

function dayCounter(input) {
    let today = new Date().toISOString().slice(0, 10);
    const endDate = today;
    const diffInMs = new Date(endDate) - new Date(input);
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    return diffInDays;
}

function getToday() {
    const date = new Date();
    return date;
    //document.getElementById(input).innerHTML = date;
}



function base64toPDF(data, userid) {
    var bufferArray = base64ToArrayBuffer(data);
    var blobStore = new Blob([bufferArray], {type: "application/pdf"});
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blobStore);
        return;
    }

    var data = window.URL.createObjectURL(blobStore);
    var link = document.createElement('a');
    document.body.appendChild(link);
    link.href = data;
    link.download = "esafecard_" + userid + ".pdf";
    //link.open = "lemax_file.pdf";
    link.click();
    window.URL.revokeObjectURL(data);
    link.remove();
}

function base64ToArrayBuffer(data) {
    var bString = window.atob(data);
    var bLength = bString.length;
    var bytes = new Uint8Array(bLength);
    for (var i = 0; i < bLength; i++) {
        var ascii = bString.charCodeAt(i);
        bytes[i] = ascii;
    }
    return bytes;
}


function removeCommas(input) {
    var result = input.replaceAll(',', '');
    return result;
}

function addCommas(input) {
    return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


function valForm(x, msg) {
    //let x = document.getElementById(input).value;
    if (!x) {
        alert(msg);
        return false;
    }
}

function valNumber(x, msg) {
    //event.preventDefault();
    //let x = document.getElementById(input).value;
    if (isNaN(x)) {
        alert(msg);
        return false;
    }
}

function valEmail(x, msg) {
    //let x = document.getElementById(input).value;
    var mailformat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (!x.match(mailformat)) {
        alert(msg);
        return false;
    }
}

function valTel(x, msg) {
    var telFormat = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if (x.match(telFormat)) {
        alert(msg);
        return false;
    }
}

function valImg(x, msg) {
    if (!x.files.length) {
        alert(msg);
        return false;
    }
}


function valEmail_x(elm) {
    //let x = document.getElementById(input).value;
    var mailformat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    document.querySelector('[id="' + elm + '"]').addEventListener("keyup", function (ev) {
        if (mailformat.test(document.querySelector('[id="' + elm + '"]').value) === false)
            return this.style.backgroundColor = "#FF5733";
        this.style.backgroundColor = "#fff";
    });
}


function valTel_x(elm) {
    var format_1 = /^[+]{1}[0-9]{3}[0-9]{3}[0-9]{3}[0-9]{3}$/;
    var format_2 = /^[0-9]{3}[0-9]{3}[0-9]{3}[0-9]{3}$/;
    var format_3 = /^[0-9]{4}[0-9]{3}[0-9]{3}$/;
    document.querySelector('[id="' + elm + '"]').addEventListener("keyup", function (ev) {
        if (format_3.test(document.querySelector('[id="' + elm + '"]').value) === false)
            return this.style.backgroundColor = "#FF5733";
        this.style.backgroundColor = "#fff";
    });
}

function valMail_x(x, msg) {
    var mailformat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (!x.match(mailformat)) {
        alert(msg);
        return false;
    }
}

function valPhone_x(x, msg) {
    var format_1 = /^[+]{1}[0-9]{3}[0-9]{3}[0-9]{3}[0-9]{3}$/;
    var format_2 = /^[0-9]{3}[0-9]{3}[0-9]{3}[0-9]{3}$/;
    var format_3 = /^[0-9]{4}[0-9]{3}[0-9]{3}$/;
    if (!x.match(format_3)) {
        alert(msg);
        return false;
    }
}

function getMesiboToken(token) {
    try {
        $.ajax({
            //
            url: url + "fetch/app/2",
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
                        var jdata = data.app_tokens;
                        if (!isJsonArray(jdata)) {
                            //token = jdata.token;
                            //console.log(jdata);
                            document.getElementById(token).value = jdata.token;
                        } else {
                            $.each(data.app_tokens, function (index, value) {

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

function getYoutubeID(url) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[2].length == 11) {
        return match[2];
    } else {
        return 'error';
    }
}

function gotoPdfView(input) {

    let pdf = $(input).attr("name");
    sessionStorage.setItem('pdf', pdf);
    //var queryString = "?" + email;
    window.open('../pdf/pdf_view.html', '_blank');
}

function base64toPDF(data) {
    var bufferArray = base64ToArrayBuffer(data);
    var blobStore = new Blob([bufferArray], {type: "application/pdf"});
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blobStore);
        return;
    }

    var data = window.URL.createObjectURL(blobStore);
    var link = document.createElement('a');
    document.body.appendChild(link);
    link.href = data;
    console.log(link);
    //link.download = "agrenes.pdf";
    link.open = "agrenes.pdf";
    link.click();
    window.URL.revokeObjectURL(data);
    link.remove();
}






function getbalance(input, elm, elm_s, type) {
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
                            document.getElementById(elm).value = jdata.amount;
                            document.getElementById(elm).innerHTML = "Ugx " + jdata.amount;
                            document.getElementById(elm_s).innerHTML = jdata.account_id;
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




function getbalanceTable(input, elm, s_btn) {
    try {
        $.ajax({
            //
            url: url + "fetch/account/0/" + input + "/null",
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
                    // $("#school").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var jdata = data.fin_accounts;
                        if (!isJsonArray(jdata)) {
                            document.getElementById(s_btn).style.display = 'none';
                            e_data += '<tr>';
                            e_data += '<td>' + jdata.account_id + '</td>';
                            e_data += '<td>' + jdata.name + '</td>';
                            e_data += '<td>' + jdata.amount + '</td>';
                            e_data += '<td>' + getAccountType(jdata.type) + '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.fin_accounts, function (index, value) {

                                document.getElementById(s_btn).style.display = 'block';
                                e_data += '<tr>';
                                e_data += '<td>' + value.account_id + '</td>';
                                e_data += '<td>' + value.name + '</td>';
                                e_data += '<td>' + value.amount + '</td>';
                                e_data += '<td>' + getAccountType(value.type) + '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="5" align="center">No data</td></tr>';
                    }
                    $("#" + elm).append(e_data);
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



function getbalanceTable_byAccount(input, elm, s_btn) {
    try {
        $.ajax({
            //
            url: url + "fetch/account/0/null/" + input,
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
                    // $("#school").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var jdata = data.fin_accounts;
                        if (!isJsonArray(jdata)) {
                            e_data += '<tr>';
                            e_data += '<td>' + jdata.account_id + '</td>';
                            e_data += '<td>' + jdata.name + '</td>';
                            e_data += '<td>' + jdata.amount + '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.fin_accounts, function (index, value) {

                                e_data += '<tr>';
                                e_data += '<td>' + value.account_id + '</td>';
                                e_data += '<td>' + value.name + '</td>';
                                e_data += '<td>' + value.amount + '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="5" align="center">No data</td></tr>';
                    }
                    $("#" + elm).append(e_data);
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

function getAccountType(input) {
    if (input === '0') {
        return 'Normal Account';
    } else {
        return 'Sacco Account';
    }
}


function payItem(ref, user, reason, type, mode, from, amount, status, acc_bal) {
    //console.log(amount + acc_bal);

    var bal = parseInt(removeCommas(acc_bal));
    var amt = parseInt(removeCommas(amount));
    var res = amt <= bal;
    if (res) {

        let formData = new FormData();
        //console.log(officer);
        formData.append('refid', ref);
        formData.append('userid', user);
        formData.append('reason', reason);
        formData.append('type', type);
        formData.append('mode', mode);
        formData.append('by_from', from);
        formData.append('amount', amount);
        formData.append('status', status);

        fetch(url + "create/payments",
                {
                    body: formData,
                    method: 'POST'
                }).then(function (response) {
            //console.log('Response: ' + response);
            if (response.status === 200) {
                addtransaction(user, ref, reason, amount, "Purchase", "0");
                minusAcc(user, user, amount);
                //alert("Successful Purchase");
            } else {
                alert('Error Ocurred Please contact System Admin');
            }
            return response.text();
        }).catch(function (err) {
            console.log('ERROR: ' + err);
        });
    } else {
        alert("You don't have enough funds");
    }
}


function addtransaction(userid, accid, des, amt, act, type) {
    //console.log(amount + acc_bal);
    let formData = new FormData();
    //console.log(officer);
    formData.append('userid', userid);
    formData.append('accid', accid);
    formData.append('des', des);
    formData.append('amt', amt);
    formData.append('act', act);
    formData.append('type', type);

    fetch(url + "create/transaction",
            {
                body: formData,
                method: 'POST'
            }).then(function (response) {
        //console.log('Response: ' + response);
        if (response.status === 200) {
            //alert("Successful Purchase");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}


function minusAcc(accid, userid, amt) {
    //console.log(userid);
    //console.log(officer);
    let formData = new FormData();
    formData.append('accid', accid);
    formData.append('userid', userid);
    formData.append('amt', amt);

    fetch(url + "create/minusaccount",
            {
                body: formData,
                method: 'POST'
            }).then(function (response) {
        //console.log('Response: ' + response.text);
        if (response.status === 200) {
            alert("Amount Deducated");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).then(function (data) {
        const obj = JSON.parse(data);
        //console.log(obj);
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}


function addAcc(accid, userid, amt) {
    //console.log(amount + acc_bal);
    let formData = new FormData();
    //console.log(officer);accid
    formData.append('accid', accid);
    formData.append('userid', userid);
    formData.append('amt', amt);

    fetch(url + "create/addaccount",
            {
                body: formData,
                method: 'POST'
            }).then(function (response) {
        //console.log('Response: ' + response);
        if (response.status === 200) {
            alert("Amount Added");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}


function addPayWith(ref, user, reason, type, mode, from, amount, status) {
    //console.log(amount + acc_bal);

    let formData = new FormData();
    //console.log(officer);
    formData.append('refid', ref);
    formData.append('userid', user);
    formData.append('reason', reason);
    formData.append('type', type);
    formData.append('mode', mode);
    formData.append('by_from', from);
    formData.append('amount', amount);
    formData.append('status', status);

    fetch(url + "create/payments",
            {
                body: formData,
                method: 'POST'
            }).then(function (response) {
        //console.log('Response: ' + response);
        if (response.status === 200) {
            //alert("Withdraw Initiated");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });

}


function logger(ref, nam, det) {
    let formData = new FormData();


    //console.log(officer);
    formData.append('ref', ref);
    formData.append('name', nam);
    formData.append('det', det);

    fetch(url + "create/logger",
            {
                body: formData,
                method: 'POST'
            }).then(function (response) {
        console.log('Response: ' + response.status);
        if (response.status === 200) {
            //alert("Case Logger Updated");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}


function setAccountType(status, input, elm) {
    //let type = $("#level :selected").attr('id');//document.getElementById("sch_con_level").value;
    if (status === '0') {
        //getCoStatus()
        $("#" + elm).append(getCoStatus(status));
        //alert("Unvarified Account, thats why you have limited Functions. Call this No. +256 751073507 for Support");
    } else if (status === '2') {
        //alert("Suspended Account, thats why you have limited Functions. Call this No. +256 751073507 for Support");
        $("#" + elm).append(getCoStatus(status));
    } else {
        $("#" + elm).append(getCoStatus(status));
        switch (input) {
            case '1':
                document.getElementById('m_dash').style.display = 'block';
                document.getElementById('m_market').style.display = 'block';
                document.getElementById('m_class').style.display = 'block';
                document.getElementById('m_supply').style.display = 'none';
                document.getElementById('m_forums').style.display = 'block';
                document.getElementById('m_school').style.display = 'block';
                document.getElementById('m_tut').style.display = 'block';
                document.getElementById('m_cont').style.display = 'block';
                document.getElementById('m_acc').style.display = 'block';
                document.getElementById('m_log').style.display = 'block';
                break;
            case '2':
                document.getElementById('m_dash').style.display = 'block';
                document.getElementById('m_market').style.display = 'block';
                document.getElementById('m_class').style.display = 'block';
                document.getElementById('m_supply').style.display = 'none';
                document.getElementById('m_forums').style.display = 'block';
                document.getElementById('m_school').style.display = 'block';
                document.getElementById('m_tut').style.display = 'block';
                document.getElementById('m_cont').style.display = 'block';
                document.getElementById('m_acc').style.display = 'block';
                document.getElementById('m_log').style.display = 'block';
                break;
            case '3':
                document.getElementById('m_dash').style.display = 'block';
                document.getElementById('m_market').style.display = 'block';
                document.getElementById('m_class').style.display = 'none';
                document.getElementById('m_supply').style.display = 'block';
                document.getElementById('m_forums').style.display = 'none';
                document.getElementById('m_school').style.display = 'none';
                document.getElementById('m_tut').style.display = 'none';
                document.getElementById('m_cont').style.display = 'none';
                document.getElementById('m_acc').style.display = 'block';
                document.getElementById('m_log').style.display = 'block';
                break;
            case '4':
                document.getElementById('m_dash').style.display = 'block';
                document.getElementById('m_market').style.display = 'block';
                document.getElementById('m_class').style.display = 'block';
                document.getElementById('m_supply').style.display = 'none';
                document.getElementById('m_forums').style.display = 'none';
                document.getElementById('m_school').style.display = 'none';
                document.getElementById('m_tut').style.display = 'none';
                document.getElementById('m_cont').style.display = 'none';
                document.getElementById('m_acc').style.display = 'block';
                document.getElementById('m_log').style.display = 'block';
                break;
            default:
                break;
        }
    }
}


function getCoStatus(input) {
    if (input === '0') {
        return '<span class="badge badge-warning">Unvarified Account, thats why you have limited Functions. Call this No. +256 751073507 for Support</span>';
    } else if (input === '1') {
        return '<span class="badge badge-success">Active</span>';
    } else {
        return '<span class="badge badge-danger">Suspended Account, thats why you have limited Functions. Call this No. +256 751073507 for Support</span>';
    }
}



function calc_Charge(userid, amt, charge) {
    var am = parseFloat(removeCommas(amt));
    var pa = parseFloat(charge);
    if (!userid || userid === "NA" || !amt || amt === "0") {
        res = 0;
        return parseInt(res);
    } else {
        var res = am * pa / 100;
        return parseInt(res);
    }
}



function getRecos(input, total, tut, det) {
    try {
        $.ajax({
            //
            url: url + "fetch/reco/0/" + input,
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
                        var jdata = data.recommendation;
                        if (!isJsonArray(jdata)) {
                            //token = jdata.token;
                            var r1 = calc_Charge(jdata.reco_one, total, '2.5');
                            var r2 = calc_Charge(jdata.reco_two, total, '1.5');
                            var r3 = calc_Charge(jdata.reco_three, total, '1');
                            var top = calc_Charge('AC_220323469', total, '10');
                            if (!jdata.reco_one || jdata.reco_one === "NA") {

                                addAcc('AC_10623258', 'AC_10623258', top);
                                addtransaction('AC_10623258', 'AC_10623258', 'Commission Earning', top, "Commission Earnings", "0");

                                addAcc(tut, tut, parseInt(removeCommas(total)) - calc_Charge(input, total, '15'));
                                addtransaction(tut, tut, det, parseInt(removeCommas(total)) - calc_Charge(input, total, '15'), "Content Purchase", "0");
                            } else {
                                addAcc(jdata.reco_one, jdata.reco_one, r1);
                                addtransaction(jdata.reco_one, jdata.reco_one, 'Commission Earning', r1, "Recommder Earnings", "0");

                                addAcc(jdata.reco_two, jdata.reco_two, r2);
                                addtransaction(jdata.reco_two, jdata.reco_two, 'Commission Earning', r2, "Recommder Earnings", "0");

                                addAcc(jdata.reco_three, jdata.reco_three, r3);
                                addtransaction(jdata.reco_three, jdata.reco_three, 'Commission Earning', r3, "Recommder Earnings", "0");

                                addAcc('AC_10623258', 'AC_10623258', top);
                                addtransaction('AC_10623258', 'AC_10623258', 'Commission Earning', top, "Commission Earnings", "0");

                                addAcc(tut, tut, parseInt(removeCommas(total)) - calc_Charge(input, total, '15'));
                                addtransaction(tut, tut, det, parseInt(removeCommas(total)) - calc_Charge(input, total, '15'), "Content Purchase", "0");
                            }

                        } else {
                            $.each(data.recommendation, function (index, value) {

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


function getTranStatus(input) {
    if (input === '0') {
        return '<span class="badge badge-info">Normal</span>';
    } else if (input === '1') {
        return '<span class="badge badge-danger">Withdraw</span>';
    } else if (input === '2') {
        return '<span class="badge badge-success">Deposit</span>';
    } else {
        return '<span class="badge badge-warning">Unclear Status</span>';
    }
}

function getStudentLevel(input) {
    if (input === '1') {
        return '<span class="badge badge-dark">Farmer</span>';
    } else if (input === '2') {
        return '<span class="badge badge-dark">Student</span>';
    } else if (input === '3') {
        return '<span class="badge badge-dark">Supplier</span>';
    } else if (input === '4') {
        return '<span class="badge badge-dark">Corporate</span>';
    } else {
        return '<span class="badge badge-warning">Unclear Status</span>';
    }
}

function getItemStatus(input) {
    if (input === '0') {
        return '<span class="badge badge-danger">Unvarified</span>';
    } else if (input === '1') {
        return '<span class="badge badge-success">Varified</span>';
    } else {
        return '<span class="badge badge-warning">Unclear Status</span>';
    }
}

function getGenStu(input) {
    if (input === '0') {
        return '<span class="badge badge-danger">Suspended | Unvarified</span>';
    } else if (input === '1') {
        return '<span class="badge badge-success">Active | Varified</span>';
    } else {
        return '<span class="badge badge-warning">Unclear Status</span>';
    }
}

function getGenStatu(input) {
    if (input === '0') {
        return '<span class="badge badge-success">Active</span>';
    } else if (input === '1') {
        return '<span class="badge badge-danger">Suspended</span>';
    } else {
        return '<span class="badge badge-warning">Unclear Status</span>';
    }
}

function getAccount_type(input) {
    if (input === '0') {
        return '<span class="badge badge-success">Normal</span>';
    } else if (input === '1') {
        return '<span class="badge badge-danger">Sacco | Union | Group</span>';
    } else {
        return '<span class="badge badge-warning">Unclear Status</span>';
    }
}


function getAccountNumber(input, status, elm, elm2) {
    try {
        $.ajax({
            //
            url: url + "fetch/account/" + input + "/" + status,
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
                            //console.log(jdata.account_id);
                            document.getElementById(elm).value = jdata.account_id;
                            document.getElementById(elm2).value = jdata.userid;

                            loadClubMembers(jdata.account_id);
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

//SMS Varification


function sendVarifcationCode(tel, code) {
    fetch("https://boxuganda.com/api.php?user=sadam14&password=Sadam14doka&sender=Agrenes&message=Your Agrenes OTP Code is: " + code + "&reciever=" + tel + ",256707799849",
            {
                //body: '',
                method: 'GET'
            }).then(function (response) {
        //console.log('Response: ' + response);
        if (response.status === 200) {
            //getLastPay();
            //console.log('Response: ' + response.error_msg);
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).then(function (data) {
        //console.log(data);
    }).catch(function (err) {
        //console.log('ERROR: ' + err);
    });
}


function sendSmsBox(input) {
    fetch("https://boxuganda.com/api.php?user=sadam14&password=Sadam14doka&sender=Agrenes&message=" + input + "&reciever=0785438035",
            {
                //body: '',
                method: 'GET'
            }).then(function (response) {
        console.log('Response: ' + response);
        if (response.status === 200) {
            //getLastPay();
            //console.log('Response: ' + response.error_msg);
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).then(function (data) {
        console.log(data);
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}


function sendSms(input) {
    fetch("http://smgw1.yo.co.ug:9100/sendsms?ybsacctno=1000114480&password=L2bxjEnG&origin=6969&sms_content=" + input + "&destinations=256751073507,256779090000,256785438035,256704672285",
            {
                //body: '',
                method: 'GET'
            }).then(function (response) {
        console.log('Response: ' + response);
        if (response.status === 200) {
            //getLastPay();
            //console.log('Response: ' + response.error_msg);
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).then(function (data) {
        console.log(data);
        //const obj = JSON.parse(data);
        //base64toPDF(obj.pdf);
        //console.log(obj.pdf);
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}


function getSacco_role(input, elm) {
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
                // $("#prop_body").html('<tr><td colspan="5" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');

            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                //console.log("Sadam");
                console.log(e_data);
                try {
                    // $("#school").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var jdata = data.fin_accounts;
                        if (!isJsonArray(jdata)) {
                            //token = jdata.token;
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


function checkApproval_Status(clubid, payid, userid, status, elm, elm_body, elm_2) {
    try {
        $.ajax({
            //
            url: url + "fetch/logs_gen/" + clubid + "/" + userid,
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
                //console.log(data);
                try {
                    // $("#school").empty();
                    let i = 1;
                    let row = "";
                    if (status === '1') {
                        if (!isEmpty(data)) {
                            var value = data.logs;
                            //console.log(value.status);
                            if (value.status !== '1') {
                                document.getElementById(elm_2).style.display = 'none';
                            } else {
                                loadRequest(clubid, payid, userid, elm, elm_body);
                                document.getElementById(elm_2).style.display = 'block';
                            }
                            //document.getElementById(elm_2).style.display = 'none';
                        } else {
                            loadRequest(clubid, payid, userid, elm, elm_body);
                            document.getElementById(elm_2).style.display = 'block';
                        }
                    } else {
                        document.getElementById(elm_2).style.display = 'none';
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





function loadRequest(ref, pay, userid, elm, elm_body) {
    //console.log(ref);
    //console.log(pay);
    try {
        $.ajax({
//
            url: url + "fetch/payment_type/0/null/" + ref + "/2/0",
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#" + elm_body).html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                //console.log(data);
                try {
                    $("#" + elm_body).empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.payment;
                        // console.log(value);
                        if (!isJsonArray(value)) {
                            e_data += '<tr>';
                            e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                            e_data += '<td>' + value.pay_id + '</td>';
                            e_data += '<td>' + value.reason + '</td>';
                            e_data += '<td>' + value.mode + '</td>';
                            e_data += '<td>' + value.amount + '</td>';
                            e_data += '<td>';
                            e_data += '<button id="' + value.ref_id + '"  name="' + value.pay_id + '"  value="' + userid + '" onclick="acceptRequest(this)"  type="button"  class="btn btn-success" >Approve Request</button>';
                            e_data += '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.payment, function (index, value) {
                                //console.log(value.sacco_status);
                                e_data += '<tr>';
                                e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                                e_data += '<td>' + value.pay_id + '</td>';
                                e_data += '<td>' + value.reason + '</td>';
                                e_data += '<td>' + value.mode + '</td>';
                                e_data += '<td>' + value.amount + '</td>';
                                e_data += '<td>';
                                e_data += '<button id="' + value.ref_id + '"  name="' + value.pay_id + '" value="' + userid + '" onclick="acceptRequest(this)"  type="button"  class="btn btn-success" >Approve Request</button>';
                                e_data += '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    $("#" + elm).append(e_data);
                    pager(elm);
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



function acceptRequest(input) {
    let ref = $(input).attr("id");
    let pay = $(input).attr("name");
    let userid = $(input).attr("value");
    //console.log(userid);


    var formdata = new FormData();

    formdata.append("ref", ref);
    formdata.append("pay", pay);
    formdata.append("status", "1");

    fetch(url + "update/payment_status",
            {
                body: formdata,
                method: 'POST'
            }).then(function (response) {
        //console.log('Response: ' + response);
        if (response.status === 200) {
            logs(ref, pay, "Withdraw Request Approval", userid);
            alert("Request Approved");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}


function statusLog(status, gen, act, act_by) {
    var formdata = new FormData();

    formdata.append("status", status);
    formdata.append("gen", gen);
    formdata.append("act", act);
    formdata.append("act_by", act_by);

    fetch(url + "update/logs_status",
            {
                body: formdata,
                method: 'POST'
            }).then(function (response) {
        //console.log('Response: ' + response);
        if (response.status === 200) {
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}


function logs(genid, activity, details, by) {
    var formdata = new FormData();
    formdata.append("genid", genid);
    formdata.append("activity", activity);
    formdata.append("details", details);
    formdata.append("by", by);

    fetch(url + "create/logs",
            {
                body: formdata,
                method: 'POST'
            }).then(function (response) {
        //console.log('Response: ' + response);
        if (response.status === 200) {
            alert("Log Registered");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}


function loadRequest_status(ref, elm, elm_body) {
    try {
        $.ajax({
//
            url: url + "fetch/payment_type/0/null/" + ref + "/2/0",
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#" + elm_body).html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#" + elm_body).empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.payment;
                        if (!isJsonArray(value)) {
                            //console.log(value.id);
                            getApprovalClub(value.ref_id, value.status);
                            e_data += '<tr>';
                            e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                            e_data += '<td>' + value.pay_id + '</td>';
                            e_data += '<td>' + value.reason + '</td>';
                            e_data += '<td>' + value.mode + '</td>';
                            e_data += '<td>' + value.amount + '</td>';
                            e_data += '<td>' + getpayStatus(value.status) + '</td>';
                            e_data += '<td><button type="button" class="btn btn-success" id="btn_tb_withdraw"  name="' + value.id + '"  onclick="getWithdraw()">Withdraw</button></td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.payment, function (index, value) {
                                //console.log(value.id);
                                getApprovalClub(value.ref_id, value.status);
                                e_data += '<tr>';
                                e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                                e_data += '<td>' + value.pay_id + '</td>';
                                e_data += '<td>' + value.reason + '</td>';
                                e_data += '<td>' + value.mode + '</td>';
                                e_data += '<td>' + value.amount + '</td>';
                                e_data += '<td>' + getpayStatus(value.status) + '</td>';
                                e_data += '<td><button type="button" class="btn btn-success" id="btn_tb_withdraw" name="' + value.id + '" onclick="getWithdraw()">Withdraw</button></td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    $("#" + elm).append(e_data);
                    //pager(elm);
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


function getpayStatus(input) {
    if (input === '0') {
        return '<span class="badge badge-success">Success</span>';
    } else if (input === '1') {
        return '<span class="badge badge-dark">Pending Approval</span>';
    } else {
        return '<span class="badge badge-warning">Approval Proccess</span>';
    }
}


function getApprovalClub(clubid, input) {
    try {
        $.ajax({
//
            url: url + "counter/club/" + clubid + "/1",
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                //$("#" + elm_body).html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.count;
                        if (!isJsonArray(value)) {
                            var inp = parseFloat(removeCommas(input));
                            var num = parseFloat(removeCommas(value.number)) + 1;
                            //console.log(inp);
                            //console.log(num);
                            if (inp === num) {
                                document.getElementById('btn_tb_withdraw').style.display = 'block';
                                //alert("Withdraw has be approved by all Signitories");
                            } else {
                                document.getElementById('btn_tb_withdraw').style.display = 'none';
                                //alert("Approval Pending");
                            }
                            //console.log(value.id);
                        } else {
                            $.each(data.count, function (index, value) {
                                //console.log(value.id);
                                //++i;
                            });
                        }
                    } else {
                        //row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    //$("#" + elm).append(e_data);
                    //pager(elm);
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

//document.getElementById('btn_tb_withdraw').addEventListener('click', getWithdraw);
function getWithdraw() {
    let name = $("#btn_tb_withdraw").attr('name');
    loadpayDetail(name);
    $('#sacco_payment_cleared').modal('show');
}

function loadpayDetail(input) {
    //console.log(input);
    try {
        $.ajax({
//
            url: url + "fetch/payment/" + input + "/null/null",
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                //$("#pay_body").html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.payment;
                        if (!isJsonArray(value)) {
                            //console.log(value.id);
                            // console.log(value);
                            document.getElementById('pc_userid').value = value.userid;
                            document.getElementById('pc_refid').value = value.ref_id;
                            document.getElementById('pc_pay').value = value.pay_id;
                            document.getElementById('pc_amt').value = value.amount;
                            document.getElementById('pc_tel').value = value.mode;
                            document.getElementById('pc_reason').value = value.reason;
                        } else {
                            $.each(data.payment, function (index, value) {
                                //console.log(value.id);

                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
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


//document.getElementById('pc_with_btn').addEventListener('click', withApproved);
function withApproved() {
    let userid = document.getElementById('pc_userid').value;
    let ref = document.getElementById('pc_refid').value;
    let payid = document.getElementById('pc_pay').value;
    let amount = document.getElementById('pc_amt').value;
    let tel = document.getElementById('pc_tel').value;
    let reason = document.getElementById('pc_reason').value;

    if (valForm(amount, "Provid Correct Amount") === false) {
        //empty fields
    } else {
        statusLog('1', ref, payid, userid);
        addtransaction(ref, ref, tel, amount, "Withdraw", '1');
        minusAcc(ref, ref, amount);
        statusSacco(ref, payid, '1');
    }

}


function statusSacco(ref, pay, status) {
    var formdata = new FormData();

    formdata.append("ref", ref);
    formdata.append("pay", pay);
    formdata.append("status", status);

    fetch(url + "update/payment_status_sacco",
            {
                body: formdata,
                method: 'POST'
            }).then(function (response) {
        //console.log('Response: ' + response);
        if (response.status === 200) {
            //logs(ref, pay, "Withdraw Request Approval", userid);
            //alert("Request Approved");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}




function loadpayments(input, type, elm, elm_body) {
    try {
        $.ajax({
//
            url: url + "fetch/payment_type/" + input + "/" + type,
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                $("#" + elm_body).html('<tr><td colspan="8" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    $("#" + elm_body).empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        row += "";
                        var value = data.payment;
                        if (!isJsonArray(value)) {
                            //console.log(value.id);
                            e_data += '<tr>';
                            e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                            e_data += '<td>' + value.pay_id + '</td>';
                            e_data += '<td>' + value.reason + '</td>';
                            e_data += '<td>' + value.amount + '</td>';
                            e_data += '</tr>';
                        } else {
                            $.each(data.payment, function (index, value) {
                                //console.log(value.id);
                                e_data += '<tr>';
                                e_data += '<td>' + getDate_formart(value.datereg) + '</td>';
                                e_data += '<td>' + value.pay_id + '</td>';
                                e_data += '<td>' + value.reason + '</td>';
                                e_data += '<td>' + value.amount + '</td>';
                                e_data += '</tr>';
                                ++i;
                            });
                        }
                    } else {
                        row += '<tr><td colspan="8" align="center">No data</td></tr>';
                    }
                    $("#" + elm).append(e_data);
                    pager(elm);
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


//Yo Payment Transactions

function depo_yo(tel, amt, naration) {
    //console.log(amount + acc_bal);
    let formData = new FormData();
    //console.log(officer);accid
    formData.append('tel', tel);
    formData.append('amt', amt);
    formData.append('naration', naration);

    var requestOptions = {
        method: 'POST',
        body: formData,
        redirect: 'follow'
    };

    fetch(url + "create/depo_yo", requestOptions)
            .then(function (response) {
                //console.log('Response: ' + response);
                if (response.status === 200) {
                    alert("YoPayment Success");
                } else {
                    alert('Error Ocurred Please contact System Admin');
                }
                return response.text();
            }).then(result => {
        console.log(result);
        //console.log(result);
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}

function with_yo(tel, amt, naration) {
    //console.log(amount + acc_bal);
    let formData = new FormData();
    //console.log(officer);accid
    formData.append('tel', tel);
    formData.append('amt', amt);
    formData.append('naration', naration);

    var requestOptions = {
        method: 'POST',
        body: formData,
        redirect: 'follow'
    };

    fetch(url + "create/with_yo", requestOptions)
            .then(function (response) {
                //console.log('Response: ' + response);
                if (response.status === 200) {
                    alert("Success, Pending Approval");
                } else {
                    alert('Error Ocurred Please contact System Admin');
                }
                return response.text();
            }).then(result => {
        console.log(result);
        //console.log(result);
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}



function check_yo() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(url + "fetch/check_yo", requestOptions).then(function (response) {
        //console.log('Response: ' + response);
        if (response.status === 200) {
            alert("Success");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).then(result => {
        console.log(result);
        //console.log(result);
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}

