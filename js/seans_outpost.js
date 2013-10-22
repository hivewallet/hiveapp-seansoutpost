/**
 * Created by marcinra on 10/19/13.
 */
var address = '1M72Sfpbz1BPpXFHz9m3CdqATR44Jvaydd';

var separator;

var init = function(){
    bitcoin.getSystemInfo(function(info) {
        separator = info.decimalSeparator;
        var amount_val = document.getElementById('in_cash');
        amount_val.value = '1'+ separator + '00';
    });
}

function isNumber(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }

var validateValue = function(temp){
    if (temp.indexOf(separator)>0){
        temp.replace(separator,'.');
    }
    if(!isNumber(temp.value)){
        temp.value='1'+separator+'00';
        alert("can't read value it's not a number");
    }
}

var success = function(success, transaction_id){
    if (success){
        alert("thanks for donate!");
    }
}

var send = function(){
    var amount_val = document.getElementById('in_cash');
    var amount = btc_string_to_satoshi(amount_val.value, separator);
    if(amount!=0){
        bitcoin.sendMoney(address, amount, success);
    }
}
