function(cabrillo) {
  /* widget controller */
  var c = this;
	
	if (!c.data.asset.questions.length) {
		cabrillo.viewLayout.setBottomButtons([{
			title: 'Report Incident',
			enabled: true,
			backgroundColor: '#2d86d5',
			textColor: '#FFFFFF'
		}], function(e) {
			c.reportIncident();
		});	
	}
	
	cabrillo.viewLayout.setNavigationBarButtons([{
		title: 'Save',
		enabled: true,
		backgroundColor: '#2d86d5',
		textColor: '#FFFFFF'
	}], function() {
		c.reportIncident();
	})

	c.reportIncident = function(reason, index) {
		c.selectedIndex = index;
		c.server.get({
			action: "report_incident",
			reason: reason,
			assetName: c.data.asset.name
		}).then(function() {
			cabrillo.modal.dismissModal({
				success: true
			});
		});
	}
}
