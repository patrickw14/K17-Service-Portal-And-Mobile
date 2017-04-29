function(cabrillo) {
  /* widget controller */
  var c = this;
	
	c.isNative = cabrillo.isNative();	
	cabrillo.viewLayout.setBottomButtons([{
		title: 'Scan Code',
		imageName: 'scan',
		enabled: true,
		backgroundColor: '#2d86d5',
		textColor: '#FFFFFF'
	}], function(e) {
		c.getBarcode();
	});
	
	c.getBarcode = function() {
		cabrillo.camera.getBarcode().then(function(value) {
			c.barcode = value;
      c.server.get({
				action: "get_asset",
				barcode: c.barcode
			}).then(displaySuccessScreen);
		}, function(err) {
			cabrillo.log('Whoops.');
			c.barcode = "COFFEE_MACHINE_1011";
      c.server.get({
				action: "get_asset",
				barcode: c.barcode
			}).then(displaySuccessScreen);
		});
	}
	
	function displaySuccessScreen(response) {
		removeButtons();
		c.done = true;
		c.success = true;
		c.assetID = response.data.assetID;
	}
	
	function removeButtons() {
		cabrillo.viewLayout.setBottomButtons([], function(){});
	}
}
