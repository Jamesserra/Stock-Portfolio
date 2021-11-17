let updateMarketValue = function(ele) {
  let sharesOwned = parseFloat($(ele).children('.shares').text());
  let marketPrice = parseFloat($(ele).children('.marketPrice').text());
  let marketValue = sharesOwned * marketPrice;

  // market value is shares times market price per share
  $(ele).children('.marketValue').html(marketValue);
  return marketValue;
}

let updateUnrealizedProfit = function (ele, marketValue) {
  let sharesOwned = parseFloat($(ele).children('.shares').text());
  let costPerShare = parseFloat($(ele).children('.cost').text());
  let costOfPurchase = sharesOwned * costPerShare;

  // unrealized profit is market value minus cost of purchase
  let unrealizedProft = marketValue - costOfPurchase;
  $(ele).children('.profit').html(unrealizedProft);
  return unrealizedProft;
}


$(document).ready(function () {
  $('tbody tr').each(function(i, ele) {
   let marketValue = updateMarketValue(ele);
    updateUnrealizedProfit(ele, marketValue)
  })
})