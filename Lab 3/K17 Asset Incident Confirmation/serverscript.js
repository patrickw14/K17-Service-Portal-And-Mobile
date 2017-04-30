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
		var assetCode = $sp.getParameter("asset");

		var assetGR = new GlideRecord("lab_asset");
		assetGR.addQuery("barcode", assetCode);
		assetGR.query();

		if (assetGR.next()) {
			data.asset = {
				barcode: assetGR.getValue("barcode"),
				image: assetGR.image.getDisplayValue(),
				name: assetGR.getValue("title"),
				questions: []
			}

			var assetQuestionGR = new GlideRecord("lab_asset_question");
			assetQuestionGR.addQuery("sys_id", "IN", assetGR.getValue("questions"));
			assetQuestionGR.query();

			while(assetQuestionGR.next()) {
				data.asset.questions.push(assetQuestionGR.getValue("question"));
			}
		} else {
			data.error = "Asset not found. Sorry!";
		}	
	}
})();
