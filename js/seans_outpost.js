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

var btc_string_to_satoshi = function(amount){
    var tab = [];
    if (amount.indexOf(separator) > 0 ){
        tab = amount.split(separator);
    }else{
        tab = [amount,'0'];
    }
    var count = tab[1].length;
    tab = [parseInt(tab[0]), parseInt(tab[1])];
    return tab[0]*bitcoin.BTC_IN_SATOSHI + tab[1]*(bitcoin.BTC_IN_SATOSHI/(Math.pow(10,count)));
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
    var amount = btc_string_to_satoshi(amount_val.value);
    if(amount!=0){
        bitcoin.sendMoney(address, amount, success);
    }
}
