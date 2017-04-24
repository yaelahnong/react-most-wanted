import { Reducer, Thunk } from 'redux-testkit';
import reducer from './reducer'
import * as selectors from './selectors';
import * as actions from './actions';
import Immutable from 'seamless-immutable';
import { initialState } from './reducer'

describe('auth reducer', () => {

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(initialState)
  })

  it('should not affect state', () => {
    Reducer(reducer).expect({type: 'NOT_EXISTING'}).toReturnState(initialState);
  });


  it('should handle SET_AUTH_MENU_OPEN', () => {
    Reducer(reducer).expect(actions.setAuthMenuOpen(true)).toReturnState({...initialState, isMenuOpen: true})
  })

  it('should handle SET_PASSWORD_DIALOG_OPEN', () => {
    Reducer(reducer).expect(actions.setPasswordDialogOpen(true)).toReturnState({...initialState, isPasswordDialogOpen: true})
  })

  it('should handle SET_NEW_PHOTO_URL', () => {
    Reducer(reducer).expect(actions.setNewPhotoURL('url')).toReturnState({...initialState, newPhotoURL: 'url'})
  })

  it('should handle SET_FETCHING', () => {
    Reducer(reducer).expect(actions.setFetching(true)).toReturnState({...initialState, isFetching: true})
  })

  it('should handle SIGN_OUT_SUCCESS', () => {
    Reducer(reducer).expect(actions.signOutSuccess()).toReturnState(initialState)
  })

  it('should handle AUTH_ERROR', () => {

    const error={
      errorCode: 'code',
      errorMessage: 'message'
    }

    Reducer(reducer).expect(actions.authError(error)).toReturnState({...initialState, error})
  })


  it('should handle SIGN_IN_SUCCESS', () => {

    const user={
      isAuthorised: true,
      name: 'Name',
      email: 'Email'
    }

    Reducer(reducer).expect(actions.signInSuccess(user)).toReturnState({
      ...initialState,
      ...user
    })
  })



})