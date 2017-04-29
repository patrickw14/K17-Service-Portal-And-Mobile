(function() {
  /* populate the 'data' object */
  /* e.g., data.table = $sp.getValue('table'); */	
	
	if (input && input.action == "get_asset") {
		data.assetID = input.barcode;
		return;
	}
})();
