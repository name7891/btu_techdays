$('#bookmodal').on('shown.bs.modal', function () {
	$('#myInput').focus()
})

$( function() {
	for( var i = 0; i < offers.length; i++ ){
		addOffer(offers[i]);
	}
} );

$('body').on('click','.card > button', function(e){
	e.preventDefault();
   	var enableDays = []
   	for( var i = 0; i < offers.length; i++ ){
   		if( this.id == offers[i].id ){
   			for( var j = 0; j < offers[i].availability.length; j++ ){
   				var date = new Date(offers[i].availability[j])
   				enableDays.push( '' + date.getDate() + '-' 
   					                + (date.getMonth() + 1)+ '-'
   					                + date.getFullYear() );
   			}
   			break;
   		}
   	}

   	console.log(enableDays)
    function enableAllTheseDays(date) {
        var sdate = $.datepicker.formatDate( 'd-m-yy', date)
        if($.inArray(sdate, enableDays) != -1) {
            return [true];
        }
        return [false];
    }

    $('#datepicker').datepicker({dateFormat: 'dd-mm-yy', beforeShowDay: enableAllTheseDays});
	$("#book-modal").modal('show');
});




addOffer = function(offer){
	$('#dash-table-container-row').append(
		  '<div class="col-md-4">'
	    + '      <div class="card">'
	    + '        <h3>' +  offer.name + '</h3>'
	    + '        <h4>' +  offer.type + '</h4>'
	    + '        <p class="card-text">' +  offer.description +'</p>'
	    + '        <button id="' + offer.id + '" type="button" class="btn btn-primary" >Book!</button>'
	    + '      </div>'
	    + '</div>'
    );
}

offers = [
	{"id":"123",
	 "name":"die artze",
	 "type":"musical act",
	 "description":"The beste bande der welt",
	 "availability": [
		1494624009053,
		1494537609053,
		1494364809053
	]},
	{"id":"125",
	 "name":"Berri Txarrak",
	 "type":"musical act",
	 "description":"eskerik asko",
	 "availability": [ 		
	    1494624009053,
		1494537609053,
		1494364809053
	]},
	{"id":"124",
	 "name":"telepizza",
	 "type":"Catering",
	 "description":"We make pizza!",
	 "availability": [
	    1494624009053,
		1494537609053,
		1494364809053
	]},
]