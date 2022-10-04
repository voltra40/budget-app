import {APIGatewayProxyHandler} from "aws-lambda"
const AWS = require("aws-sdk")

const dynamoDB = new AWS.DynamoDB.DocumentClient({region: "us-east-1"})

export const handler: APIGatewayProxyHandler = async () => {
	const params = {
		TableName: "budget",
	}

	const output = await dynamoDB
		.scan(params, function (err: any, data: any) {
			if (err) {
				console.log("error", err)
			} else {
				console.log("success", data)
			}
		})
		.promise()

	return {
		statusCode: 200,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Credentials": true,
		},
		body: JSON.stringify({budget: output.Items}),
	}
}
