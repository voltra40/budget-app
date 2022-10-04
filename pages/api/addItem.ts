import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda"
const AWS = require("aws-sdk")

const dynamoDB = new AWS.DynamoDB.DocumentClient({region: "us-east-1"})

export const handler = async (
	event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
	const reqBody = JSON.parse(event.body as string)

	const params = {
		TableName: "budget",
		Item: reqBody,
	}

	const response = {
		statusCode: 200,
		body: "",
	}

	try {
		await dynamoDB
			.put(params, function (err: any, data: any) {
				if (err) {
					console.log("error", err)
				} else {
					console.log("success", data)
				}
			})
			.promise()

		response.body = `Put Item ${JSON.stringify(params)}`
	} catch (error) {
		console.log(error)
		response.statusCode = 400
		response.body = error as string
		return response
	}

	return response
}
