import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, PasswordInput, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './register.module.css'
import { Link } from 'react-router-dom';
import { register } from '../../services/actions/user'

function Register() {
  const dispatch = useDispatch();
  const { registerRequest } = useSelector(state => state.user);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: ""
  })

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const onSubmitForm = (evt) => {
    evt.preventDefault();
    dispatch(register(formData))
  }

  return (
    <section className={`${style.register__container}`}>
      <div className={`${style.register__wrapper}`}>
        <h2 className={"text text_type_main-medium"}>Регистрация</h2>
        <form className={`${style.register__form}`} onSubmit={onSubmitForm}>
          <Input
            placeholder={"Имя"}
            name={"name"}
            extraClass={"mt-6"}
            value={formData.name}
            onChange={onChange}
            required
          />
          <EmailInput
            placeholder={"E-mail"}
            name={"email"}
            extraClass={"mt-6"}
            value={formData.email}
            onChange={onChange}
            required
          />
          <PasswordInput
            placeholder={"Пароль"}
            name={"password"}
            extraClass={"mt-6"}
            value={formData.password}
            onChange={onChange}
            required
          />
          <Button
            extraClass={"mt-6 mb-20"}
            type={"primary"}
            htmlType={'submit'}
          >
            {registerRequest ? 'Регестрируем...' : 'Зарегестрироваться'}
          </Button>
        </form>
        <div className={`${style.login__links}`}>
          <p className={"text text_type_main-default text_color_inactive mb-4"}>
            Уже зарегестрированы?&#8194;
            <Link to={"/login"} className={`${style.register__link} text text_color_accent`}>Войти</Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Register