/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var app_id = sessionStorage.getItem('appid');
var u_token = sessionStorage.getItem('user_token');



/* If you are hosting Mesibo backend on your own server, change this accordingly.
 * Refer https://github.com/mesibo/messenger-app-backend
 */
const MESSENGER_API_URL = "https://messenger.mesibo.com";
/* App ID used to create a user token - change it to match your app */
var MESSENGER_APP_ID = app_id;
var MESSENGER_TOKEN_KEY = u_token;


//console.log(MESSENGER_APP_ID + " | " + MESSENGER_TOKEN_KEY);


function redirect_url(ur) {
    window.location.replace(url);
}

function saveLoginToken(token) {
    localStorage.setItem(MESSENGER_TOKEN_KEY, token);
    return 0;
}

function deleteTokenInStorage() {
    localStorage.removeItem(MESSENGER_TOKEN_KEY);
}

var mesibo_demo_token = null;
function getLoginToken() {
    if (mesibo_demo_token)
        return mesibo_demo_token;

    var token = localStorage.getItem(MESSENGER_TOKEN_KEY);
    if (token && token.length > 16) {
        mesibo_demo_token = token;
        return token;
    }

    return null;
}
function getUserToken() {
    return MESSENGER_TOKEN_KEY;
}

function getAppId() {
    return MESSENGER_APP_ID;
}


function login_init() {
    console.log('start login');
    //var token = getLoginToken();
    var token = localStorage.getItem(MESSENGER_TOKEN_KEY);
    if (token)
        return true;
    return false;
}