import React, { useState, useEffect } from "react";

export default function App(){
  const [repositories, setRepositories] = useState([])

  useEffect(async () => {
    const response = await fetch('https://api.github.com/users/Uilson2020/repos');
    const data = await response.json();

    setRepositories(data);
  },[]);
  
  function handleFavorite(id){
    const newRepositories = repositories.map(repo => {
      return repo.id == id ? { ...repo, favorite: !repo.favorite}: repo
    });

    setRepositories(newRepositories);
  }

  useEffect(() => {
    const filtered = repositories.filter(repo => repo.favorite);

    document.title = `Você tem ${filtered.length} favoritos`
  }, [repositories]);

  return (
    <ul className="ulRepo">
      {repositories.map(repo => (
        <li className="liRepo" key={repo.id}>
          {repo.name}
          {repo.favorite && <span>(Favorito)</span>}
          <button onClick={() => handleFavorite(repo.id)}>Favoritar</button>
          </li>
        ))}
      </ul>
    );
}
