import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faDumbbell, faCamera, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import logoMfitBranco from '../../assets/logo-mfit-branco.png';

export const DropdownMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

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
                className={`absolute left-1 top-10 bg-gray-custom text-white shadow-lg w-96 max-w-md z-50 p-4 grid grid-cols-3 rounded transform transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                    }`}
            >
                <li className="flex flex-col items-center mt-4">
                    <a onClick={() => navigate('/homepage')} className="text-[12px] p-2 text-center cursor-pointer">
                        <div className='gap-2 flex flex-col items-center'>
                            <div className="bg-blue-custom rounded-full h-10 w-10 flex items-center justify-center">
                                <FontAwesomeIcon icon={faHome} className="mb-1 h-4" />
                            </div>
                            <div className='text-sm'>Início</div>
                        </div>
                    </a>
                </li>

                <li className="flex flex-col items-center mt-4">
                    <a href="https://www.mfitpersonal.com.br/" target='_blank' className="text-[12px] p-2 text-center cursor-pointer">
                        <div className='gap-2 flex flex-col items-center'>
                            <div className="bg-blue-custom rounded-full h-10 w-10 flex items-center justify-center">
                                <img src={logoMfitBranco} className='h-4' />
                            </div>
                            <div className='text-sm'>App para consultoria</div>
                        </div>
                    </a>
                </li>

                <li className="flex flex-col items-center mt-4">
                    <a href="https://www.mfitpersonal.com.br/templates?origem=lp_templates" target='_blank' className="text-[12px] p-2 text-center cursor-pointer">
                        <div className='gap-2 flex flex-col items-center'>
                            <div className="bg-blue-custom rounded-full h-10 w-10 flex items-center justify-center">
                                <FontAwesomeIcon icon={faCamera} className="mb-1 h-4" />
                            </div>
                            <div className='text-sm'>Posts para instagram</div>
                        </div>
                    </a>
                </li>

                <li className="flex flex-col items-center mt-4">
                    <a onClick={() => navigate('/logout')} className="text-[12px] p-2 text-center cursor-pointer">
                        <div className='gap-2 flex flex-col items-center'>
                            <div className="bg-blue-custom rounded-full h-10 w-10 flex items-center justify-center">
                                <FontAwesomeIcon icon={faSignOutAlt} className="text-white h-4" />
                            </div>
                            <div className='text-sm'>Sair</div>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    );
};
