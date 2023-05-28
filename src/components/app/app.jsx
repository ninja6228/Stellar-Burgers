import { useEffect } from 'react';
import style from '../app/app.module.css';
import AppHeader from '../app-header/app-header.jsx';
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Home, Login, Register, ForgotPassword, ResetPassword, PageNotFound, Profile } from '../../pages/index';
import IngredientDetails from '../ingredient-details/ingredient-details';
import ProtectedRoute from '../protected-route/protected-route';
import Modal from '../modal/modal';
import { getIngredients } from '../../services/actions/ingredients';
import { getUser } from '../../services/actions/user';
import { getCookie } from '../../utils/cookie';
import { REMOVE_SELECTED_INGREDIENT } from '../../services/actions/ingredients'

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { error } = useSelector((state) => state.ingredients);
  const background = location.state && location.state.background;
  
  useEffect(() => {
    dispatch(getIngredients())
  }, [])

  useEffect(() => {
    const accessToken = getCookie('token')
    if (accessToken) {
      dispatch(getUser())
    }
  },
    []
  );

  const closeModal = () => {
    dispatch({
      type: REMOVE_SELECTED_INGREDIENT
    })
    navigate(-1)
  }

  return (
    error
      ? (<h2 className={style.error}>Произошла ошибка 👽 попробуйте перезагрузить страницу</h2>)
      : (
        <>
          <AppHeader />
          <main>
            <Routes location={background || location}>
              <Route path='/' element={<Home />} />
              <Route path="/login" element={<ProtectedRoute element={<Login />} />} />
              <Route path="/register" element={<ProtectedRoute element={<Register />} />} />
              <Route path="/forgot-Password" element={<ProtectedRoute element={<ForgotPassword />} />} />
              <Route path="/reset-password" element={<ProtectedRoute element={<ResetPassword />} />} />
              <Route path='/profile' element={<ProtectedRoute isPrivate element={<Profile />} />} />
              <Route path="/ingredients/:id" element={<IngredientDetails />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
            {background && <Routes> <Route path="/ingredients/:id" element={<Modal onClose={closeModal}> <IngredientDetails /></Modal>} /> </Routes>}
          </main >
        </>
      )

  )
}

export default App
