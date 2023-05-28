import { useEffect } from "react";
import style from './forgot-password.module.css'
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../../services/actions/reset-password';
import { useForm } from '../../hooks/useForm';

function ForgotPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { values, handleChange } = useForm({ email: '' })
  const { verification, err, emailRequest } = useSelector(state => state.password)

  const reqestNewPassword = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(values));
  }

  useEffect(() => {
    if (verification) {
      navigate('/reset-password')
    }
  }, [verification]);

  return (
    <section className={`${style.forgotPassword__container}`}>
      <div className={`${style.forgotPassword__wrapper}`}>
        <h2 className={"text text_type_main-medium"}>Восстановление пароля</h2>
        <form className={`${style.forgotPassword__form}`} onSubmit={reqestNewPassword}>
          <Input
            placeholder={"Укажите e-mail"}
            type={"email"}
            name={'email'}
            extraClass={"mt-6"}
            onChange={handleChange}
            value={values.email}
            required
          />
          {err.err === 500 && (<h3 className={`${style.err}`}>Такой почты нет, убедитесь в правильности ввода</h3>)}
          <Button
            extraClass={"mt-6 mb-20"}
            type={"primary"}
            htmlType={'submit'}>
            {emailRequest ? <p className={`text text_type_main-small ${style.forgotPassword__loading}`}>Отправляем...</p> : 'Восстановить'}
          </Button>
        </form>

        <div className={`${style.login__links}`}>
          <p className={"text text_type_main-default text_color_inactive mb-4"}>
            Вспомнили пароль?&#8194;
            <Link to={"/login"} className={`${style.forgotPassword__link} text text_color_accent`}>Войти</Link>
          </p>
        </div>
      </div>
    </section >
  )
}

export default ForgotPassword