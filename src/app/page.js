"use client";
import React, { useEffect, useState } from 'react'

export default function Index() {
  const [task, setTask] = useState([]);
  const [newtask, setNewtask] = useState('');
  // Pour les modifications
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');



  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(task));
  }, [task]);

  useEffect(() => {
    const tachesSauvegardees = JSON.parse(localStorage.getItem('tasks'));
    if (tachesSauvegardees) {
      setTask(tachesSauvegardees);
    }
  }, []);


  const taches = task.map(tache => <li key={tache.id} style={{ textDecoration: tache.terminé ? 'line-through' : 'none' }}>
    {editingId === tache.id ? (
      <input
        type="text"
        value={editingText}
        onChange={(e) => setEditingText(e.target.value)}
        onBlur={() => saveEdit(tache.id)} // Sauvegarder en sortant du focus
        autoFocus
      />
    ) : (
      <span className='mx-2'>{tache.texte} </span>
    )} 
    <span className='mx-2'><button type='button' className=' text-sm hover:text-red-600 max-w-md space-y-1 text-red-400 list-disc list-inside' onClick={() => delText(tache.id)}> Supprimer la tâche</button></span>
    <span><button type='button' className='mx-2 text-sm max-w-md space-y-1 text-green-400 hover:text-green-600 list-disc list-inside' onClick={() => toggleTermine(tache.id)}>Terminer</button></span>
    <span><button className='mx-2 text-sm max-w-md space-y-1 text-yellow-400 hover:text-yellow-600 list-disc list-inside' onClick={() => startEdit(tache.id, tache.texte)}>Modifier</button></span>
  </li>)

  function addText(e) {
    e.preventDefault();
    if (newtask.trim() !== '') {
      const newtache = {
        id: Date.now(),
        texte: newtask,
        terminé: false
      };
      setTask([...task, newtache]);
      setNewtask('')
    }
  }
  function delText(id) {
    const gardetache = task.filter(tache => tache.id != id)
    setTask(gardetache)
  }
  function toggleTermine(id) {
    const termine = task.map(
      (fini) => {
        if (fini.id === id) {
          return { ...fini, terminé: !fini.terminé };
        }
        return fini
      }
    );
    setTask(termine);
  }
  function startEdit(id, texte) {
    setEditingId(id);
    setEditingText(texte);
  }
  function saveEdit(id) {
    const updatedTasks = task.map(t =>
      t.id === id ? { ...t, texte: editingText } : t
    );
    setTask(updatedTasks);
    setEditingId(null);
    setEditingText('');
  }

  return (
    <>
      <form className='max-w-sm mx-auto' onSubmit={addText}>
        <div className='mb-5'>
          <label htmlFor='tache' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Entrez votre tâche : </label>
          <input id='tache' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' type="text" value={newtask} onChange={(e) => setNewtask(e.target.value)} placeholder='Ajouter une tâche...' />
        </div>
        <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' type='submit'>Ajouter</button>
      </form>
      <ul className='max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400'>{taches}</ul>
    </>
  )
}
