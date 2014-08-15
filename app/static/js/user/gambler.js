(function(){
  'use strict';

  $(document).ready(function(){
    $('.info').click(sellAsset);
  });

  function sellAsset(){
    // debugger;
    var id    = $(this).closest('.gambler').attr('data-gambler-id'),
        asset = $(this).children('.name').text(),
        url   = '/gamblers/' + id + '/assets/' + asset,
        type  = 'delete';
    console.log(id, asset);

    $.ajax({url:url, type:type, dataType:'json', success:function(data){
      // console.log(data);
      // debugger;
      var $gambler = $('.gambler[data-gambler-id='+data.id+']');
      $gambler.find('.info .name: contains('+data.name+')').closest('.asset');
      $gambler.find('.cash').text('$'+ data.cash.toFixed(2));
    }});
  }
})();

