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

var appid = sessionStorage.getItem('appid');
var user_token = sessionStorage.getItem('user_token');

$(document).ready(function () {
    const email = sessionStorage.getItem('user');
    //console.log(appid);
    //console.log(user_token);
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
                            //console.log(jdata);
                            // console.log(value.email);
                            // document.getElementById('tut_id').innerHTML = value.userid;
                            //document.getElementById('tut_email').innerHTML = value.email;
                            //document.getElementById('tut_tel').innerHTML = value.tel;
                            document.getElementById('tut_names').innerHTML = "Welcome " + value.name;
                            document.getElementById('tut_date').innerHTML = getToday();
                            document.getElementById('tut_img').src = "data:image/png;base64," + value.pic;

                            getbalance(value.jdata, 'acc_amt', 'acc_no','0');
                            // $("#img").attr('src', 'data:image/png;base64,' + value.pic;
                            // loadstudents(value.organ);
                            //getSchool(value.organ);
                            //e_data += '<div class="desc"><div class="thumb"><span class="badge bg-theme"><i class="fa fa-clock-o"></i></span></div><div class="details"><p><muted>' + value.datreg + '</muted><br/><a href="#">' + value.activity + '</a>&nbsp&nbsp' + value.act_by + '<br/></p></div></div>';
                        } else {
                            //Add ArrayList
                            //above must be customised
                            $.each(data.Users, function (index, value) {
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





/* Refer following tutorial and API documentation to know how to create a user token
 * https://mesibo.com/documentation/tutorials/first-app/ 
 */
//var user_token = '4486a56fedf955e9b10b24a73397aebcfa5a9a950f7fa57eae11464f4cqa2047b1b62f';
//sessionStorage.setItem('user_token', user_token);
/* App ID used to create a user token. */
//var appid = 'agro.avienseconsults.com';
//sessionStorage.setItem('appid', appid);
// A destination where this demo app will send message or make calls */

//var demo_destination = document.getElementById('call_dest').value;
var demo_user_token = 'f12aad36b89e3bf566099c47d562c8ba94b834b9f9af99afe3ffe664bb889lae382bce5c8';
/* App ID used to create a user token. */
var demo_appid = 'agro.avienseconsults.com';
/* A destination where this demo app will send message or make calls */
var demo_destination = '18005551234';


function MesiboListener(o) {
    this.api = o;
}

MesiboListener.prototype.Mesibo_onConnectionStatus = function (status, value) {
    console.log("Mesibo_onConnectionStatus: " + status);
    var s = document.getElementById("cstatus");
    if (!s)
        return;
    if (MESIBO_STATUS_ONLINE == status) {
        s.classList.replace("btn-danger", "btn-success");
        s.innerText = "You are online";
        return;
    }

    s.classList.replace("btn-success", "btn-danger");
    switch (status) {
        case MESIBO_STATUS_CONNECTING:
            s.innerText = "Connecting";
            break;

        case MESIBO_STATUS_CONNECTFAILURE:
            s.innerText = "Connection Failed";
            break;

        case MESIBO_STATUS_SIGNOUT:
            s.innerText = "Signed out";
            break;

        case MESIBO_STATUS_AUTHFAIL:
            s.innerText = "Disconnected: Bad Token or App ID";
            break;

        default:
            s.innerText = "You are offline";
            break;
    }
}

MesiboListener.prototype.Mesibo_onMessageStatus = function (msg) {
    var sender = msg.profile;
    console.log("Mesibo_onMessageStatus: from " + sender.getNameOrAddress("") + " status: " + msg.getStatus() + " id: " + msg.mid);
}

MesiboListener.prototype.Mesibo_onMessage = function (msg) {

    /* Messaging documentation https://mesibo.com/documentation/api/messaging/ */
    if (msg.isIncoming()) {

        /* Profile documentation https://mesibo.com/documentation/api/users-and-profiles/ */
        var sender = msg.profile;

        // check if this message belongs to a group
        /* Group Management - https://mesibo.com/documentation/api/group-management/ */
        if (msg.isGroupMessage()) {
            var group = msg.groupProfile;

        }

        // check if this message is realtime or read from the database
        if (msg.isRealtimeMessage()) {
            console.log("Mesibo_onMessage: from " + sender.getNameOrAddress("") + " msg: " + msg.message);
        }

    } else if (msg.isOutgoing()) {

        /* messages you sent */
        console.log("Mesibo_onMessage: sent a message with id: " + msg.mid);

    } else if (msg.isMissedCall()) {

    }
}

MesiboListener.prototype.Mesibo_onCall = function (callid, from, video) {
    console.log("Mesibo_onCall: " + (video ? "Video" : "Voice") + " call from: " + from);
    if (video)
        this.api.setupVideoCall("localVideo", "remoteVideo", true);
    else
        this.api.setupVoiceCall("audioPlayer");

    var s = document.getElementById("ansBody");
    if (s)
        s.innerText = "Incoming " + (video ? "Video" : "Voice") + " call from: " + from;

    $('#answerModal').modal({show: true});
}

MesiboListener.prototype.Mesibo_onCallStatus = function (callid, status) {
    console.log("Mesibo_onCallStatus: " + status);
    var v = document.getElementById("vcstatus");
    var a = document.getElementById("acstatus");

    var s = "";
    if (status & MESIBO_CALLSTATUS_COMPLETE) {
        s = "Complete";
        console.log("closing");
        $('#answerModal').modal("hide");
    }

    switch (status) {
        case MESIBO_CALLSTATUS_RINGING:
            s = "Ringing";
            break;

        case MESIBO_CALLSTATUS_ANSWER:
            s = "Answered";
            break;

        case MESIBO_CALLSTATUS_BUSY:
            s = "Busy";
            break;

        case MESIBO_CALLSTATUS_NOANSWER:
            s = "No Answer";
            break;

        case MESIBO_CALLSTATUS_INVALIDDEST:
            s = "Invalid Destination";
            break;

        case MESIBO_CALLSTATUS_UNREACHABLE:
            s = "Unreachable";
            break;

        case MESIBO_CALLSTATUS_OFFLINE:
            s = "Offline";
            break;
    }
    if (v)
        v.innerText = "Call Status: " + s;

    if (a)
        a.innerText = "Call Status: " + s;
}

var api = new Mesibo();
api.setAppName(appid);
var listener = new MesiboListener(api);
api.setListener(listener);
api.setCredentials(user_token);
api.setDatabase("mesibo");
api.start();

var profile = api.getProfile(demo_destination, 0);

function sendMessage() {
    var m = profile.newMessage();
    m.message = "Hello From JS";
    m.send();
}

function sendFile() {
    var m = profile.newMessage();
    m.message = 'Hello from js';
    m.title = 'Himalaya';
    m.message = 'Everest';

    // You can either specify file element id or enter details manually
    if (true) {
        m.setContent('filefield'); // recommended approach
    } else {
        m.setContent('https://cdn.pixabay.com/photo/2019/08/02/09/39/mugunghwa-4379251_1280.jpg');
        m.setContentType(MESIBO_FILETYPE_IMAGE);
        m.title = 'Himalaya';
        m.message = 'Everest';
    }

    m.send();
}

function readMessages() {
    var rs = profile.createReadSession(listener);
    rs.enableReadReceipt(true);
    rs.read(100);
}

function video_call() {
    api.setupVideoCall("localVideo", "remoteVideo", true);
    api.call(demo_destination);
}

function video_mute_toggle() {
    api.toggleVideoMute();
}

function audio_mute_toggle() {
    api.toggleAudioMute();
}

function voice_call() {
    api.setupVoiceCall("audioPlayer");
    api.call(demo_destination);
}

function answer() {
    $('#answerModal').modal("hide");
    api.answer(true);
}

function hangup() {
    $('#answerModal').modal("hide");
    api.hangup(0);
}

function updateProfile() {
    var sp = api.getSelfProfile();
    var n = document.getElementById("name");
    sp.setName(n.value);
    sp.setStatus("My status");

    // profileimage is in demo.html
    sp.setImage("profileimage");

    sp.save();
}

function createGroup() {
    api.createGroup("My Group From JS", 0, function (profile) {
        console.log("group created");
        addMembers(profile);
    });
}

function addMembers(profile) {
    var gp = profile.getGroupProfile();
    var members = ["123456", "112233"];
    gp.addMembers(members, MESIBO_MEMBERFLAG_ALL, 0);
}
