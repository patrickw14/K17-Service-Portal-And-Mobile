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
			}).then(openAssetPageModal);
		}, function(err) {
			cabrillo.log('Whoops.');
			c.barcode = "IT1039655";
      c.server.get({
				action: "get_asset",
				barcode: c.barcode
			}).then(openAssetPageModal);
		});
	}

	function openAssetPageModal(response) {
		removeButtons();
		var modalURL = "/$sp.do?id=k17_asset_incident_confirmation&asset=" + response.data.assetID;
		cabrillo.modal.presentModal("Create Incident", modalURL, cabrillo.modal.CLOSE_BUTTON_STYLE_CANCEL, cabrillo.modal.MODAL_PRESENTATION_STYLE_FORM_SHEET).then(function(response) {
			if (!response) {
				c.done = true;
				c.success = false;
			}
			
			if (response.results.success === true) {
				c.done = true;
				c.success = true;
			} else {
				c.done = true;
				c.success = false;
			}
		});
	}
	
	function removeButtons() {
		cabrillo.viewLayout.setBottomButtons([], function(){});
	}
}
