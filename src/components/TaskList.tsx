import React, {useState} from 'react';
import styled from 'styled-components';
import { Todo } from '../types';

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
 align-items: baseline;
  padding: 10px;
`;

const ConfirmationModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  z-index: 10;
`;

const Button=styled.button`
  width: 40px;
  border: none;
  background-color: rgba(255, 255, 255, 0);
  display:none;
`;
const TaskContainer=styled.div`
  display: flex;
  flex-direction: column;
  &:hover ${Button}{
    display: block;
  }
`;


interface TaskListProps {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    editTodo: (id: number, newText: string) => void;
    deleteTodo: (id: number) => void;
    handleHoverTodo: (id: number) => void;
    handleLeaveTodo: () => void;
    hoveredTodoId: number | null;
    handleEditTodo: (todo: Todo) => void;
    handleDeleteTodo: (id: number) => void;


}

const TaskList: React.FC<TaskListProps> = ({ todos, editTodo, deleteTodo }) => {
    const [showModal, setShowModal] = useState(false);
    const [todoToDelete, setTodoToDelete] = useState<Todo | null>(null);

    const handleEdit = (todo: Todo) => {
        const newText = prompt('Редактировать задачу', todo.text);
        if (newText) {
            editTodo(todo.id, newText);
        }
    };


    const handleDeleteConfirm = (todo: Todo) => {
        setShowModal(true);
        setTodoToDelete(todo);
    };

    const handleDelete = () => {
        if (todoToDelete) {
            deleteTodo(todoToDelete.id);
            setShowModal(false);
            setTodoToDelete(null);
        }
    };

    const handleCancelDelete = () => {
        setShowModal(false);
        setTodoToDelete(null);
    };

    return (
        <ul>
            {todos.map(todo => (
                <ListItem key={todo.id}>
                    <TaskContainer>
                    <span>{todo.text}</span>
                    <Button onClick={() => handleEdit(todo)}>✏️</Button>
                    </TaskContainer>

                        <button onClick={()=> handleDeleteConfirm(todo)}>🗑️</button>

                </ListItem>
            ))}
            {showModal && (
                <ConfirmationModal>
                    <p>Вы действительно хотите удалить задачу: "{todoToDelete?.text}"?</p>
                    <button onClick={handleDelete}>Удалить</button>
                    <button onClick={handleCancelDelete}>Отмена</button>
                </ConfirmationModal>
            )}

        </ul>
    );
};

export default TaskList;