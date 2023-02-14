import { useState, useEffect, useReducer, useMemo, useCallback } from 'react';
import fetcher from '../utils/fetcher';
import { Todo } from '../utils/types';

export default function useTodos(): {
  loading: boolean;
  todos: Todo[];
  error: unknown;
  revalidate: React.DispatchWithoutAction;
  updateTodo: (
    id: number,
    body: {
      todo: string;
      isCompleted: boolean;
    }
  ) => Promise<unknown>;
  createTodo: (body: { todo: string }) => Promise<unknown>;
  deleteTodo: (id: number) => Promise<unknown>;
} {
  const [_data, setData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const todos = useMemo(() => _data, [_data]);
  const [rerender, forceRender] = useReducer((p) => !p, false);

  useEffect(() => {
    fetcher({ method: 'GET', path: '/todos', authNeeded: true })
      .then(setData)
      .then(() => setLoading(false))
      .catch(setError);
  }, [rerender]);

  const createTodo = useCallback((body: { todo: string }) => {
    return fetcher({ method: 'POST', path: '/todos', body, authNeeded: true });
  }, []);

  const updateTodo = useCallback(
    (id: string | number, body: { todo: string; isCompleted: boolean }) => {
      return fetcher({
        method: 'PUT',
        path: `/todos/${id}`,
        body,
        authNeeded: true,
      });
    },
    []
  );

  const deleteTodo = useCallback((id: number) => {
    return fetcher({
      method: 'DELETE',
      path: `/todos/${id}`,
      authNeeded: true,
    });
  }, []);

  return {
    loading,
    todos,
    error,
    revalidate: forceRender,
    updateTodo,
    createTodo,
    deleteTodo,
  };
}
