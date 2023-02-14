import { useState, useEffect, useReducer, useMemo } from 'react';
import fetcher from '../utils/fetcher';
import { Todo } from '../utils/types';

export function useGetTodos(): {
  loading: boolean;
  data: Todo[];
  error: unknown;
  revalidate: React.DispatchWithoutAction;
} {
  const [_data, setData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const data = useMemo(() => _data, [_data]);
  const [rerender, forceRender] = useReducer((p) => !p, false);

  useEffect(() => {
    fetcher({ method: 'GET', path: '/todos', authNeeded: true })
      .then(setData)
      .then(() => setLoading(false))
      .catch(setError);
  }, [rerender]);

  return { loading, data, error, revalidate: forceRender };
}

export function useCreateTodo() {
  const mutate = (body: { todo: string }) => {
    return fetcher({ method: 'POST', path: '/todos', body, authNeeded: true });
  };

  return mutate;
}

export function useUpdateTodo() {
  const mutate = (
    id: string | number,
    body: { todo: string; isCompleted: boolean }
  ) => {
    return fetcher({
      method: 'PUT',
      path: `/todos/${id}`,
      body,
      authNeeded: true,
    });
  };

  return mutate;
}

export function useDeleteTodo() {
  const mutate = (id: string | number) => {
    return fetcher({
      method: 'DELETE',
      path: `/todos/${id}`,
      authNeeded: true,
    });
  };

  return mutate;
}
