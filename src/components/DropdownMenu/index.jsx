import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faDumbbell, faCamera, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

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

            <ul
                className={`absolute left-1 top-10 bg-gray-custom text-white shadow-lg w-96 max-w-md z-50 p-4 grid grid-cols-3 rounded transform transition-all duration-300 ease-in-out ${
                    isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                }`}
            >
                <li className="flex flex-col items-center mb-2">
                    <div className="bg-blue-custom rounded-full h-10 w-10 p-3 flex justify-center items-center">
                        <FontAwesomeIcon icon={faHome} className="mb-1" />
                    </div>
                    <a href="#link1" className="text-[12px] p-2 text-center">Início</a>
                </li>

                <li className="flex flex-col items-center justify-items-center mb-2">
                    <div className="bg-blue-custom rounded-full h-10 w-10 p-3 flex justify-center items-center">
                        <FontAwesomeIcon icon={faDumbbell} className="text-white" />
                    </div>
                    <a href="#link2" className="text-[12px] p-2 text-center">App para consultoria</a>
                </li>

                <li className="flex flex-col items-center mb-2">
                    <div className="bg-blue-custom rounded-full h-10 w-10 p-3 flex justify-center items-center">
                        <FontAwesomeIcon icon={faCamera} className="mb-1" />
                    </div>
                    <a href="#link3" className="text-[12px] p-2 text-center">Post para Instagram</a>
                </li>

                <li className="flex flex-col items-center mt-4">
                    <div className="bg-blue-custom rounded-full h-10 w-10 p-3 flex justify-center items-center">
                        <FontAwesomeIcon icon={faSignOutAlt} className="mb-1" />
                    </div>
                    <a href="#link4" className="text-[12px] p-2 text-center">Sair</a>
                </li>
            </ul>
        </div>
    );
};
