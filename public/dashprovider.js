
$(document).ready(function(){
	$('#datepicker').multiDatesPicker({
		inline: true,
	});
	var request = new XMLHttpRequest;
	request.open('POST','/getProviderDash',true);
    request.setRequestHeader('Content-type', 'application/json');
    request.send();
    request.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200){   
	            var data = JSON.parse(request.responseText);  
                console.log(data)	
	        	$('#selectCategory').val(data.category);
	    		$('#cost').val(data.cost);
	    		$('#description').val(data.description);
	    		//dates:       $('#datepicker').multiDatesPicker('getDates'); }
            } else { 
            	console.log(request.responseText);
            }
        }
    }
})


$('#save').click(function(e){
	e.preventDefault();
	var request = new XMLHttpRequest;
	request.open('POST','/saveProviderDash',true);
    request.setRequestHeader('Content-type', 'application/json');
    request.send( JSON.stringify({
    	category: $('#selectCategory').val(),
    	cost:     $('#cost').val(),
    	description: $('#description').val(),
    	dates:       $('#datepicker').multiDatesPicker('getDates')
    }) );
    request.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200){ location.reload(); }
            else                  { location.reload(); }
        }
    }
	
})




$('#logout').click(function(e){
	var request = new XMLHttpRequest;
	request.open('POST','/logout',true);
    request.setRequestHeader('Content-type', 'application/json');
    request.send();
    request.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200){ location.reload(); }
            else                  { location.reload(); }
        }
    }
});

