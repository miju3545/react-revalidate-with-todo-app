import React, { FormEvent } from 'react';
import withLoggedIn from '../utils/withLoggedIn';
import TodoItem from '../components/TodoItem';
import useTodos from '../hooks/useTodos';
import useInput from '../hooks/useInput';
import Button from '../components/Button';

const handleSubmit = (cb: any) => {
  return (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    cb();
  };
};

function TodoList() {
  const { loading, todos, revalidate, createTodo, updateTodo, deleteTodo } =
    useTodos();
  const [newTodo, onChangeNewTodo, clearNewTodo] = useInput('');

  const handleCreate = handleSubmit(() => {
    if (!newTodo) return;
    createTodo({ todo: newTodo }).then(() => {
      revalidate();
      clearNewTodo();
    });
  });

  const handleDelete = (id: number) => {
    if (!id) return;
    deleteTodo(id).then(() => {
      revalidate();
    });
  };

  const handleUpdate = (
    id: number,
    body: { isCompleted: boolean; todo: string }
  ) => {
    if (!body.todo) return;
    updateTodo(id, body).then(() => {
      revalidate();
    });
  };

  if (loading) return <div>로딩중...</div>;

  return (
    <div>
      <div>
        <form onSubmit={handleCreate}>
          <input
            data-testid="new-todo-input"
            value={newTodo}
            onChange={onChangeNewTodo}
          />
          <Button id="new-todo-add-button" title="추가" />
        </form>
      </div>
      <ul>
        {todos.map((item) => (
          <TodoItem
            key={item.id}
            {...item}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </ul>
    </div>
  );
}

export default withLoggedIn(TodoList);
