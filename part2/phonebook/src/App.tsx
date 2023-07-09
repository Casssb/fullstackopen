import { useState } from 'react'

interface Person {
  name: string
  number: number | null
}

const App = () => {
  const [persons, setPersons] = useState<Person[]>([
    { name: 'Arto Hellas', number: 999923424 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState<number|null>(undefined)
  const [error, setError] = useState('')

  const addPerson = (e) => {
    e.preventDefault()
    setError('')
    if(!newName.length) {
      setError('Please enter a name')
      return
    }
    if(persons.some(person => person.name === newName)) {
      setError(`${newName} is already in the phonebook`)
      alert(`${newName} is already in the phonebook`)
      return
    }
    setPersons([...persons, {name: newName, number: newNumber}])
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={(e) => setNewName(e.target.value)} required/>
        </div>
        <div>
          number: <input type="number" value={newNumber} onChange={(e) => setNewNumber(Number(e.target.value))} required/>
        </div>
        <div>
          <button type="submit" onClick={(e) => addPerson(e)}>add</button>
        </div>
      </form>
      {persons.map(person => (
        <div key={person.name}>
          <h4>{person.name} {person.number}</h4>
        </div>
      ))}
      {error && (
        <p>{error}</p>
      )}
    </div>
  )
}

export default App