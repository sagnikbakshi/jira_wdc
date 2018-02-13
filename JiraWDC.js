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
        id: "issueType",
        alias: "issueType",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "summary",
        alias: "summary",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "assignee",
        alias: "assignee",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "resolution",
        alias: "resolution",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "created",
        alias: "created",
        dataType: tableau.dataTypeEnum.date,
	}, {
        id: "updated",
        alias: "updated",
        dataType: tableau.dataTypeEnum.date,
    }, {
        id: "epicLink",
        alias: "epicLink",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "fixVersions",
        alias: "fixVersions",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "originalEstimate",
        alias: "originalEstimate",
        dataType: tableau.dataTypeEnum.int
    }, {
        id: "timeSpent",
        alias: "timeSpent",
        dataType: tableau.dataTypeEnum.int
    }, {
        id: "resolutionDate",
        alias: "resolutionDate",
        dataType: tableau.dataTypeEnum.date
    }, {
        id: "storyPoints",
        alias: "storyPoints",
        dataType: tableau.dataTypeEnum.float
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
					"issueType": resp.issues[i].fields.issuetype.name,
					"summary":resp.issues[i].summary,
					"assignee":resp.issues[i].assignee,
					"resolution":resp.issues[i].resolution.name,
					"created":resp.issues[i].created,
					"updated":resp.issues[i].updated,
					"epicLink":resp.issues[i].customfield_12487,
					"fixVersions":resp.issues[i].fixVersions[1].name,
					"originalEstimate":resp.issues[i].progress.total,
					"timeSpent":resp.issues[i].progress.progress,
					"resolutionDate":resp.issues[i].resolutiondate,
					"storyPoints":resp.issues[i].customfield_10003
						
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