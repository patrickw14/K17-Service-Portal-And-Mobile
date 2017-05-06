function(cabrillo) {
	/* widget controller */
	var c = this;

	c.getLocation = function() {
		cabrillo.viewLayout.showSpinner();
		cabrillo.geolocation.getCurrentLocation().then(function(response) {
			c.server.get({
				action: "get_address",
				lat: response.coordinate.latitude,
				lng: response.coordinate.longitude
			}).then(function(response) {
				cabrillo.viewLayout.hideSpinner();
				c.addressList = response.data.addressList.filter(function(address) {
					return address.types.includes("street_address");
				});
				
				if (c.addressList.length == 0)
					c.addresList.push({formatted_address: "9800 International Dr, Orlando, FL 32819"});

				c.loaded = true;
			})
		});	
	}

	c.selectAddress = function(address, index) {
		c.selectedIndex = index;

		cabrillo.viewLayout.setBottomButtons([{
			title: 'Order Coffee',
			enabled: true,
			backgroundColor: '#2d86d5',
			textColor: '#FFFFFF'
		}], function(e) {
			alert("Ordered!");
			cabrillo.navigation.goBack();
		});
	}
}
