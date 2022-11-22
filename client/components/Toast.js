import styles from '../styles/Toast.module.css'
import { RiErrorWarningLine, RiCloseFill } from 'react-icons/ri'

export default function Toast(props) {

	return (
		<div className={styles.toast} style={{opacity: props.opacity}}>
			<p>
				Incorrect username or password.
			</p>
			<RiErrorWarningLine/>
		</div>
	)

}
