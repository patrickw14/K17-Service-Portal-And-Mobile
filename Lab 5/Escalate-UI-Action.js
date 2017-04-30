current.impact = '1';
current.urgency = '1';
current.update();

var isCoffeeIncident = current.short_description.includes('coffee');

if (isCoffeeIncident) {
	action.setRedirectURL('/$sp.do?id=k17_escalate_coffee_incident');
}
