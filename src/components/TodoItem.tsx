import React, { useReducer, memo, KeyboardEvent, ChangeEvent } from 'react';
import { Todo } from '../utils/types';
import Button from './Button';
import styled from '@emotion/styled';
import useInputAysnc from '../hooks/useInputAsync';

type TodoProps = Todo & {
  onUpdate: (id: number, body: { isCompleted: boolean; todo: string }) => void;
  onDelete: (id: number) => void;
};

function TodoItem({ id, todo, isCompleted, onUpdate, onDelete }: TodoProps) {
  const [completed, toggleCompleted] = useInputAysnc(isCompleted);
  const [edit, editing, reset] = useInputAysnc(todo);
  const [showEditForm, toggleShowEditForm] = useReducer((p) => !p, false);
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleUpdate();
    }
  };

  const handleUpdate = () => {
    onUpdate(id, {
      isCompleted: completed,
      todo: edit,
    });
    toggleShowEditForm();
  };

  const handleUpdateCompleted = (e: ChangeEvent<HTMLInputElement>) => {
    toggleCompleted(e);
    onUpdate(id, { isCompleted: e.target.checked, todo: edit });
  };

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <ItemWrapper>
      <Form>
        <Label>
          <Checkbox
            type="checkbox"
            checked={completed}
            onChange={handleUpdateCompleted}
          />
          <Text className="textbox">
            {showEditForm ? (
              <input
                value={edit}
                onChange={editing}
                onKeyDown={handleKeyDown}
                autoFocus
              />
            ) : (
              <span>{todo}</span>
            )}
          </Text>
        </Label>
        {showEditForm ? (
          <>
            <Button
              id="submit-button"
              title="제출"
              type="button"
              onClick={handleUpdate}
            />
            <Button
              id="cancel-button"
              title="취소"
              type="button"
              onClick={() => {
                toggleShowEditForm();
                reset();
              }}
            />
          </>
        ) : (
          <>
            <Button
              id="modify-button"
              title="수정"
              type="button"
              onClick={toggleShowEditForm}
            />
            <Button
              id="delete-button"
              title="삭제"
              type="button"
              onClick={handleDelete}
            />
          </>
        )}
      </Form>
    </ItemWrapper>
  );
}

export default memo(TodoItem);

const ItemWrapper = styled.li`
  list-style: none;
  padding: 10px 0;
  border-bottom: 1px solid #dfdfdf;
  border-radius: 4px;
  display: flex;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
`;
const Label = styled.label`
  display: flex;
  align-items: center;
`;
const Checkbox = styled.input`
  font-size: 14px;
  margin-right: 5px;
`;

const Text = styled.span`
  font-size: 14px;
  margin-right: 10px;
`;
