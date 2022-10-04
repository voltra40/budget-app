import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda"
const AWS = require("aws-sdk")
const dynamoDB = new AWS.DynamoDB.DocumentClient({region: "us-east-1"})

export const handler = async (
	event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
	const name = event.pathParameters?.name
	// const amount = event.pathParameters?.amount

	const params = {
		TableName: "budget",
		Key: {
			name: name,
			// amount: parseInt(amount as string),
		},
	}

	const response = {
		// possibly use 204
		statusCode: 200,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Credentials": true,
		},
		body: "",
	}

	try {
		await dynamoDB
			.delete(params, function (err: any, data: any) {
				if (err) {
					console.log("error", err)
				} else {
					console.log("success", data)
				}
			})
			.promise()

		response.body = `Deleted Item ${JSON.stringify(params)}`
	} catch (error) {
		console.log(error)
		response.statusCode = 400
		response.body = error as string
		return response
	}

	return response
}
