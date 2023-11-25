import style from '../CSS/loader.module.scss'
import { useTheme } from '../ContextAPI/ThemeContext';
export default function Loader() {
    const { isDarkMode } = useTheme();
    return (
        <div className={isDarkMode ? 'darkMode' : 'lightMode'} style={{ paddingTop: "200px" }}>
            <div className={style.ball}></div>
        </div>
    )
}
