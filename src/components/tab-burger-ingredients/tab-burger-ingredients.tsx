import { useState, createRef, useMemo, MouseEvent, UIEvent } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './tab-burger-ingredients.module.css';
import { SET_SELECTED_INGREDIENT } from '../../utils/constants/ingredients';
import CardIngredient from '../card-ingredient/card-ingredient';
import { typeIngredient } from '../../utils/constants/type-ingredient';
import { useSelector, useDispatch } from '../../services/hooks/hooks';

const TabBurgerIngredients = () => {
  const dispatch = useDispatch();
  const { BUN, MAIN, SAUCE } = typeIngredient
  const { ingredients } = useSelector(state => state.ingredients)
  const [current, setCurrent] = useState<string>(BUN);
  const bunRef = createRef<HTMLHeadingElement>();
  const sauceRef = createRef<HTMLHeadingElement>();
  const mainRef = createRef<HTMLHeadingElement>();

  function handleTabClick(tab: typeof BUN | typeof MAIN | typeof SAUCE) {
    setCurrent(tab);
    const element = document.getElementById(tab);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  }

  const handleOpen = (event: MouseEvent<HTMLImageElement>) => {
    const clickСardId = event.currentTarget.getAttribute('id');
    dispatch({
      type: SET_SELECTED_INGREDIENT,
      ingadient: (ingredients.find((card) => card._id === clickСardId))
    })
  }

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    const sauceContainer = sauceRef.current?.getBoundingClientRect();
    const mainContainer = mainRef.current?.getBoundingClientRect();
    const el = event.target as HTMLDivElement

    if (sauceContainer === undefined || mainContainer === undefined) {
      return null
    }

    el.offsetTop - sauceContainer.top < 0
      ? setCurrent(BUN)
      : el.offsetTop - mainContainer.top < 0
        ? setCurrent(SAUCE)
        : setCurrent(MAIN);
  }

  const tabBuns = useMemo(() => {
    return ingredients.filter((item) => item.type === BUN)
  }, [ingredients, BUN])

  const tabSouse = useMemo(() => {
    return ingredients.filter((item) => item.type === SAUCE)
  }, [ingredients, SAUCE])

  const tabMain = useMemo(() => {
    return ingredients.filter((item) => item.type === MAIN)
  }, [ingredients, MAIN])

  return (
    <>
      <section className={`${style.tabBurgerIngredients__wrapper} pl-5`}>
        <h2 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h2>
        <nav className={`${style.navMenuIngredients__wrapper} mb-10`}>
          <Tab value={BUN} active={current === BUN} onClick={() => handleTabClick(BUN)}>Булки</Tab>
          <Tab value={SAUCE} active={current === SAUCE} onClick={() => handleTabClick(SAUCE)}>Соусы</Tab>
          <Tab value={MAIN} active={current === MAIN} onClick={() => handleTabClick(MAIN)}>Начинки</Tab>
        </nav>
        <div className={style.tabBurgerIngredients__section} onScroll={handleScroll}>
          <h3 className='text text_type_main-medium' id={BUN} ref={bunRef}>Булки</h3>
          <ul className={`${style.listIngredients} mt-6 ml-4 mr-4 mb-9`}>
            {tabBuns.map((item) => <CardIngredient card={item} key={item._id} onOpen={handleOpen} />)}
          </ul>
          <h3 className='text text_type_main-medium' id={SAUCE} ref={sauceRef}>Соусы</h3>
          <ul className={`${style.listIngredients} mt-6 ml-4 mr-4 mb-9`}>
            {tabSouse.map((item) => <CardIngredient card={item} key={item._id} onOpen={handleOpen} />)}
          </ul>
          <h3 className='text text_type_main-medium' id={MAIN} ref={mainRef}>Начинки</h3>
          <ul className={`${style.listIngredients} mt-6 ml-4 mr-4 mb-9`}>
            {tabMain.map((item) => <CardIngredient card={item} key={item._id} onOpen={handleOpen} />)}
          </ul>
        </div>
      </section>
    </>
  )
};



export default TabBurgerIngredients