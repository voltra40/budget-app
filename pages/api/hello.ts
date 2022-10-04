// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from "next"
import {budgetItemType} from "../../types"

type Data = {
	name: string
}

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	if (req.method === "POST") {
		// Process a POST request
	} else {
		res.status(200).json({name: "John Doe"})
	}
}
