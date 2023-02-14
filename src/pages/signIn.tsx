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
import { Container, ErrorMessage, InputWrapper } from './signup';
import useAuth from '../hooks/useAuth';

type FormValues = {
  email: string;
  password: string;
};

function SignIn() {
  const navigate = useNavigate();
  const schema = yup.object({
    email: yup
      .string()
      .matches(/[a-z0-9]+@/)
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

  const { signin } = useAuth();

  const onSubmit = (data: FormValues) => {
    signin(data).then((res) => {
      if (res.statusCode === 404) {
        setError('password', {});
        setError('email', { message: '가입되지 않은 이메일입니다:(' });
      } else if (res.statusCode === 401) {
        setError('password', {});
        setError('email', {
          message: '아이디 또는 비밀번호가 일치하지 않아요:(',
        });
      } else {
        token.save(res.access_token);
        navigate('/todo');
        reset();
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
          <span className="label">이메일</span>
          <Input id={'email-input'} control={control} name={'email'} />
        </InputWrapper>
        <InputWrapper>
          <span className="label">패스워드</span>
          <Input
            id={'password-input'}
            control={control}
            name={'password'}
            type="password"
          />
        </InputWrapper>
        <Button
          id={'signin-button'}
          title={'로그인'}
          disabled={!isValid}
          style={{ padding: '10px 12px', fontSize: '14px' }}
        />

        <ErrorMessage>{errors.email?.message}</ErrorMessage>
      </form>
    </Container>
  );
}

export default withNotLoggedIn(SignIn);
