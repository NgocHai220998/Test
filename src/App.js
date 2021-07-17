import React, { useState } from "react";
import { useNotesStore } from "./context/NotesContext";
import { useObserver } from "mobx-react";
import { AddForm } from "./components/AddForm/AddForm";
import { NoteItem } from "./components/NoteItem/NoteItem";
import { Input } from 'antd';

function App() {
  const notesStore = useNotesStore();
  const [textSearch, setTextSearch] = useState('');
  const [notesSearch, setNotesSearch] = useState([]);

  const addNew = (values) => {
    notesStore.addNote(values.name);
  }

  const onNoteToggle = (values) => {
    notesStore.onNoteToggle(values.id);
  }

  const onNoteRemoval = (values) => {
    notesStore.removeNote(values.id);
  }

  const onEditNote = (id, name) => {
    notesStore.editNote(id, name);
  }

  function removeAccents(str) {
    var AccentsMap = [
      "aàảãáạăằẳẵắặâầẩẫấậ",
      "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
      "dđ", "DĐ",
      "eèẻẽéẹêềểễếệ",
      "EÈẺẼÉẸÊỀỂỄẾỆ",
      "iìỉĩíị",
      "IÌỈĨÍỊ",
      "oòỏõóọôồổỗốộơờởỡớợ",
      "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
      "uùủũúụưừửữứự",
      "UÙỦŨÚỤƯỪỬỮỨỰ",
      "yỳỷỹýỵ",
      "YỲỶỸÝỴ"    
    ];
    for (var i=0; i<AccentsMap.length; i++) {
      var re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
      var char = AccentsMap[i][0];
      str = str.replace(re, char);
    }
    return str;
  }

  const onSearch = (value) => {
    setNotesSearch(() => {
      return notesStore.notes.filter((note) => removeAccents(note.name).toUpperCase().includes(removeAccents(value).toUpperCase()))
    })
  }

  return useObserver(() => (
    <div className="container">
      <AddForm onFormSubmit={addNew} />
      <Input.Search
        placeholder="input search text"
        onSearch={onSearch}
        style={{ width: 200 }}
        value={textSearch}
        onChange={(e) => {
          setTextSearch(e.target.value);
          onSearch(e.target.value);
        }}
      />
      <div>
        {
          textSearch ? (
            notesSearch && notesSearch.map((note) => {
              return <div key={note.id}>
                <NoteItem onEditNote={onEditNote} onNoteRemoval={onNoteRemoval} onNoteToggle={onNoteToggle} note={note} />
              </div>
            })
          ) : (
            notesStore.notes.map((note) => {
              return <div key={note.id}>
                <NoteItem onEditNote={onEditNote} onNoteRemoval={onNoteRemoval} onNoteToggle={onNoteToggle} note={note} />
              </div>
            })
          )
        }
      </div>
    </div>
  ));
}

export default App;
