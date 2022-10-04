"use strict"

const AWS = require("aws-sdk")
const dynamoDB = new AWS.DynamoDB.DocumentClient({region: "us-east-1"})

module.exports.handler = async (event) => {
	// const name = event.pathParameters.name
	// const amount = event.pathParameters.amount

	const params = {
		TableName: "budget",
		Key: {
			name: "test",
			amount: 123,
		},
	}

	const output = await dynamoDB
		.get(params, function (err, data) {
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
		statusCode: 201,
		body: JSON.stringify(output.Item),
	}
}
