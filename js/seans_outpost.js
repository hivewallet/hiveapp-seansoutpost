/**
 * Created by marcinra on 10/19/13.
 */
var donationAddress = '1M72Sfpbz1BPpXFHz9m3CdqATR44Jvaydd';
var perPersonCostUSD = 1.25;
var rateBTCUSD = 0.00;
var userBTC;
var hiveInfo;
var defaultAmountSatoshi = 5000000;


var init = function(){
  bitcoin.getSystemInfo(function(info) {
    hiveInfo = info;
    $('.preferredBitcoinFormat').text(hiveInfo.preferredBitcoinFormat);
  });

  $('#in_cash').val(bitcoin.userStringForSatoshi(defaultAmountSatoshi));
  bitcoin.addExchangeRateListener(setRates);
  bitcoin.updateExchangeRate('USD');

  $('#in_cash').keyup( updateEstimate );
  $('#done').click( send );
}

function updateEstimate() {
  var userAmountSatoshi = bitcoin.satoshiFromUserString($('#in_cash').val());
  if ( userAmountSatoshi > 0 ) {
    var peopleFed = userAmountSatoshi * (rateBTCUSD / bitcoin.BTC_IN_SATOSHI) / perPersonCostUSD;
    $('#persons_fed').val(parseInt(peopleFed));
  } else {
    $('#persons_fed').val(0);
  }
}

function setRates(currency, amount) {
  if (currency != 'USD')
    return;

  rateBTCUSD = amount;
  updateEstimate();
}

var success = function(success, transaction_id){
  if (success){
    alert("Thanks for donating!");
  }
}

var send = function(){
  var userAmountSatoshi = bitcoin.satoshiFromUserString($('#in_cash').val());
  if( userAmountSatoshi > 0 ){
    bitcoin.sendMoney(donationAddress, userAmountSatoshi, success);
  }
}
