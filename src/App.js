import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
	const [repositories, setRepositories] = useState([]);

	useEffect(() => {
		api.get('/repositories').then(response => {
			setRepositories(response.data);
		});
	}, []);

	async function handleAddRepository() {
		const response = await api.post('/repositories', {
			title: `Projeto ${Date.now()}`,
			url: 'https://github.com/Zardosh/bootcamp-go-stack-desafio2',
			techs: ['ReactJS', 'Node.js'],
		});

		const project = response.data;

		setRepositories([...repositories, project]);
	}

	async function handleRemoveRepository(id) {
		await api.delete(`/repositories/${id}`);

		setRepositories(repositories.filter(project => project.id !== id));
	}

	return (
		<div>
			<ul data-testid="repository-list">
				{repositories.map(project => (
					<li key={project.id}>
						{project.title}

						<button onClick={() => handleRemoveRepository(project.id)}>Remover</button>
					</li>
				))}
			</ul>

			<button onClick={handleAddRepository}>Adicionar</button>
		</div>
	);
}

export default App;
