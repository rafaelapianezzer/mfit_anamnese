import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faHome, faDumbbell, faCamera, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

export const DropdownMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = (e) => {
        if (!e.target.closest('.menu-container')) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('click', closeMenu);
        } else {
            document.removeEventListener('click', closeMenu);
        }
        return () => {
            document.removeEventListener('click', closeMenu);
        };
    }, [isOpen]);

    return (
        <div className="relative menu-container">
            <button
                className="text-white focus:outline-none"
                onClick={toggleMenu}
            >
           
               <i className="fa-regular fa-bars"></i>
            </button>

            {isOpen && (
                <ul className="absolute left-0 top-12 bg-gray-800 text-white shadow-lg z-50 p-4 w-64">
                    <li className="flex flex-col items-center mb-2">
                        <FontAwesomeIcon icon={faHome} className="mb-1" />
                        <a href="#link1">Início</a>
                    </li>
                    <li className="flex flex-col items-center mb-2">
                        <FontAwesomeIcon icon={faDumbbell} className="mb-1" />
                        <a href="#link2">Consultoria</a>
                    </li>
                    <li className="flex flex-col items-center mb-2">
                        <FontAwesomeIcon icon={faCamera} className="mb-1" />
                        <a href="#link3">Instagram</a>
                    </li>
                    <li className="flex flex-col items-center mt-4">
                        <FontAwesomeIcon icon={faSignOutAlt} className="mb-1" />
                        <a href="#link4">Sair</a>
                    </li>
                </ul>
            )}
        </div>
    );
};
