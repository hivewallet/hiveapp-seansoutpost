/**
 * Created by marcinra on 10/19/13.
 */
var address = '1M72Sfpbz1BPpXFHz9m3CdqATR44Jvaydd';
var separator;
var perPersonCostUSD = 1.25;
var rateBTCUSD = 0.00;
var userBTC;
var ratesURI = 'https://bitpay.com/api/rates';

$(document).ready(function() {
    init();
    $('#in_cash').keyup(function(){ updateEstimate(); });
});

function isNumber(n) {
    'use strict';
    n = n.replace(',', '.');
    if (!isNaN(parseFloat(n)) && isFinite(n)) {
        userBTC = n;
        return true;
    }
    return false;
}

function updateEstimate() {
    var amountBTC = $('#in_cash').val();
    if (isNumber(amountBTC)) {
        //console.log('Got decimal number ' + userBTC.toString());
        //console.log('rateBTCUSD = ' + rateBTCUSD)
        var amountUSD = userBTC * rateBTCUSD;
        //console.log('amountUSD = ' + amountUSD.toString())
        var peopleFed = amountUSD / perPersonCostUSD;
        //console.log('peopleFed = ' + peopleFed.toString())
        $('#persons_fed').val(parseInt(peopleFed).toString());
    } else {
        $('#persons_fed').val('0');
    }
}

function setRates() {
    $.ajax({
      dataType: "json",
      url: ratesURI,
      success: function(data) {
        $.each( data, function( key, val ) {
            if (val.code == 'USD') { rateBTCUSD = val.rate; console.log('Set rate to ' + val.rate.toString() + ' ' + val.code); }
          });
        updateEstimate();
      }
    });
}

var init = function(){
    bitcoin.getSystemInfo(function(info) {
        separator = info.decimalSeparator;
        var amount_val = document.getElementById('in_cash');
        amount_val.value = '0'+ separator + '05';
    });
    setRates();
    updateEstimate();
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
