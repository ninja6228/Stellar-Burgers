import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import style from './profile.module.css';
import { Input, Button, PasswordInput, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { logout, updateUser } from '../../services/actions/user';

function Profile() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.form);
  const [actionButtons, setActionButtons] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ""
  })

  useEffect(() => {
    setFormData({
      ...formData,
      email: user.email,
      name: user.name
    })
  }, [user])

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setActionButtons(true);
  }

  const onSubmitForm = (e) => {
    e.preventDefault();
    dispatch(updateUser(formData));
    setActionButtons(false);
  }

  const handleCancel = (e) => {
    e.preventDefault();
    setFormData({
      email: user.email,
      name: user.name,
      password: ""
    })
    setActionButtons(false);
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div className={`${style.profile__container}`}>
      <section className={`${style.profile__wrapper} mr-15`}>
        <nav className={`${style.profile__nav} mb-20`}>
          <NavLink to={'/profile'}
            className={`text text_type_main-medium ${style.profile__link} ${style.profile__link_active}`}>
            Профиль
          </NavLink>
          <NavLink to={'/profile/orders'}
            className={`${style.profile__link} text text_type_main-medium`}>
            История заказов
          </NavLink>
          <p onClick={handleLogout} className={`${style.profile__link} text text_type_main-medium`}>выход</p>
        </nav>
        <p className={`text text_type_main-default ${style.profile__text}`}>
          В этом разделе вы можете &#8194;изменить свои персональные данные
        </p>
      </section>
      <form onSubmit={onSubmitForm} className={`text text_type_main-default ${style.profile__form}`}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={onChange}
          value={formData.name}
          name={"name"}
          icon={'EditIcon'}
          required
        />
        <EmailInput
          placeholder={'Логин'}
          onChange={onChange}
          value={formData.email}
          name={'email'}
          errorText={'Введите E-mail и не забудьте @'}
          icon={"EditIcon"}
          required
        />
        <PasswordInput
          placeholder={"Пароль"}
          name={"password"}
          value={formData.password}
          icon="EditIcon"
          onChange={onChange}
        />
        {actionButtons && (
          <div className={style.profile__buttons}>
            <Button htmlType={'button'} onClick={handleCancel} type={"secondary"} size={"medium"}>Отменить</Button>
            <Button htmlType={'submit'} type={"primary"} size={"medium"}>Сохранить</Button>
          </div>
        )}
      </form>
    </div>
  )
}

export default Profile