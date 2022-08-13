import classes from './ProfileForm.module.css'
import { useRef, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import AuthContext from '../../store/auth-context'

const ProfileForm = () => {
  const history = useHistory()
  const newPasswordInputRef = useRef()
  const authCtx = useContext(AuthContext)
  const submitHandler = (event) => {
    event.preventDefault()

    const enteredNewPassword = newPasswordInputRef.current.value
    fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBdZ251M5ZZeftNqBm_ETc9uCkvWesuGls',
      {
        method: 'POST',
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredNewPassword,
          returnSecureToken: false,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ).then((res) => {
      history.replace('/')
    })
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          ref={newPasswordInputRef}
          minLength="6"
          type="password"
          id="new-password"
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  )
}

export default ProfileForm
