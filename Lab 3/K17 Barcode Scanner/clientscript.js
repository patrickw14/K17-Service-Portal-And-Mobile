function(cabrillo, $timeout) {
  /* widget controller */
  var c = this;
	
	c.isNative = cabrillo.isNative();	
	
	function setScanButton() {
		cabrillo.viewLayout.setBottomButtons([{
			title: 'Scan Code',
			enabled: true,
			backgroundColor: '#2d86d5',
			textColor: '#FFFFFF'
		}], function(e) {
			c.getBarcode();
		});
	}
	
	setScanButton();
	
	c.getBarcode = function() {
		cabrillo.camera.getBarcode().then(function(value) {
			cabrillo.viewLayout.showSpinner();
			c.barcode = value;
      c.server.get({
				action: "get_asset",
				barcode: c.barcode
			}).then(openAssetPageModal);
		}, function(err) {
			cabrillo.log('Whoops.');
			c.barcode = "COFFEE_MACHINE_1011";
      c.server.get({
				action: "get_asset",
				barcode: c.barcode
			}).then(openAssetPageModal);
		});
	}
	
	c.viewIncidents = function() {
		cabrillo.navigation.goto("", {
		    table: 'incident',
		    query: 'active=true^caller_id=javascript:gs.user_id()'
		});
	}
	
	function openAssetPageModal(response) {
		removeButtons();
		cabrillo.viewLayout.hideSpinner();
		cabrillo.modal.presentModal("Confirm Incident", "/$sp.do?id=k17_asset_incident_confirmation&asset=" + response.data.assetID, cabrillo.modal.CLOSE_BUTTON_STYLE_CANCEL, cabrillo.modal.MODAL_PRESENTATION_STYLE_FORM_SHEET).then(function(response) {
			if (!response) {
				c.barcode = null;
				setScanButton();
			}
			
			if (response.results.success === true) {
				c.done = true;
				c.success = true;
			} else {
				c.barcode = null;
				setScanButton();
			}
		});
	}
	
	function removeButtons() {
		cabrillo.viewLayout.setBottomButtons([], function(){});
	}
}
