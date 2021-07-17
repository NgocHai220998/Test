import { nanoid } from 'nanoid'

const defaultValues = () => {
  return JSON.parse(localStorage.getItem('notes')) || []
}

const setLocal = (notes) => {
  localStorage.setItem('notes', JSON.stringify(notes))
}


export function createNotesStore() {
  return {
    notes: defaultValues(),
    addNote(name) {
      this.notes.push({
        name,
        id: nanoid(),
        completed: false
      })

      setLocal(this.notes);
    },
    removeNote(id) {
      this.notes = this.notes.filter(note => note.id !== id)
      setLocal(this.notes);
    },
    onNoteToggle(id) {
      this.notes = this.notes.map(note => {
        if (note.id === id) {
          note.completed = !note.completed;
        }

        return note;
      })
      setLocal(this.notes);
    },
    editNote(id, name) {
      this.notes = this.notes.map(note => {
        if (note.id === id) {
          note.name = name;
        }

        return note;
      })
      setLocal(this.notes);
    }
  }
}