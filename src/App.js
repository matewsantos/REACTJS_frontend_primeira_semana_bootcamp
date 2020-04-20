import React, { useState, useEffect } from 'react';
import api from './services/api'
import './App.css'

import Header from './components/Header'

/**
 * Componente
 * Propriedade
 * Estado e Imutabilidade
 */

function App() {
  /**
   * UseState retorna um array com 2 posições
   * 1 - Varável com o seu valor inicial
   * 2 - Função para atualizarmos esse valor
   */
  const [projects, setProjects] = useState([])

  /**
   * UseEffect recebe 2 parametros
   * 1 - Qual função será disparada
   * 2 - Quandoa função será disparada
   */
  useEffect(() => {
    api.get('/projects').then(response => {
      setProjects(response.data);
    })
  }, [])



  async function handleAddProject() {
    const response = await api.post('/projects', {
      title: `Project Front-end ${Date.now()}`,
      ownder: "Mateus Santos"
    });

    const project = response.data;

    setProjects([...projects, project]);
  }

  return (
    <>
      <Header title="Projects"></Header>

      <ul>
        {projects.map(project =>
          <li key={project.id}>{project.title}</li>
        )}
      </ul>

      <button type="button" onClick={handleAddProject}>Adicionar Projeto</button>
    </>
  )
}

export default App;