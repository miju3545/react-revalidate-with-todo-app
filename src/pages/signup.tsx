import React, { useEffect } from 'react';
import fetcher from '../utils/fetcher';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from '../components/Input';
import Button from '../components/Button';
import { useNavigate, Link } from 'react-router-dom';
import withNotLoggedIn from '../utils/withNotLoggedIn';
import styled from '@emotion/styled';

type FormValues = {
  email: string;
  password: string;
};

function SignUp() {
  const navigate = useNavigate();
  const schema = yup.object({
    email: yup
      .string()
      .matches(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/)
      .required('email is required'),
    password: yup
      .string()
      .matches(/[A-Za-z0-9._%+-]{8,}/)
      .required('password is required'),
  });
  const {
    control,
    handleSubmit,
    reset,
    setFocus,
    setError,
    formState: { isValid, errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = (data: FormValues) => {
    fetcher({
      method: 'POST',
      path: '/auth/signup',
      body: data,
    })
      .then((res) => {
        if (res.statusCode === 201) {
          reset();
          navigate('/signin');
        } else {
          setError('email', { message: '이미 사용중인 이메일이에요:(' });
          setError('password', {});
          setFocus('email');
          setFocus('password');
        }
      })
      .catch((error) => console.log('ERROR', error));
  };

  useEffect(() => {
    setFocus('email');
  }, []);

  return (
    <Container>
      <div className="header">
        <h1>회원가입</h1>
        <p>
          <Link to="/signin">로그인</Link>으로 이동하기
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputWrapper>
          <span>Email</span>
          <Input
            id={'email-input'}
            control={control}
            name={'email'}
            placeholder="email"
          />
        </InputWrapper>
        <InputWrapper>
          <span>Password</span>
          <Input
            id={'password-input'}
            control={control}
            name={'password'}
            type="password"
            placeholder="password"
          />
        </InputWrapper>
        <Button
          id={'signup-button'}
          component={'가입하기'}
          disabled={!isValid}
        />
        <ErrorMessage>{errors.email?.message}</ErrorMessage>
      </form>
    </Container>
  );
}

export default withNotLoggedIn(SignUp);

export const Container = styled.div`
  max-width: 300px;
  margin: auto;

  > .header {
    margin-top: 50px;
    margin-bottom: 20px;

    > h1 {
    }

    > p {
      margin-top: 10px;
      font-size: 13px;
    }
  }

  > form {
    display: flex;
    flex-direction: column;
  }
`;

export const InputWrapper = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  > span {
    margin-bottom: 2px;
  }

  > input {
    padding: 10px 12px;
    font-size: 15px;
    border: 1px solid gray;
  }
`;

export const ErrorMessage = styled.p`
  margin-top: 10px;
  font-size: 13px;
  color: red;
`;
