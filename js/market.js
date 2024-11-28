
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
    loadCart();
    cartCounter();
});
function createNode(element) {
    return document.createElement(element);
}
function append(parent, el) {
    return parent.appendChild(el);
}

// Function to generate a new UUID for the session ID
function generateSessionId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Function to get the current session ID or generate a new one if none exists
function getSessionId() {
    let sessionId = localStorage.getItem('session_id');
    if (!sessionId) {
        sessionId = generateSessionId();
        localStorage.setItem('session_id', sessionId); // Save session ID to localStorage
    }
    return sessionId;
}

// Use the session ID
const sessionId = getSessionId();
console.log('Session ID:', sessionId);



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



document.querySelectorAll('#menu_list .nav-link').forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent the default anchor behavior
        const value = this.textContent; // Get the value of the <a> element
        menu_loadItem_Category(value);
        //alert(value + ' clicked!');
    });
});


// script.js

let currentPage = 1; // Current page
let products = []; // Array to hold product data
const productsPerPage = 10; // Number of products per page

function loadItems() {
    try {
        $.ajax({
            url: url + "fetch/item_status/1",
            dataType: 'json',
            type: 'get',
            cache: false,
            processData: false,
            contentType: false,
            beforeSend: function () {
                $("#div_products").html("<div class='spinner-border text-primary' role='status'><span class='sr-only'></span></div>");
            },
            success: function (data) {
                if (!isEmpty(data)) {
                    products = data.item; // Store product data
                    displayProducts(currentPage);

                } else {
                    $("#div_products").html('<div align="center">Sorry,No Products at the Moment.</div>');
                }
            },
            error: function (xhr, status, error) {
                console.error("Error loading items:", error);
                $("#div_products").html('<div align="center">Sorry, an error occurred while loading products.</div>');
            }
        });
    } catch (ex) {
        alert("Exception occurred: " + ex);
    }
}

function menu_loadItem_Category(input) {
    //console.log(input);
    if (input === "All") {
        loadItems();
    } else {
        try {
            $.ajax({
                url: url + "fetch/item_cat/" + input + "/1",
                dataType: 'json',
                type: 'get',
                cache: false,
                processData: false,
                contentType: false,
                beforeSend: function () {
                    $("#div_products").html("<div class='spinner-border text-primary' role='status'><span class='sr-only'></span></div>");
                },
                success: function (data) {
                    if (!isEmpty(data)) {
                        products = data.item; // Store product data
                        displayProducts(currentPage);

                    } else {
                        $("#div_products").html('<div align="center">Sorry, No Product for the Search.</div>');
                    }
                },
                error: function (xhr, status, error) {
                    console.error("Error loading items:", error);
                    $("#div_products").html('<div align="center">Sorry, an error occurred while loading products.</div>');
                }
            });
        } catch (ex) {
            alert("Exception occurred: " + ex);
        }
    }
}


function sel_loadItem_Category() {
    var cat = document.getElementById('sel_category').value;
    if (cat === "All") {
        loadItems();
    } else {
        try {
            $.ajax({
                url: url + "fetch/item_cat/" + cat + "/1",
                dataType: 'json',
                type: 'get',
                cache: false,
                processData: false,
                contentType: false,
                beforeSend: function () {
                    $("#div_products").html("<div class='spinner-border text-primary' role='status'><span class='sr-only'></span></div>");
                },
                success: function (data) {
                    if (!isEmpty(data)) {
                        products = data.item; // Store product data
                        displayProducts(currentPage);

                    } else {
                        $("#div_products").html('<div align="center">Sorry, No Product for the Search.</div>');
                    }
                },
                error: function (xhr, status, error) {
                    console.error("Error loading items:", error);
                    $("#div_products").html('<div align="center">Sorry, an error occurred while loading products.</div>');
                }
            });
        } catch (ex) {
            alert("Exception occurred: " + ex);
        }
    }
}

// Function to display the current page of products
function displayProducts(page) {
    const start = (page - 1) * productsPerPage;
    const end = start + productsPerPage;

    $("#div_products").empty(); // Clear existing products

    // Get products to display
    const itemsToDisplay = products.slice(start, end);
    if (itemsToDisplay.length > 0) {
        itemsToDisplay.forEach(value => {

            /**$("#div_products").append(
             '<div class="col">' +
             '<div class="product-item">' +
             '<span class="badge bg-success position-absolute m-3">' + value.itemid + '</span>' +
             '<a href="#" class="btn-wishlist"><svg width="24" height="24"><use xlink:href="#heart"></use></svg></a>' +
             '<figure>' +
             '<a href="index.html" title="Product Title">' +
             '<img src="data:image/png;base64,' + value.pic + '" height="200" width="200" class="tab-image">' +
             '</a>' +
             '</figure>' +
             '<h3>' + value.name + '</h3>' +
             '<span class="qty">' + value.details + '</span><br>' +
             '<span class="rating"><svg width="24" height="24" class="text-primary"><use xlink:href="#star-solid"></use></svg> 4.5</span>' +
             '<span class="price">' + value.cost + '</span>' +
             '<div class="d-flex align-items-center justify-content-between">' +
             '<button class="w-100 btn btn-primary" type="button" id="' + value.id + '" name="' + value.itemid + '" onclick="confirm(this)">Order</button> &nbsp;' +
             '<a target="_blank" href="https://wa.me/+256762550144?text=Hi%20Agrenes,%20I%20want%20to%20order%20for%20' + value.itemid + ',' + value.name + ',' + value.details + ',' + value.cost + '"><button class="w-100 btn btn-success" type="button">WhatsApp</button></a>' +
             '</div>' +
             '</div>' +
             '</div>'
             );*/

            $("#div_products").append(
                    '<div class="col">' +
                    '<div class="product-item">' +
                    '<span class="badge bg-success position-absolute m-3" style="display: none">' + value.itemid + '</span>' +
                    '<figure>' +
                    '<a href="#" title="Product Title">' +
                    '<img src="data:image/png;base64,' + value.pic + '"  class="tab-image">' +
                    '</a>' +
                    '</figure>' +
                    '<h3>' + value.name + '</h3>' +
                    '<span class="qty">' + value.details + '</span>' +
                    '<span class="price">' + value.cost + '</span>' +
                    '<div class="d-flex align-items-center justify-content-between">' +
                    '<div class="input-group product-qty">' +
                    '<span class="rating"><svg width="24" height="24" class="text-primary"><use xlink:href="#star-solid"></use></svg> 4.5</span>' +
                    '</div>' +
                    '<button type="button" class="btn btn-success btn-sm" id="' + value.id + '" name="' + value.itemid + '" onclick="CallAddCart(this)">Add to Cart</button>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
                    );


        });
    } else {
        $("#div_products").append('<div align="center">No data available.</div>');
    }

    // Enable or disable pagination buttons
    document.getElementById('prevBtn').disabled = page === 1;
    document.getElementById('nextBtn').disabled = end >= products.length;
}


// Event listeners for pagination buttons
function nextPage() {
    currentPage++;
    displayProducts(currentPage);
}

function prevPage() {
    currentPage--;
    displayProducts(currentPage);
}

// Search functionality
$("#searchInput").on('keyup', function () {
    const filter = this.value.toLowerCase();
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(filter)
    );

    // Reset to the first page for filtered results
    currentPage = 1;
    displayFilteredProducts(filteredProducts, currentPage);
});


$("#searchInput_mobile").on('keyup', function () {
    const filter = this.value.toLowerCase();
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(filter)
    );

    // Reset to the first page for filtered results
    currentPage = 1;
    displayFilteredProducts(filteredProducts, currentPage);
});

function displayFilteredProducts(filteredProducts, page) {
    const start = (page - 1) * productsPerPage;
    const end = start + productsPerPage;

    $("#div_products").empty(); // Clear existing products

    // Get products to display
    const itemsToDisplay = filteredProducts.slice(start, end);
    if (itemsToDisplay.length > 0) {
        itemsToDisplay.forEach(value => {
            $("#div_products").append(
                    '<div class="col">' +
                    '<div class="product-item">' +
                    '<span class="badge bg-success position-absolute m-3" style="display: none">' + value.itemid + '</span>' +
                    '<figure>' +
                    '<a href="#" title="Product Title">' +
                    '<img src="data:image/png;base64,' + value.pic + '" height="200" width="200"  class="tab-image">' +
                    '</a>' +
                    '</figure>' +
                    '<h3>' + value.name + '</h3>' +
                    '<span class="qty">' + value.details + '</span>' +
                    '<span class="price">' + value.cost + '</span>' +
                    '<div class="d-flex align-items-center justify-content-between">' +
                    '<div class="input-group product-qty">' +
                    '<span class="rating"><svg width="24" height="24" class="text-primary"><use xlink:href="#star-solid"></use></svg> 4.5</span>' +
                    '</div>' +
                    '<button type="button" class="btn btn-success" id="' + value.id + '" name="' + value.itemid + '" onclick="CallAddCart(this)">Add to Cart</button>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
                    );
        });
    } else {
        //$("#div_products").append('<div align="center">No matching products found.</div>');
        if (itemsToDisplay.itemid && itemsToDisplay.pic && itemsToDisplay.name && itemsToDisplay.details && itemsToDisplay.cost && itemsToDisplay.id) {
            $("#div_products").append(
                    '<div class="col">' +
                    '<div class="product-item">' +
                    '<span class="badge bg-success position-absolute m-3" style="display: none">' + itemsToDisplay.itemid + '</span>' +
                    '<figure>' +
                    '<a href="#" title="Product Title">' +
                    '<img src="data:image/png;base64,' + itemsToDisplay.pic + '" height="200" width="200" class="tab-image">' +
                    '</a>' +
                    '</figure>' +
                    '<h3>' + itemsToDisplay.name + '</h3>' +
                    '<span class="qty">' + itemsToDisplay.details + '</span>' +
                    '<span class="price">' + itemsToDisplay.cost + '</span>' +
                    '<div class="d-flex align-items-center justify-content-between">' +
                    '<div class="input-group product-qty">' +
                    '<span class="rating"><svg width="24" height="24" class="text-primary"><use xlink:href="#star-solid"></use></svg> 4.5</span>' +
                    '</div>' +
                    '<button type="button" class="btn btn-success" id="' + itemsToDisplay.id + '" name="' + itemsToDisplay.itemid + '" onclick="CallAddCart(this)">Add to Cart</button>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
                    );
        } else {
            $("#div_products").append('<div align="center">Product details are incomplete.</div>');
        }
    }

    // Enable or disable pagination buttons
    document.getElementById('prevBtn').disabled = page === 1;
    document.getElementById('nextBtn').disabled = end >= filteredProducts.length;
}



function CallAddCart(input) {
    //var userid = document.getElementById('acc_userid').value;
    //console.log(userid);
    var item_id = $(input).attr("name");
    //getbalance(userid, 'acc_bal', 'acc_name', '0');
    getItem(item_id);
    $('#cartadd_model').modal('show');
}


function addCart() {

    var itemid = document.getElementById('item_syst_id').value;
    var name = document.getElementById('item_name').value;
    var qty = document.getElementById('item_qty').value;
    var unit = document.getElementById('item_cost').value;
    var total = document.getElementById('item_total').value;


    formData = new FormData();
    //console.log(officer);
    formData.append('orderid', "NA");
    formData.append('itemid', itemid);
    formData.append('name', name);
    formData.append('qty', qty);
    formData.append('unit', unit);
    formData.append('total', total);
    formData.append('userid', getSessionId());

    fetch(url + "create/cart",
            {
                body: formData,
                method: 'POST'
            }).then(function (response) {
        //console.log('Response: ' + response);
        if (response.status === 200) {
            alert("Item Added to Cart");
            location.reload();
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}


function clearCart() {
    formData = new FormData();
    //console.log(officer);
    formData.append('userid', getSessionId());
    formData.append('status', "1");

    fetch(url + "update/cart_status",
            {
                body: formData,
                method: 'POST'
            }).then(function (response) {
        //console.log('Response: ' + response);
        if (response.status === 200) {
            alert("Cart Cleared");
            location.reload();
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}



function loadCart() {
    try {
        $.ajax({
            url: url + "fetch/cart/0/null/null/" + getSessionId(),
            dataType: 'json',
            type: 'get',
            cache: false,
            processData: false,
            contentType: false,
            beforeSend: function () {
                $("#cart_list").html("<div class='spinner-border text-primary' role='status'><span class='sr-only'></span></div>");
            },
            success: function (data) {
                if (!isEmpty(data)) {
                    displayCart(data.cart);
                } else {
                    $("#cart_list").html('<div align="center">Sorry, No Products.</div>');
                }
            },
            error: function (xhr, status, error) {
                console.error("Error loading items:", error);
                $("#cart_list").html('<div align="center">Sorry, an error occurred while loading products.</div>');
            }
        });
    } catch (ex) {
        alert("Exception occurred: " + ex);
    }
}

// Function to display the current page of products
function displayCart(cart) {
    $("#cart_list").empty(); // Clear existing products
    //
    let OverrallTotal = 0;
    // Get products to display
    if (cart.length > 0) {
        cart.forEach(value => {
            OverrallTotal += parseFloat(removeCommas(value.total));
            $("#cart_list").append(
                    '<li class="list-group-item d-flex justify-content-between lh-sm">' +
                    '<div>' +
                    '<h6 class="my-0">' + value.name + '</h6>' +
                    '<small class="text-body-secondary">' + value.quantity + ' x ' + value.unitcost + '</small>' +
                    '</div>' +
                    '<span class="text-body-secondary">' + value.total + '</span>' +
                    '</li>');


        });

        $("#cart_list_total").empty(); // Clear existing products
        $("#cart_list_total").html('<li class="list-group-item d-flex justify-content-between">' +
                '<span>Total (UGX)</span>' +
                '<strong id="cart_total">Ugx ' + addCommas(OverrallTotal) + '</strong>' +
                '</li>');
        document.getElementById('cart_total_des').innerHTML = 'Ugx ' + addCommas(OverrallTotal);

    } else {
        // Access properties directly from the cart object
        if (cart.name && cart.quantity && cart.unitcost && cart.total) {
            OverrallTotal += parseFloat(removeCommas(cart.total));
            $("#cart_list").append(
                    '<li class="list-group-item d-flex justify-content-between lh-sm">' +
                    '<div>' +
                    '<h6 class="my-0">' + cart.name + '</h6>' +
                    '<small class="text-body-secondary">' + cart.quantity + ' x ' + cart.unitcost + '</small>' +
                    '</div>' +
                    '<span class="text-body-secondary">' + cart.total + '</span>' +
                    '</li>'
                    );


            $("#cart_list_total").empty(); // Clear existing products
            $("#cart_list_total").html('<li class="list-group-item d-flex justify-content-between">' +
                    '<span>Total (UGX)</span>' +
                    '<strong id="cart_total">Ugx ' + addCommas(OverrallTotal) + '</strong>' +
                    '</li>');
            document.getElementById('cart_total_des').innerHTML = 'Ugx ' + addCommas(OverrallTotal);
        } else {
            console.warn("Invalid cart object:", cart);
        }
        // $("#cart_list").append('<div align="center">No data available.</div>');
    }

}

// Share cart details on WhatsApp
$('#share_btn').on('click', function () {
    const cartItems = $('#cart_list li').toArray();
    let cartDetails = '';

    // Loop through each item and create a shareable message
    cartItems.forEach((item, index) => {
        cartDetails += `${index + 1}. ${$(item).text()}\n`;
    });

    const summary = $('#summary').text();
    const message = `Item Details:\n${cartDetails}\n\n${summary}`;

    // Encode the message for the URL
    const whatsappUrl = `https://wa.me/+256762550144?text=Hi Agrenes,I would like to Order the following \n${encodeURIComponent(message)}`;

    // Open WhatsApp with the pre-filled message
    window.open(whatsappUrl, '_blank');
});



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



document.getElementById('btn_buy').addEventListener('click', addOrder);
function addOrder(event) {
    event.preventDefault();

    var name = document.getElementById('user_name').value;
    var total = document.getElementById('cart_total').innerText;
    var owner = document.getElementById('item_owner').value;
    var phone_tel = document.getElementById('phone_numer').value;


    console.log(total);

    formData = new FormData();
    //console.log(officer);
    formData.append('cartid', "NA");
    formData.append('detail', name);
    formData.append('userid', getSessionId());
    formData.append('number', phone_tel);
    formData.append('name', name);
    formData.append('cartcost', "0");
    formData.append('delpoint', "NA");
    formData.append('delcost', "0");
    formData.append('com', "0");
    formData.append('total', total);

    fetch(url + "create/order",
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
    }).then(function (data) {
        const obj = JSON.parse(data);
        console.log(obj);
        if (obj.status === true) {
            document.getElementById('order_code').value = obj.error_msg;
            //document.getElementById('tut_date').value = obj.msg_b;
            generateSessionId();
            payProduct(getSessionId(), phone_tel, name + " | " + name, "0", "Direct", phone_tel, total, '0', owner);
            showOrder();
        } else {
            alert(obj.error_msg);
        }
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });

}
function showOrder() {
    $('#order_model').modal('show');
}


function payProduct(ref, user, reason, type, mode, from, amount, status, owner) {
    //console.log(amount + acc_bal);
    formData = new FormData();
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
            depo_yo(user, amount, reason);
            //alert("Successful Purchase");
        } else {
            alert('Error Ocurred Please contact System Admin');
        }
        return response.text();
    }).catch(function (err) {
        console.log('ERROR: ' + err);
    });
}


function depo_yo(tel, amt, naration, owner) {
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
                    addAcc(owner, owner, amt);
                    addtransaction(owner, owner, 'Purchase Purchase', amt, "Product Purchase", "0");
                    alert("Payment Success");
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

function cartCounter() {
    try {
        $.ajax({
//
            url: url + "counter/cart/" + getSessionId() + "/0",
            dataType: 'json',
            type: 'get',
            cache: false,
            // timeout:3000, //3 second timeout 
            processData: false,
            contentType: false,
            beforeSend: function () {               //tbody.html("<tr><td colspan='5' align='center'><i class = 'fa fa-spinner spin'></i> Loading</td></tr>");
                //$("#mw_case_table_body").html('<tr><td colspan="60" align="center"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>');
            },
            complete: function (data) {
                //tbody.html("<i class = 'fa fa-spinner spin'></i> Please Wait.."+ JSON.stringify(data));
            },
            success: function (data) {
                var e_data = '';
                try {
                    //$("#mw_case_table_body").empty();
                    let i = 1;
                    let row = "";
                    if (!isEmpty(data)) {
                        var value = data.count;
                        document.getElementById('cart_counter').innerHTML = value.number;
                    } else {
                        //row += '<tr><td colspan="5" align="center">No data</td></tr>';
                    }
                    //$("#mw_case_table").append(e_data);
                    //pager('mw_case_table');

                } catch (e) {
                    ShowError("Response Error", e, cartCounter);
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

