/**
 * Created by marcinra on 10/19/13.
 */
var address = '1M72Sfpbz1BPpXFHz9m3CdqATR44Jvaydd';

function isNumber(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }

var validateValue = function(temp){
    if(!isNumber(temp.value)){
        temp.value='0.00';
        alert("can't read value it's not a number");
    }
}

var success = function(success, transaction_id){
    alert("thanks for donate!");
}

var send = function(){
        var amount_val = document.getElementById('in_cash');
        var amount = bitcoin.btc_string_to_satoshi(amount_val.value);
        if(amount!=0){
            bitcoin.sendMoney(address, amount, success);
        }
    }
