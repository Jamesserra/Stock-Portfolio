let updateMarketValue = function(ele) {
  let sharesOwned = parseFloat($(ele).find('.shares input').val());
  let marketPrice = parseFloat($(ele).find('.marketPrice input').val());
  let marketValue = sharesOwned * marketPrice;

  // market value is shares times market price per share
  $(ele).children('.marketValue').html(marketValue);
  return marketValue;
}

let updateUnrealizedProfit = function (ele, marketValue) {
  let sharesOwned = parseFloat($(ele).find('.shares input').val());
  let costPerShare = parseFloat($(ele).find('.cost input').val());
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

let sum = function (acc, x) { return acc + x};

let updateValueAndProfit = function () {
  let stocksMarketValues = [];
  let stocksUnrealizedProfits = [];

  $('tbody tr').each(function(i, ele) {
    let marketValue = updateMarketValue(ele);
    stocksMarketValues.push(marketValue);
    let unrealizedProfit = updateUnrealizedProfit(ele, marketValue);
    stocksUnrealizedProfits.push(unrealizedProfit);
  });

  let portfolioMarketValue = stocksMarketValues.reduce(sum);
  let porfolioUnrealizedProfit = stocksUnrealizedProfits.reduce(sum);
  $('#portfolioValue').html(portfolioMarketValue);
  $('#portfolioProfit').html(porfolioUnrealizedProfit);
}

$(document).ready(function() {
  updateValueAndProfit();

  $('button').on('click', function(event) {
    $(this).closest('tr').remove();
    updateValueAndProfit();
  });

  $(document).on('click', '.btn.remove', function (event) {
    $(this).closest('tr').remove();
    updateValueAndProfit();
  });
    
  let timeout;
  $(document).on('input', 'tr input', function () {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      updateValueAndProfit();
    }, 1000);
  });
  

  $('#addStock').on('submit', function(event) {
    event.preventDefault();
    let name = $(this).children('[name=name]').val();
    let shares = $(this).children('[name=shares]').val();
    let cost = $(this).children('[name=cost]').val();
    let marketPrice = $(this).children('[name=marketPrice]').val();

    $('tbody').append('<tr>' +
    '<td class="name">' + name + '</td>' + 
    '<td class="shares"><input type="number" value="' + shares + '"/></td>' +
    '<td class="cost"><input type="number" value="' + cost + '"/></td>' +
    '<td class="marketPrice"><input type="number" value="' + marketPrice + '"/></td>' +
    '<td class="marketValue"></td>' +
    '<td class="profit"></td>' +
    '<td><button class="btn btns-light btn-sm remove">remove</button></td>' + 
    '</tr>');

    updateValueAndProfit();
    $(this).children('[name=name]').val('');
    $(this).children('[name=shares]').val('');
    $(this).children('[name=cost]').val('');
    $(this).children('[name=marketPrice]').val('');
   });
});

