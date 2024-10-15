import React, { useState } from 'react';

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

const TodoApp: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState<string>("");
    const [filter, setFilter] = useState<'all' | 'completed' | 'incomplete'>('all');

    const addTodo = (text: string) => {
        const newTask: Todo = {
            id: Date.now(),
            text: text,
            completed: false,
        };
        setTodos([...todos, newTask]);
        setNewTodo("");
    };

    const toggleTodo = (id: number) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const deleteTodo = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const filteredTodos = todos.filter((todo) => {
        if (filter === 'completed') return todo.completed;
        if (filter === 'incomplete') return !todo.completed;
        return true;
    });

    return (
        <div className="todos_container">
            <h1>ToDos</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (newTodo.trim()) addTodo(newTodo);
                }}
            >
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="What is your main goal for today?"
                />
                <button type="submit">Add Task</button>
            </form>

            <ul className="todos_list">
                {filteredTodos.map((todo) => (
                    <li key={todo.id} className="todo_item">
                        <div className="todo_container">
                            <label className="checkbox-wrapper">
                                <input
                                    type="checkbox"
                                    id={`checkbox-${todo.id}`}
                                    className="checkbox-input"
                                    checked={todo.completed}
                                    onChange={() => toggleTodo(todo.id)}
                                />
                                <span className="checkbox-label"></span>
                            </label>
                            <p style={{textDecoration: todo.completed ? 'line-through' : 'none'}}>{todo.text}</p>
                        </div>
                        <button className="delete_button" onClick={() => deleteTodo(todo.id)}/>
                    </li>
                ))}
            </ul>

            <div className="filter_buttons">
                <button onClick={() => setFilter('all')}>
                    All
                </button>
                <button onClick={() => setFilter('incomplete')}>
                    Incomplete
                </button>
                <button onClick={() => setFilter('completed')}>
                    Completed
                </button>
            </div>
        </div>
    );
};

export default TodoApp;
