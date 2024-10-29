import React, { useState } from 'react';
import styled from 'styled-components';
import Drawer from "../styled-components/Drawer";
//const Drawer = styled.div<{ open: boolean }>`
 // display: ${({ open }) => (open ? 'block' : 'none')};
 // background: white;
 // padding: 20px;
 // border: 1px solid #ccc;
//`;

const TextArea = styled.textarea`
  width: 80%;
  margin-bottom: 10px;
`;

const Button = styled.button<{ disabled: boolean }>`
  background-color: grey;
  width: 30%;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  &:hover{
    background-color: lightpink;
  }
`;

interface NewTaskFormProps {
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    newTodoText: string;
    setNewTodoText: React.Dispatch<React.SetStateAction<string>>;
    addTodo: (text:string) => void;
    drawerOpen: boolean;
    setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onClose: () => void;
    open: boolean;
}

const NewTaskForm: React.FC<NewTaskFormProps> = ({ open, onClose, addTodo }) => {
    const [text, setText] = useState('');

    const handleAdd = () => {
        if (text.includes('!')) {
            alert('Ошибка: текст не должен содержать символ "!"');
            return;
        }
        addTodo(text);
        setText('');
    };

    return (

        <Drawer isOpen={open} onClose={onClose}>
            <h2>Toolbar</h2>

            <TextArea value={text} onChange={(e) => setText(e.target.value)} placeholder="Текст задачи" />
            <Button disabled={!text} onClick={handleAdd}>Добавить задачу</Button>


</Drawer>
    );
};

export default NewTaskForm;