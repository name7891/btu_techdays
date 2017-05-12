$("#create-provider-event").click(function(e) {
    e.preventDefault();
    var type = document.getElementById('provider-type').value;
    //var availability = document.getElementById('provider-availability').value;
	/**
	 *	var display = Array();
     *	display[0] = "date1";
	 *  display[1] = "date2";
	 *	display[2] = "date3";
	 *	JSON.stringify(display)
	 */
    var cost = document.getElementById('provider-cost').value;
    var desc = document.getElementById('provider-desc').value;

    var request = new XMLHttpRequest;

    request.open('POST', '/provider', true);
    request.setRequestHeader('Content-type', 'application/json');

    request.send(JSON.stringify({
		"type":		   	type,
		//provider-availability:  availability,
		"cost":		   	cost,
		"desc":			desc,
    }));
    console.log( JSON.stringify({
		"type":		   	type,
		//provider-availability:  availability,
		"cost":		   	cost,
		"desc":			desc,
    }));
    request.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
//                location.reload()
            } else                  {
                console.log(request.responseText)
            }
        }
    }
});
