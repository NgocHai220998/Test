import React, { useState, useEffect } from "react";
import './NoteItem.less'
import { Tooltip, Tag, List, Button, Popconfirm, Switch, Input } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

export const NoteItem = ({
  note,
  onNoteRemoval,
  onNoteToggle,
  onEditNote,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    if (note) {
      setNewName(note.name);
    }
  }, [note])
  return (
    <List.Item
      actions={[
        <Tooltip
          title={note.completed ? 'Mark as uncompleted' : 'Mark as completed'}
        >
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            onChange={() => onNoteToggle(note)}
            defaultChecked={note.completed}
          />
        </Tooltip>,
        <Popconfirm
          title="Are you sure you want to delete?"
          onConfirm={() => {
            onNoteRemoval(note);
          }}
        >
          <Button className="remove-note-button" type="primary" danger>
            X
          </Button>
        </Popconfirm>,
      ]}
      className="list-item"
      key={note.id}
    >
      <div className="note-item">
        {
          isEdit ? (
            <div>
              <Input 
                value={newName}
                onChange={
                  (e) => {setNewName(e.target.value)
                }}
                onBlur={() => {
                  setIsEdit(false);
                  onEditNote(note.id, newName);
                }}
                onKeyPress={(event) => {
                  if(event.key === 'Enter'){
                    setIsEdit(false);
                    onEditNote(note.id, newName);
                  }
                }}
              />
            </div>
          ) : (
            <Tag 
            onDoubleClick={() => {
              setIsEdit(true);
            }}
            color={note.completed ? 'cyan' : 'red'} className="note-tag">
              {note.name}
            </Tag>
          )
        }
      </div>
    </List.Item>
  );
};
