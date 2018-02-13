(function () {
    var myConnector = tableau.makeConnector();

	 
    myConnector.getSchema = function (schemaCallback) {
    var cols = [{
        id: "id",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "key",
        alias: "key",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "email",
        alias: "email",
        dataType: tableau.dataTypeEnum.string
    }];

    var tableSchema = {
        id: "jiraFeed",
        alias: "Feed from Jira",
        columns: cols
    };

    schemaCallback([tableSchema]);
    };

    myConnector.getData = function (table, doneCallback) {
	
	
		$.getJSON("jira_do.json", function(resp) {
		
			var tableData = [];
	
			// Iterate over the JSON object
			for (var i=0; i < resp.issues.length; i++) {
				tableData.push({
					"id": resp.issues[i].id,
					"key": resp.issues[i].key,
					"email": resp.issues[i].fields.reporter.emailAddress
				});
			}
			
			table.appendRows(tableData);
			doneCallback();
    });
    };

    tableau.registerConnector(myConnector);
})();

$(document).ready(function () {
    $("#submitButton").click(function () {
        tableau.connectionName = "WDC Jira Feed";
        tableau.submit();
    });
});