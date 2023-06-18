import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import style from './profile-info.module.css';
import { Input, Button, PasswordInput, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { updateUser } from '../../services/actions/user';
import { useForm } from '../../hooks/useForm';



function ProfileInfo() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.form);
  const [actionButtons, setActionButtons] = useState(false);
  const { values, handleChange, setValues } = useForm({ name: '', email: '', password: '' })


  useEffect(() => {
    setValues({
      ...values,
      email: user.email,
      name: user.name
    })
  }, [user])

  const onChange = (evt) => {
    handleChange(evt)
    setActionButtons(true);
  }

  const onSubmitForm = (evt) => {
    evt.preventDefault();
    dispatch(updateUser(values));
    setActionButtons(false);
  }

  const handleCancel = (evt) => {
    evt.preventDefault();
    setValues({
      email: user.email,
      name: user.name,
      password: ""
    })
    setActionButtons(false);
  }

  return (
    <>
      <form onSubmit={onSubmitForm} className={`text text_type_main-default ${style.profile__form}`}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={onChange}
          value={values.name}
          name={"name"}
          icon={'EditIcon'}
          required
        />
        <EmailInput
          placeholder={'Логин'}
          onChange={onChange}
          value={values.email}
          name={'email'}
          errorText={'Введите E-mail и не забудьте @'}
          icon={"EditIcon"}
          required
        />
        <PasswordInput
          placeholder={"Пароль"}
          name={"password"}
          value={values.password}
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
    </>
  )
}

export default ProfileInfo