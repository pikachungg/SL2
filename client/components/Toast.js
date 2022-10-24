import styles from '../styles/Login.module.css'
import { RiErrorWarningLine } from 'react-icons/ri'
import { IconContext } from "react-icons";

export default function Toast(props) {

	return (
		<div className="toast" style={{visibility: props.status}}>
			<RiErrorWarningLine/>
			<p>
				Incorrect username or password.
			</p>
		</div>
	)

}
