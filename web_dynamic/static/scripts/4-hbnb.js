//A script to store the amenity id for checked checkboxes
$('document').ready(function(){
  const amenityLs={};
  const filters={};
  filters['amenities']=[]
  $('INPUT[type="checkbox"]').change(function(){
    if ($(this).is(':checked')){
       amenityLs[$(this).attr('data-id')] = $(this).attr('data-name');
       filters['amenities'].push($(this).attr('data-id'));
    }
    else {
      delete amenityLs[$(this).attr('data-id')];
      let index = filters['amenities'].indexOf($(this).attr('data-id'));
      if (index > -1){
        filters['amenities'].splice(index, 1);
      }
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
  $('button').on('click', function(){
     $.ajax({
        url: 'http://8cae54ddf86b.2bf38412.alx-cod.online:5001/api/v1/places_search',
        type:  'POST',
        contentType: 'application/json',
        data: JSON.stringify({filters}), 
        success: function(data){
          renderSearch(data);
       }   
     });
  });
  $.ajax({
    url: 'http://8cae54ddf86b.2bf38412.alx-cod.online:5001/api/v1/places_search',
    type:  'POST',
    contentType: 'application/json',
    data: JSON.stringify({filters}), 
    success: function(data){
      renderSearch(data);
    }
  });
  function renderSearch(data={}){
    data.forEach(function(d){
      let article=`<article>
	  <div class="title_box">
	    <h2>${d.name}</h2>
	    <div class="price_by_night">$${d.price_by_night}</div>
	  </div>
	  <div class="information">
	    <div class="max_guest">${d.max_guest} Guest${d.max_guest === 1 ? '' : 's'}</div>
            <div class="number_rooms">${d.number_rooms} Bedroom${d.number_room === 1 ? '' : 's'}</div>
          <div class="number_bathrooms">${d.number_bathrooms} Bathroom${d.number_bathroom === 1 ? '' : 's'}</div>
	  </div>
          <div class="description">
	    ${d.description}
          </div>
	</article>`
    $('.places').append(article);
      });
    }
});

