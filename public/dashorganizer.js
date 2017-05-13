$('#bookmodal').on('shown.bs.modal', function () {
	$('#myInput').focus()
})

$( function(){
  getOffers();
	for( var i = 0; i < offers.length; i++ ){
		addOffer(offers[i]);
	}
});

$('body').on('click','.card > button', function(e){
	e.preventDefault();
   	var enableDays = []
   	for( var i = 0; i < offers.length; i++ ){
   		if( this._id == offers[i]._id ){
   			for( var j = 0; j < offers[i].availability.length; j++ ){
   				var date = new Date(offers[i].availability[j])
   				enableDays.push( '' + date.getDate() + '-' 
   					                + (date.getMonth() + 1)+ '-'
   					                + date.getFullYear() );
   			}
   			$('#form-name').html( offers[i].name );
   			$('#conclude-book').val( offers[i]._id );
   			break;
   		}
   	}

    function enableAllTheseDays(date) {
        var sdate = $.datepicker.formatDate( 'd-m-yy', date)
        if($.inArray(sdate, enableDays) != -1) {
            return [true];
        }
        return [false];
    }
    $('#datepicker').datepicker( "destroy" );
    $('#datepicker').datepicker({
    	dateFormat: 'dd-mm-yy', 
    	beforeShowDay: enableAllTheseDays
    });
	$("#book-modal").modal('show');
});

$('#logout').click(function(e){
	var request = new XMLHttpRequest;
	request.open('POST','/logout',true);
    request.setRequestHeader('Content-type', 'application/json');
    request.send();
    request.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200){ location.reload() }
            else                  { location.reload()}
        }
    }
});

$("#conclude-book").click(function(e){

	var request = new XMLHttpRequest;
	request.open('POST','/book',true);
    request.setRequestHeader('Content-type', 'application/json');
    request.send({
    	id: $('#conclude-book').val(),
    	date: $('#datepicker').val()
    });

    request.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200){ location.reload(); }
            else                  { location.reload(); }
        }
    }
})

addOffer = function(offer){
	$('#dash-table-container-row').append(
		  '<div class="col-md-4">'
	    + '      <div class="card">'
	    + '        <h3>' +  offer.username + '</h3>'
	    + '        <h4>' +  offer.category + '</h4>'
      + '        <h4>' +  offer.cost     + '€ </h4>'
 	    + '        <p class="card-text">' +  offer.description +'</p>'
	    + '        <button id="' + offer._id + '" type="button" class="btn btn-primary" >Book!</button>'
	    + '      </div>'
	    + '</div>'
    );
}

getOffers = function(){
  var request = new XMLHttpRequest;
  request.open('POST','/getOffers',true);
    request.setRequestHeader('Content-type', 'application/json');
    request.send();

    request.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200){
              var newOffers = JSON.parse( request.responseText );
              for( var i = 0; i < newOffers.length; i++ ){
                addOffer(newOffers[i]); 
                offers.push(newOffers[i]);
              } 
            } else { location.reload(); }
        }
    }
}

offers = [
	{"_id":"123",
	 "username":"die artze",
	 "category":"musical act",
   "cost":400,
	 "description":"The beste bande der welt",
	 "availability": [
		1494624009053,
		1494537609053,
		1494364809053
	]},
	{"_id":"125",
	 "username":"Berri Txarrak",
	 "category":"musical act",
   "cost":200,
	 "description":"eskerik asko",
	 "availability": [ 		
	    1494624009053,
		1494537609053
	]},
	{"_id":"124",
	 "username":"telepizza",
	 "category":"Catering",
   "cost":500,
	 "description":"We make pizza!",
	 "availability": [
	    1494624009053,
		1494537609053,
		1494364809053
	]},
]