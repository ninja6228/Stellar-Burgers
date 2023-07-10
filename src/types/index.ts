import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { TIngredientsActions } from '../services/actions/ingredients';
import { TOrderActions } from '../services/actions/order';
import { TresetPasswordActions } from '../services/actions/reset-password';
import { TUserActions } from '../services/actions/user';
import { TWsActions } from '../services/actions/ws-actions';
import { TWsAuthActions } from '../services/actions/ws-auth-actions';
import store from '../services/store';

type TApplicationActions = TIngredientsActions | TOrderActions | TresetPasswordActions | TUserActions | TWsActions | TWsAuthActions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<ThunkAction<ReturnType, Action, RootState, TApplicationActions>>;

