import { Link } from "react-router-dom"
import styles from './navbar.module.css'
const NavBar = () => {
  return (
    <nav className={styles.navbar}>
        <Link to={'/'}>Home</Link>
        <Link to={'/history'}>History</Link>
    </nav>
  )
}

export default NavBar