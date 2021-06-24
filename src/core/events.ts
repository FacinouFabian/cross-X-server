import callUser from './callUser'
import makeAnswer from './makeAnswer'
import rejectCall from './rejectCall'
import { Action, CustomEvent } from '../../definitions'

const events: CustomEvent[] = [
  /* {
    eventName: 'call-user',
    action: callUser as Action,
  }, */
  {
    eventName: 'make-answer',
    action: makeAnswer as Action,
  },
  {
    eventName: 'reject-call',
    action: rejectCall as Action,
  },
]

export default events
