import { Link } from 'react-router-dom'
import style from '../CSS/navbar.module.scss'
import logo from '../assets/Logo.png'
import { useTheme } from '../ContextAPI/ThemeContext';
export default function Navbar() {
    const { isDarkMode, toggleTheme } = useTheme();
    return (
        <nav className={style.nav}>
            <Link to={'/'}><img src={logo} alt="" /></Link>
            <label htmlFor='search' className={style.search}>
                <img src="https://cdn-icons-png.flaticon.com/256/3917/3917132.png" alt="" />
                <input type="search" name="" id="search" />
            </label>
            <label className={style.switch}>
                <input type="checkbox" checked={isDarkMode} onChange={toggleTheme} />
                <span className={style.slider}></span>
            </label>
        </nav>
    )
}
