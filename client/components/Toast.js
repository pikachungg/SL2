import styles from '../styles/Toast.module.css'
import { RiErrorWarningLine, RiCloseFill } from 'react-icons/ri'
import { IconContext } from "react-icons";

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
