import React, { FormEvent } from 'react';
import withLoggedIn from '../utils/withLoggedIn';
import TodoItem from '../components/TodoItem';
import {
  useGetTodos,
  useCreateTodo,
  useUpdateTodo,
  useDeleteTodo,
} from '../hooks/useTodos';
import useInput from '../hooks/useInput';
import Button from '../components/Button';

const handleSubmit = (cb: any) => {
  return (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    cb();
  };
};

function TodoList() {
  const { data: todos, revalidate } = useGetTodos();
  const createTodo = useCreateTodo();
  const updateTodo = useUpdateTodo();
  const deleteTodo = useDeleteTodo();
  const [newTodo, onChangeNewTodo, clearNewTodo] = useInput('');

  const handleCreate = handleSubmit(() => {
    createTodo({ todo: newTodo }).then(() => {
      revalidate();
      clearNewTodo();
    });
  });

  const handleDelete = (id: number) => {
    console.log('삭제되었습니다.');

    deleteTodo(id).then(() => {
      revalidate();
    });
  };

  const handleUpdate = (
    id: number,
    body: { isCompleted: boolean; todo: string }
  ) => {
    updateTodo(id, body).then((res) => {
      console.log(res);
      revalidate();
    });
  };

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
