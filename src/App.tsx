import React, { useState } from 'react';
import styled from 'styled-components';
import NewTaskForm from './components/NewTaskForm';
import TaskList from './components/TaskList';
import { Todo } from './types';

const Container = styled.div`
  padding: 20px;
  
`;

const Header = styled.header`
  color: grey;
  font-weight: bold;
  font-size: 20px;
`

const Button=styled.button`
  background-color: lightpink;
  border: 1px solid lightpink;
  border-radius: 5px;
  padding: 10px;
  color: white;
  font-weight: bold;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  &:hover{
    border: 1px solid lightcoral;
   
  }
`

const App: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const [newTodoText, setNewTodoText] = useState('');
    const [hoveredTodoId, setHoveredTodoId] = useState<number | null>(null);

    const [deleteTodoId, setDeleteTodoId] = useState<number | null>(null);
    const [editodo, setEditTodo] = useState<Todo | null>(null);
    const handleDeleteTodo = (id:number) => {
        setDeleteTodoId(id);
    };
    const handleEditTodo = (todo:any) => {
        setEditTodo(todo);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTodoText(event.target.value);}
    const handleHoverTodo = (id: number) => {
        setHoveredTodoId(id);
    };
    const handleLeaveTodo = () => {
        setHoveredTodoId(null);
    };


    const addTodo = (text: string) => {
        setTodos([...todos, { id: Date.now(), text }]);
        setDrawerOpen(false);
    };

    const editTodo = (id: number, newText: string) => {
        setTodos(todos.map(todo => (todo.id === id ? { ...todo, text: newText } : todo)));
    };

    const deleteTodo = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    return (
        <Container>
            <Header>List</Header>
            <Button onClick={() => setDrawerOpen(true)}>Добавить задачу</Button>
            <NewTaskForm open={drawerOpen}
                         onClose={() => setDrawerOpen(false)}
                         addTodo={addTodo}
                         handleInputChange={handleInputChange}
                         setDrawerOpen={setDrawerOpen}
                         setNewTodoText={setNewTodoText}
                        newTodoText={newTodoText}
                         drawerOpen={drawerOpen}
            />
            <TaskList todos={todos}
                      editTodo={editTodo}
                      deleteTodo={deleteTodo}
                      setTodos={setTodos}
                      handleHoverTodo={handleHoverTodo}
                      handleDeleteTodo={handleDeleteTodo}
                      handleEditTodo={handleEditTodo}
                      handleLeaveTodo={handleLeaveTodo}
                      hoveredTodoId={hoveredTodoId}
                      />
        </Container>
    );
}


export default App;
