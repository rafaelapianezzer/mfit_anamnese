import { DropdownMenu } from '../DropdownMenu';
import logo from '../../assets/logo-mfit-branco.png'

export const Header = () => {
    return (
        <header className="relative flex w-full p-5 bg-blue-custom">
            <div className="flex w-full mx-auto items-center justify-between">
                <div className="flex-shrink-0">
                    <DropdownMenu />
                </div>
                <div className="flex text-center flex-row gap-2">
                    <img src={logo} alt='Logo MFIT' className='w-full h-auto max-w-[30px] mx-auto'/>
                    <h1 className="text-white text-2xl"><span className='font-bold'>MFIT </span>ANAMNESE</h1>
                </div>
                <div className="flex-shrink-0 w-6"></div>
            </div>
        </header>
    );
};



