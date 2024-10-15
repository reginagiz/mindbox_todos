import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodosList from './TodosList';

describe('TodosList', () => {
    test('allows users to add tasks', () => {
        render(<TodosList />);
        const input = screen.getByPlaceholderText('What is your main goal for today?');
        const addButton = screen.getByText('Add Task');

        fireEvent.change(input, { target: { value: 'Buy groceries' } });
        fireEvent.click(addButton);

        expect(screen.getByText('Buy groceries')).toBeInTheDocument();
    });

    test('allows users to toggle task completion', () => {
        render(<TodosList />);
        const input = screen.getByPlaceholderText('What is your main goal for today?');
        const addButton = screen.getByText('Add Task');

        fireEvent.change(input, { target: { value: 'Learn React' } });
        fireEvent.click(addButton);

        const checkbox = screen.getByLabelText('');
        fireEvent.click(checkbox);

        expect(screen.getByText('Learn React')).toHaveStyle('text-decoration: line-through');
    });

    test('allows users to delete a task', () => {
        render(<TodosList />);
        const input = screen.getByPlaceholderText('What is your main goal for today?');
        const addButton = screen.getByText('Add Task');

        fireEvent.change(input, { target: { value: 'Go for a walk' } });
        fireEvent.click(addButton);

        const deleteButton = screen.getByRole('button', { name: '' });
        fireEvent.click(deleteButton);

        expect(screen.queryByText('Go for a walk')).not.toBeInTheDocument();
    });

    test('filters tasks correctly', () => {
        render(<TodosList />);
        const input = screen.getByPlaceholderText('What is your main goal for today?');
        const addButton = screen.getByText('Add Task');

        // Add a completed task
        fireEvent.change(input, { target: { value: 'Task 1' } });
        fireEvent.click(addButton);
        const checkbox1 = screen.getByLabelText('');
        fireEvent.click(checkbox1);  // Complete it

        fireEvent.change(input, { target: { value: 'Task 2' } });
        fireEvent.click(addButton);

        const incompleteButton = screen.getByText('Incomplete');
        fireEvent.click(incompleteButton);
        expect(screen.queryByText('Task 1')).not.toBeInTheDocument();
        expect(screen.getByText('Task 2')).toBeInTheDocument();

        const completedButton = screen.getByText('Completed');
        fireEvent.click(completedButton);
        expect(screen.getByText('Task 1')).toBeInTheDocument();
        expect(screen.queryByText('Task 2')).not.toBeInTheDocument();
    });
});
