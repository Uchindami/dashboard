import React, { useState } from 'react';

const InvoiceForm = () => {
	const [items, setItems] = useState([
		{ item: '', description: '', quantity: '', amount: '' }
	]);

	const handleInputChange = (index, key, value) => {
		const newItems = [...items];
		newItems[index][key] = value;
		setItems(newItems);
	};

	const handleAddItem = () => {
		setItems([...items, { item: '', description: '', quantity: '', amount: '' }]);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('Form submitted with data:', items);
		// Add logic to handle the form data as needed
	};

	return (
		<div>
			<h1>Invoice Form</h1>
			<form onSubmit={handleSubmit}>
				{items.map((item, index) => (
					<div key={index}>
						<label>
							Item:
							<input
								type="text"
								value={item.item}
								onChange={(e) => handleInputChange(index, 'item', e.target.value)}
								required
							/>
						</label>
						<br />

						<label>
							Description:
							<input
								type="text"
								value={item.description}
								onChange={(e) => handleInputChange(index, 'description', e.target.value)}
								required
							/>
						</label>
						<br />

						<label>
							Quantity:
							<input
								type="number"
								value={item.quantity}
								onChange={(e) => handleInputChange(index, 'quantity', e.target.value)}
								required
							/>
						</label>
						<br />

						<label>
							Amount:
							<input
								type="number"
								value={item.amount}
								onChange={(e) => handleInputChange(index, 'amount', e.target.value)}
								required
							/>
						</label>
						<br />
					</div>
				))}
				<button type="button" onClick={handleAddItem}>
					+ Add Item
				</button>
				<br />
				<button type="submit">Submit</button>
			</form>
		</div>
	);
};

export default InvoiceForm;
