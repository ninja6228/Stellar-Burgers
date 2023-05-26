import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './login.module.css';
import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from 'react-router-dom';
import { login } from '../../services/actions/user';

function Login() {
  const dispatch = useDispatch();
  const { loginRequest } = useSelector((state) => state.user)

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const onSubmitForm = (e) => {
    e.preventDefault();
    dispatch(login(formData))
  }

  return (
    <section className={`${style.login__container}`}>
      <div className={`${style.login__wrapper}`}>
        <h2 className={"text text_type_main-medium"}>Вход</h2>
        <form className={`${style.login__form}`} onSubmit={onSubmitForm}>
          <EmailInput
            placeholder={"E-mail"}
            name={"email"}
            value={formData.email}
            extraClass={"mt-6"}
            onChange={onChange}
            errorText={'Введите E-mail и не забудьте @'}
            required
          />
          <PasswordInput
            placeholder={"Пароль"}
            name={"password"}
            value={formData.password}
            extraClass={"mt-6"}
            onChange={onChange}
            required
          />
          <Button
            extraClass={"mt-6 mb-20"}
            type={"primary"}
            size={"medium"}
            htmlType={'submit'}
          >
            {loginRequest ? 'Заходим...' : 'Войти'}
          </Button>
        </form>
        <div className={`${style.login__links}`}>
          <p className={"text text_type_main-default text_color_inactive mb-4"}>
            Вы - новый  пользователь?&#8194;
            <Link to={"/register"} className={`${style.login__link} text text_color_accent`}>Зарегистрироваться</Link>
          </p>
          <p className={"text text_type_main-default text_color_inactive"}>Забыли пароль?&#8194;
            <Link to={"/forgot-password"} className={`${style.login__link} text text_color_accent`}>Восстановить пароль</Link>
          </p>
        </div>
      </div>
    </section>
  )
};

export default Login