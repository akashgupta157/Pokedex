import { Link } from 'react-router-dom'
import style from '../CSS/navbar.module.scss'
import logo from '../assets/Logo.png'
import { useTheme } from '../ContextAPI/ThemeContext';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { url } from './url';
import { useData } from '../ContextAPI/DataContext';
export default function Navbar() {
    const { isDarkMode, toggleTheme } = useTheme();
    const { setData, setLoading } = useData();
    const [search, setSearch] = useState('');
    useEffect(() => {
        const getData = setTimeout(async () => {
            setLoading(true)
            const { data } = await axios.get(`${url}/pokemon/search`, {
                params: {
                    query: search
                }
            })
            setData(data)
            setLoading(false)
        }, 500);
        return () => clearTimeout(getData)
    }, [search]);
    return (
        <nav className={style.nav}>
            <Link to={'/'}><img src={logo} alt="" /></Link>
            <label htmlFor='search' className={style.search}>
                <img src="https://cdn-icons-png.flaticon.com/256/3917/3917132.png" alt="" />
                <input type="search" name="" id="search" onChange={(e: any) => setSearch(e.target.value)} placeholder='Search by name, type or number...' />
            </label>
            <label className={style.switch}>
                <input type="checkbox" checked={isDarkMode} onChange={toggleTheme} />
                <span className={style.slider}></span>
            </label>
        </nav>
    )
}
