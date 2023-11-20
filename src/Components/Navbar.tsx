import style from '../CSS/navbar.module.scss'
import logo from '../assets/Logo.png'
export default function Navbar() {
    return (
        <nav className={style.nav}>
            <img src={logo} alt="" />
            <label htmlFor='search'>
                <img src="https://cdn-icons-png.flaticon.com/256/3917/3917132.png" alt="" />
                <input type="search" name="" id="search" />
            </label>
        </nav>
    )
}
