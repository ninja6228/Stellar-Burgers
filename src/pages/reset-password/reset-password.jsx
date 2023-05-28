import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './reset-password.module.css'
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from 'react-router-dom';
import { resetPassword } from '../../services/actions/reset-password';
import { useForm } from '../../hooks/useForm';

function ResetPassword() {
  const dispatch = useDispatch();
  const { verification } = useSelector(state => state.password);
  const navigate = useNavigate();
  const { values, handleChange} = useForm({ token: "", password: "" })

  const setNewPassword = (e) => {
    e.preventDefault();
    dispatch(resetPassword(values));
    navigate('/login')
  }

  useEffect(() => {
    if (!verification) {
      navigate('/forgot-Password')
    }
  }, [verification]);

  return (
    <section className={`${style.resetPassword__container}`}>
      <div className={`${style.resetPassword__wrapper}`}>
        <h2 className={"text text_type_main-medium"}>Восстановление пароля</h2>
        <form className={`${style.resetPassword__form}`} onSubmit={setNewPassword}>
          <PasswordInput
            extraClass={"mt-6"}
            placeholder={"Введите новый пароль"}
            value={values.password}
            name={'password'}
            onChange={handleChange}
            required
          />
          <Input
            extraClass={"mt-6"}
            placeholder={"Введите код из письма"}
            value={values.token}
            name={'token'}
            onChange={handleChange}
            required
          />
          <Button
            extraClass={"mt-6 mb-20"}
            type={"primary"}
            htmlType={'submit'}
            size={"medium"}>
            Сохранить
          </Button>
        </form>
        <div className={`${style.login__links}`}>
          <p className={"text text_type_main-default text_color_inactive mb-4"}>
            Вспомнили пароль?&#8194;
            <Link to={"/login"} className={`${style.resetPassword__link} text text_color_accent`}>Войти</Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default ResetPassword