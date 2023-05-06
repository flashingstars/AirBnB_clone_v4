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
});

