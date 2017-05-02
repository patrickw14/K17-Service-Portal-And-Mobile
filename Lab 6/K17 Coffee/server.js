(function() {
	/* populate the 'data' object */
	/* e.g., data.table = $sp.getValue('table'); */
	if (input && input.action == "get_address") {
		var url = "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + input.lat + "," + input.lng;
		var ws = new GlideHTTPRequest(url);
		var response = ws.get();
		if (response) {			
			var response = JSON.parse(response.getBody());		
			data.addressList = response.results;
		}
	}
})();
