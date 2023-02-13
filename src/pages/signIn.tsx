import React, { useEffect } from 'react';
import fetcher from '../utils/fetcher';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from '../components/Input';
import Button from '../components/Button';
import token from '../utils/token';
import { Link, useNavigate } from 'react-router-dom';
import withNotLoggedIn from '../utils/withNotLoggedIn';
import { Container, ErrorMessage, Form, InputWrapper } from './signup';

type FormValues = {
  email: string;
  password: string;
};

function SignIn() {
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
    mode: 'onChange',
  });

  const onSubmit = (data: FormValues) => {
    fetcher({
      method: 'POST',
      path: '/auth/signin',
      body: data,
    }).then((res) => {
      if (res.access_token) {
        token.save(res.access_token);
        navigate('/todos');
        reset();
      } else {
        setError('email', {
          message: '아이디 또는 비밀번호가 일치하지 않아요:(',
        });
        setError('password', {});
        setFocus('email');
      }
    });
  };

  useEffect(() => {
    setFocus('email');
  }, []);

  return (
    <Container>
      <div className="header">
        <h1>로그인</h1>
        <p>
          <Link to="/signup">회원가입</Link>으로 이동하기
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputWrapper>
          <span>Email</span>
          <Input id={'email-input'} control={control} name={'email'} />
        </InputWrapper>
        <InputWrapper>
          <span>Password</span>
          <Input
            id={'password-input'}
            control={control}
            name={'password'}
            type="password"
          />
        </InputWrapper>
        <Button id={'signup-button'} component={'로그인'} disabled={!isValid} />
        <ErrorMessage>{errors.email?.message}</ErrorMessage>
      </form>
    </Container>
  );
}

export default withNotLoggedIn(SignIn);
