import React from 'react';

const Home = () => {
	const notes = [
		{
			id: 1,
			title: "Test 1",
			desc: "Test 1 Desc"
		},
		{
			id: 2,
			title: "Test 2",
			desc: "Test 2 Desc"
		},
		{
			id: 3,
			title: "Test 3",
			desc: "Test 3 Desc"
		}
	]
	return (
			<div className="home">
				<div className="notes">
					{notes.map((note) => (
							<div className="post" key={note.id}>
								<h1>{note.title}</h1>
								<p>{note.desc}</p>
							</div>
					))}
				</div>
			</div>
	);
};

export default Home;