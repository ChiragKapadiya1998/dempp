import { call, debounce, delay, put, select, takeLatest } from 'redux-saga/effects';
import PassionApi from '../api/Passions';
import UserApi from '../api/User';
import { actions } from '../ducks/passions';
import { actions as userActions } from '../ducks/user';
import { Passion, PassionCategory } from '../ducks/passions/types';
import { store, StoreState } from '../store';
import { capitalizeFirst } from '../utils/functions';
import NavigationHelper from '../utils/NavigationHelper';

function* getPassionCategoryWorker() {
  const token: StoreState['token']['accessToken'] = yield select((state: StoreState) => state.token.accessToken);

  const { data }: StoreState['user'] = yield select((state: StoreState) => state.user);

  try {
    if (!token) throw new Error('No auth');
    const passionCategories: PassionCategory[] = yield call<typeof PassionApi.getPassionCategories>(PassionApi.getPassionCategories, token);

    passionCategories?.map((category) => {
      data?.passions?.map((passion) => {
        if (passion?.categories?.length) {
          if (passion?.categories?.[0]?.name === category.name) {
            category.passions.push(passion);
          }
        }
      });
    });
    const categories =
      data && data.passions.length
        ? passionCategories.map((category) => ({
            ...category,
            passions: category.passions.map((passion) =>
              data.passions.find((userPassion) => userPassion.id === passion.id)
                ? { ...passion, selected: true, categories: category.id }
                : { ...passion, selected: false, categories: category.id },
            ),
          }))
        : passionCategories;

    if (!categories.length) throw new Error("Know-hows categories doesn't exists");
    yield put(actions.toggleSelectPassions());
    yield put(actions.getPassionCategorySuccess(categories));
  } catch (err: any) {
    yield put(actions.getPassionCategoryFailure(err.message));
  }
}

function* updatePassionsWorker() {
  const { categories }: StoreState['passions'] = yield store.getState().passions;
  const { accessToken }: StoreState['token'] = yield store.getState().token;
  try {
    if (!accessToken) throw new Error('No auth');

    const newUserPassions = categories.map((category) => category.passions.filter((passion) => passion.selected)).flat();

    yield call(UserApi.updateUser, accessToken, { passions: newUserPassions });
    yield put(userActions.getUserRequest());
    yield put(actions.updatePassionsSuccess());
    yield put(actions.toggleEditPassions(false));
    yield NavigationHelper.goBack();
  } catch (err: any) {
    yield put(actions.updatePassionsFailure(err.message));
  }
}

function* getRecomendedPassionsWorker({ payload }: ReturnType<typeof actions.getRecomendedPassionsRequest>) {
  const { accessToken }: StoreState['token'] = yield store.getState().token;
  try {
    if (!accessToken) throw new Error('No auth');

    const recomendedPassions: Passion[] = yield call<typeof PassionApi.getRecomendedPassions>(
      PassionApi.getRecomendedPassions,
      accessToken,
      payload.query,
    );

    if (!recomendedPassions.length) {
      yield put(actions.getRecomendedPassionsFailure('Sorry, topic not found'));
    }
    if (recomendedPassions.length) {
      yield put(actions.getRecomendedPassionsSuccess(recomendedPassions));
    }
  } catch (err: any) {
    yield put(actions.getRecomendedPassionsFailure(capitalizeFirst(err.message)));
  }
}

function* passionsSaga() {
  yield debounce(1000, actions.getRecomendedPassionsRequest, getRecomendedPassionsWorker);
  yield takeLatest(actions.getPassionCategoryRequest, getPassionCategoryWorker);
  yield takeLatest(actions.updatePassionsRequest, updatePassionsWorker);
}

export default passionsSaga;
