import { fork, take } from 'redux-saga/effects'
import { cancel } from '@redux-saga/core/effects'
import arg from 'arg'

/**
 *
 * @param typeRequest
 * @param typeCancel
 * @param funcOnRequest
 * @param args
 *
 * sagas creator allows to handle cancelling into sagas without redefine the same sample of code each time,
 * provide one type typeRequest is used to trigger the run of the generator function (funcOnRequest) and typeCancel to cancel it.
 * If typeCancel is triggered while funcRequest is running then yield cancelled() will be true otherwise it remains false
 * WARNING: sagasCreator is blocking fork it if you want non-blocking call
 */

export function* sagasCreator(typeRequest, typeCancel, funcOnRequest, ...args) {
  while (true) {
    const action = yield take(typeRequest)
    const funcToCancelSync = yield fork(funcOnRequest, ...args.concat(action))

    yield take(typeCancel)
    yield cancel(funcToCancelSync)
  }
}
