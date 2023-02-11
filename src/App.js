import React, { useState, useEffect } from 'react'
import './index.scss'
import Collection from './Collection'

function App() {
	const [categoryId, setCategoryId] = useState(0)
	const [isLoading, setIsLoading] = useState(true)
	const [page, setPage] = useState(1)
	const [searchValue, setSearchValue] = useState('')
	const [collections, setCollections] = useState([])

	const cats = [
		{ name: 'All' },
		{ name: 'Sea' },
		{ name: 'Mountains' },
		{ name: 'Architecture' },
		{ name: 'Cities' },
	]

	useEffect(() => {
		setIsLoading(true)

		const category = categoryId ? `category=${categoryId}` : ''

		fetch(
			`https://6325700a9075b9cbee4ae232.mockapi.io/photo_collections?page=${page}&limit=3&${category}`
		)
			.then(res => res.json())
			.then(json => {
				setCollections(json)
			})
			.catch(err => {
				console.warn(err)
				alert('error data fetching')
			})
			.finally(() => setIsLoading(false))
	}, [categoryId, page])

	return (
		<div className="App">
			<h1>My photo collection</h1>
			<div className="top">
				<ul className="tags">
					{cats.map((obj, i) => (
						<li
							key={obj.name}
							className={categoryId === i ? 'active' : ''}
							onClick={() => setCategoryId(i)}
						>
							{obj.name}
						</li>
					))}
				</ul>
				<input
					value={searchValue}
					onChange={e => setSearchValue(e.target.value)}
					className="search-input"
					placeholder="Search for name"
				/>
			</div>
			<div className="content">
				{isLoading ? (
					<h1>Loading...</h1>
				) : (
					collections
						.filter(obj =>
							obj.name
								.toLowerCase()
								.includes(searchValue.toLowerCase())
						)
						.map((obj, index) => (
							<Collection
								key={index}
								name={obj.name}
								images={obj.photos}
							/>
						))
				)}
			</div>
			<ul className="pagination">
				{[...Array(5)].map((_, i) => (
					<li
						onClick={() => setPage(i + 1)}
						className={page === i + 1 ? 'active' : ''}
					>
						{i + 1}
					</li>
				))}
			</ul>
		</div>
	)
}

export default App
