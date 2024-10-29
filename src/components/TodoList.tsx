import React, { useState } from 'react';
import styled from "styled-components";
import NewTaskForm from "./NewTaskForm";
import TaskList from "./TaskList";

interface ButtonProps {
    primary?: boolean;
}

const Button = styled.button<ButtonProps>`
  background-color: lightpink;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  &:hover {
    opacity: 0.8;
    
  }
`;


interface Todo {
    id: number;
    text: string;
}

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodoText, setNewTodoText] = useState<string>('');
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<Todo | null>(null);
    const [deleteTodoId, setDeleteTodoId] = useState<number | null>(null);
    const [hoveredTodoId, setHoveredTodoId] = useState<number | null>(null);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleHoverTodo = (id:number) => {
        setHoveredTodoId(id);
    };
    const handleLeaveTodo = () => {
        setHoveredTodoId(null);
    };

    const handleInputChange = (event:any) => {
        setNewTodoText(event.target.value);
    };

    const addTodo = () => {
        if (newTodoText.includes('!')) {
            alert('Ошибка: введенный текст не может содержать символ "!".');
            return;
        }

        setTodos([...todos, { id: Date.now(), text: newTodoText }]);
        setNewTodoText('');
        setDrawerOpen(false);
    };

    const openDrawer = () => {
        setDrawerOpen(true);
    };

    const closeDrawer = () => {
        setDrawerOpen(false);
    };

    const handleEditTodo = (todo:any) => {
        setEditTodo(todo);
    };

    const handleSaveEdit = () => {
        setTodos(
            todos.map((t) => (t.id === editTodo?.id ? { ...t, text: editTodo.text } : t))
        );
        setEditTodo(null);
    };

    const handleDeleteTodo = (id:number) => {
        setDeleteTodoId(id);
    };

    const confirmDelete = () => {
        setTodos(todos.filter((todo) => todo.id !== deleteTodoId));
        setDeleteTodoId(null);
    };

    const handleCancelDelete = () => {
        setDeleteTodoId(null);
    };

    return (
        <div>
            <h1 style={{ color: 'grey' }}>Список задач</h1>
            <Button
                onClick={()=>setDrawerOpen(true)}

            >
                Добавить задачу
            </Button>
            <NewTaskForm handleInputChange={handleInputChange}
                         newTodoText={newTodoText}
                         setNewTodoText={setNewTodoText}
                         addTodo={addTodo}
                         drawerOpen={drawerOpen}
                         setDrawerOpen={setDrawerOpen}
                         onClose={()=> setDrawerOpen(false)}
                         open={drawerOpen}
                         />
            <TaskList todos={todos}
                      setTodos={setTodos}
                      handleHoverTodo={handleHoverTodo}
                      handleLeaveTodo={handleLeaveTodo}
                      hoveredTodoId={hoveredTodoId}
                      handleEditTodo={handleEditTodo}
                      handleDeleteTodo={handleDeleteTodo}
                      deleteTodo={handleDeleteTodo}
                      editTodo={handleEditTodo}
            />
        </div>
    );
}

export default TodoList;