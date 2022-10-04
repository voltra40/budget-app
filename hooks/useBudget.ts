import {useEffect, useState} from "react"
import {budgetItemType} from "../types"

interface useBudgetReturnType {
	budget: budgetItemType[]
	addItem: (name: string, amount: number) => void
	deleteItem: (name: string, amount: number) => void
}
const useBudget = (): useBudgetReturnType => {
	const [budget, setBudget] = useState<budgetItemType[]>([])

	const getData = async () => {
		const response = await fetch(
			"https://q7m47ee4kb.execute-api.us-east-1.amazonaws.com/getBudget"
		)
		const data = await response.json()
		console.log("data:", data.budget)

		if (response.ok) {
			setBudget(data?.budget)
		} else {
			// handle error
		}
	}

	const addItem = async (name: string, amount: number) => {
		try {
			const data = await fetch(
				"https://q7m47ee4kb.execute-api.us-east-1.amazonaws.com/addItem",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({name: name, amount: amount}),
				}
			)
			return data
		} catch (error) {
			console.error(error)
		}
	}

	const deleteItem = async (name: string, amount: number) => {
		try {
			const data = await fetch(
				`https://q7m47ee4kb.execute-api.us-east-1.amazonaws.com/deleteItem/name/${name}/amount/${amount}`,
				{
					method: "DELETE",
				}
			)
			return data
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		getData()
	}, [])

	return {budget, addItem, deleteItem}
}

export default useBudget
