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

	c.reportIncident = function(reason, index) {
		cabrillo.viewLayout.showSpinner();
		c.selectedIndex = index;
		c.server.get({
			action: "report_incident",
			reason: reason,
			assetName: c.data.asset.name
		}).then(function() {
			cabrillo.viewLayout.hideSpinner();
			cabrillo.modal.dismissModal({
				success: true
			});
		});
	}
}
