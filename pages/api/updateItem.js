"use strict"

const AWS = require("aws-sdk")
const dynamoDB = new AWS.DynamoDB.DocumentClient({region: "us-east-1"})

module.exports.handler = async (event) => {
	// const name = event.pathParameters.name

	const params = {
		TableName: "budget",
		Key: {
			name: "test",
			// updated value
			amount: 9999,
		},
	}

	const output = await dynamoDB
		.put(params, function (err, data) {
			if (err) {
				console.log("error", err)
			} else {
				console.log("success", data)
			}
		})
		.promise()

	if (!output.Item) {
		return {
			statusCode: 404,
			body: JSON.stringify({error: "item not found"}),
		}
	}

	return {
		statusCode: 200,
		body: JSON.stringify(output.Item),
	}
}
