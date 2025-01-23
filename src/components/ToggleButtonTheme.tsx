import React, { useEffect, useState } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';

const ToggleButtonTheme: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");

        if (savedTheme) {
            setIsDarkMode(savedTheme === 'dark');
        }
    }, []);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);

        localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light');
    };

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [isDarkMode]);


    return (
        <li className="nav-item align-items-center d-flex" >
            <i className="fas fa-sun"></i>
            <div className="ms-2 form-check form-switch" onClick={ toggleTheme }>
                <input className="form-check-input" type="checkbox" role="switch" id="themingSwitcher" />
            </div>
            <i className="fas fa-moon"></i>
        </li>

    )
}

export default ToggleButtonTheme;