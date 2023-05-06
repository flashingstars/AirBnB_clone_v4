//A script to store the amenity id for checked checkboxes
$('document').ready(function(){
  const amenityLs={};
  $('INPUT[type="checkbox"]').change(function(){
    if ($(this).is(':checked')){
       amenityLs[$(this).attr('data-id')] = $(this).attr('data-name');
    }
    else {
      delete amenityLs[$(this).attr('data-id')];
    } 
    $('.amenities H4').text(Object.values(amenityLs).join(', '));
  });
  $.get('http://8cae54ddf86b.2bf38412.alx-cod.online:5001/api/v1/status', function(data){
    if (data.status === 'OK'){
      $('#api_status').addClass('available');
    }
    else {
      $('#api_status').removeClass('available');
    }
  });
});

