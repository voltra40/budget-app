import {useState, useEffect} from "react"
import useBudget from "../hooks/useBudget"
import {budgetItemType} from "../types"

const Budget = () => {
	const [loading, setLoading] = useState<boolean>(true)
	const [budgetListItem, setBudgetListItem] = useState<budgetItemType>()

	const {budget, addItem, deleteItem} = useBudget()

	useEffect(() => {
		setLoading(false)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		setLoading(false)
	}, [budget])

	const handleAddItem = async () => {
		if (!budgetListItem) return
		await addItem(budgetListItem.name, budgetListItem.amount)
		window.location.reload()
	}

	const handleDeleteItem = (entry: budgetItemType) => {
		console.log(entry)
		deleteItem(entry.name, entry.amount)
	}

	// important
	const handleChange = <P extends keyof budgetItemType>(
		prop: P,
		value: budgetItemType[P]
	) => {
		setBudgetListItem({
			// bad practice
			...budgetListItem!,
			[prop]: value,
		})
	}

	if (loading) return <div>loading...</div>
	return (
		<div>
			<div className="space-x-2 p-2">
				<input
					type="text"
					value={budgetListItem?.name}
					onChange={(e) => handleChange("name", e.target.value)}
					className="border rounded-md"
				></input>
				<input
					type="number"
					value={budgetListItem?.amount}
					onChange={(e) => handleChange("amount", parseInt(e.target.value))}
					className="border rounded-md"
				></input>
				<button
					className="bg-black p-1 rounded-md"
					type="button"
					onClick={handleAddItem}
				>
					<p className="text-white">add</p>
				</button>
			</div>

			<div className="">
				{budget.map((entry, index) => (
					<div key={index} className="p-2 grid-cols-3 flex flex-row">
						<div className="p-1 w-40">{entry.name}</div>
						<div className="p-1 w-16">{entry.amount}</div>
						<button
							className="bg-black ml-2 rounded-md p-1"
							type="button"
							onClick={() => handleDeleteItem(entry)}
						>
							<p className="text-white">delete</p>
						</button>
					</div>
				))}
			</div>

			<div>
				<div>Total:</div>
				<div>{budget.reduce((a, b) => a + b.amount, 0)}</div>
			</div>
		</div>
	)
}

export default Budget
