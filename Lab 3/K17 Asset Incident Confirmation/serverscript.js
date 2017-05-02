(function() {
  /* populate the 'data' object */
  /* e.g., data.table = $sp.getValue('table'); */
	
	if (input && input.action == "report_incident") {
		var newIncident = new GlideRecord("incident");
		newIncident.initialize();
		newIncident.setValue("caller_id", gs.getUserID());
		
		var description = "Something is wrong with " + input.assetName;
		if (input.reason)
			description += " - " + input.reason;
		
		newIncident.setValue("short_description", description);
		newIncident.insert();
	} else {
			data.asset = {
				barcode: "COFFEE_MACHINE_1011",
				image: "https://agreatcoffeemachines.files.wordpress.com/2015/07/15.jpg",
				name: "Coffee Machine",
				questions: ["The machine is broken",
									 "The coffee isn't hot enough",
									 "I prefer tea"]
			};
	}
})();
