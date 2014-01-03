/**
 * Created by marcinra on 10/19/13.
 */
var address = '1M72Sfpbz1BPpXFHz9m3CdqATR44Jvaydd';
var separator;
var perPersonCostUSD = 1.25;
var rateBTCUSD = 0.00;
var userBTC;

$(document).ready(function() {
    init();
    $('#in_cash').keyup(function(){ updateEstimate(); });
});

function isNumber(n) {
    'use strict';
    n = n.replace(',', '.');
    if (!isNaN(parseFloat(n)) && isFinite(n)) {
        // FIXME remove side-effecting
        userBTC = n;
        return true;
    }
    return false;
}

function updateEstimate() {
    var amountBTC = $('#in_cash').val();
    if (isNumber(amountBTC)) {
        var amountUSD = userBTC * rateBTCUSD;
        console.log(amountUSD);
        var peopleFed = amountUSD / perPersonCostUSD;
        console.log(peopleFed);
        $('#persons_fed').val(parseInt(peopleFed).toString());
    } else {
        $('#persons_fed').val('0');
    }
}

function setRates(currency, amount) {
    console.log(currency, amount);
    if (currency != 'USD')
        return;

    rateBTCUSD = amount;
    updateEstimate();
}

var init = function(){
    bitcoin.getSystemInfo(function(info) {
        separator = info.decimalSeparator;
        var amount_val = document.getElementById('in_cash');
        amount_val.value = '0'+ separator + '05';
    });
    bitcoin.addExchangeRateListener(setRates);
    bitcoin.updateExchangeRate('USD');
}

var success = function(success, transaction_id){
    if (success){
        alert("Thanks for donating!");
    }
}

var send = function(){
    var amount_val = $('#in_cash').val();
    var amount = btc_string_to_satoshi(amount_val, separator);
    if(amount!=0){
        bitcoin.sendMoney(address, amount, success);
    }
}
