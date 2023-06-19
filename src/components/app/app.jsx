import { useEffect } from 'react';
import style from '../app/app.module.css';
import AppHeader from '../app-header/app-header.jsx';
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Home, Login, Register, ForgotPassword, ResetPassword, PageNotFound, Profile, Order, ProfileOrders } from '../../pages/index';
import IngredientDetails from '../ingredient-details/ingredient-details';
import ProtectedRoute from '../protected-route/protected-route';
import Modal from '../modal/modal';
import { getIngredients } from '../../services/actions/ingredients';
import { checkUserAuth } from '../../services/actions/user';
import { REMOVE_SELECTED_INGREDIENT } from '../../services/actions/ingredients'
import Feed from '../../pages/feed/feed';
import OrderInformation from '../../components/order-information/order-information'
import ProfileInfo from '../profile-info/profile-info';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { error } = useSelector((state) => state.ingredients);
  const { orders } = useSelector(state => state.wsOrders);
  const { authOrders } = useSelector(state => state.wsAuthOrders);
  
  const background = location.state && location.state.background;

  useEffect(() => {
    dispatch(getIngredients())
    dispatch(checkUserAuth())
  }, [dispatch])

  const closeModal = () => {
    dispatch({
      type: REMOVE_SELECTED_INGREDIENT
    })
    navigate(-1)
  }

  return (
    error
      ? (<h2 className={style.error}>Произошла ошибка 👽 попробуйте перезагрузить страницу</h2>) :
      (
        <>
          <AppHeader />
          <main>
            <Routes location={background || location}>
              <Route path="/feed" element={<Feed />} />
              <Route path="/feed/:id" element={<Order data={orders} />} />
              <Route path='/profile' element={<ProtectedRoute isPrivate element={<Profile />} />} >
                <Route path='' element={<ProfileInfo />}></Route>
                <Route path='orders' element={<ProfileOrders />}></Route>
              </Route >
              <Route path='/profile/orders/:id' element={<ProtectedRoute isPrivate element={<Order profile={true} data={authOrders} />} />} />
              <Route path="/login" element={<ProtectedRoute element={<Login />} />} />
              <Route path="/register" element={<ProtectedRoute element={<Register />} />} />
              <Route path="/forgot-Password" element={<ProtectedRoute element={<ForgotPassword />} />} />
              <Route path="/reset-password" element={<ProtectedRoute element={<ResetPassword />} />} />
              <Route path="/ingredients/:id" element={<IngredientDetails />} />
              <Route path='/' element={<Home />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
            {background &&
              <Routes>
                <Route path="/ingredients/:id" element={<Modal onClose={closeModal}> <IngredientDetails /></Modal>} />
                <Route path="/feed/:id" element={<Modal onClose={closeModal}><OrderInformation data={orders} modal={true} /></Modal>} />
                <Route path="/profile/orders/:id" element={<Modal onClose={closeModal}><OrderInformation data={authOrders} modal={true} /></Modal>} />
              </Routes>}
          </main >
        </>
      )

  )
}

export default App
