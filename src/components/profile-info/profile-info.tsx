import { useState, useEffect, ChangeEvent, FormEvent, FC } from "react";
import { Input, Button, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import style from './profile-info.module.css';
import { updateUser } from '../../services/actions/user';
import { useForm } from '../../services/hooks/useForm';
import { useSelector, useDispatch } from '../../services/hooks/hooks';

const ProfileInfo: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.form);
  const [actionButtons, setActionButtons] = useState(false);
  const { values, handleChange, setValues } = useForm({ name: '', email: '', password: '' })

  useEffect(() => {
    setValues({
      ...values,
      email: user?.email,
      name: user?.name,
    })
  }, [user])

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleChange(event)
    setActionButtons(true);
  }

  const onSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(updateUser(values));
    setActionButtons(false);
  }

  const handleCancel = () => {
    setValues({
      email: user?.email,
      name: user?.name,
      password: ""
    })
    setActionButtons(false);
  }

  const valueProfile = (values: string) => {
    if (!values) {
      return ''
    } else {
      return values
    }
  }

  return (
    <>
      <form onSubmit={onSubmitForm} className={`text text_type_main-default ${style.profile__form}`}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={onChange}
          value={valueProfile(values.name)}
          name={"name"}
          icon={'EditIcon'}
          required
        />
        <Input
          type={'email'}
          placeholder={'Логин'}
          onChange={onChange}
          value={valueProfile(values.email)}
          name={'email'}
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