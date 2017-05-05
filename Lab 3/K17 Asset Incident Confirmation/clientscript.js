function(cabrillo) {
  /* widget controller */
  var c = this;
	cabrillo.viewLayout.setNavigationBarButtons([{
		title: 'Save',
		enabled: true,
		backgroundColor: '#2d86d5',
		textColor: '#FFFFFF'
	}], function() {
		c.reportIncident();
	})

	c.addReason = function(reason, index) {
		c.reason = reason;
		c.selectedIndex = index;
	}
	
	c.reportIncident = function() {
		cabrillo.viewLayout.showSpinner();
		c.server.get({
			action: "report_incident",
			reason: c.reason,
			assetName: c.data.asset.name
		}).then(function() {
			cabrillo.viewLayout.hideSpinner();
			cabrillo.modal.dismissModal({
				success: true
			});
		});
	}
}
