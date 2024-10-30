import { useNavigate } from 'react-router-dom';
import logoMfit from '../../src/assets/logo-mfit-azul2.png';


export const LogOut = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className='bg-gray-custom h-full w-full pt-16 '>
                <div className='bg-white-custom justify-center flex p-8 w-11/12 max-w-md mx-auto flex-col items-center gap-8 rounded-lg'>
                    <img
                        src={logoMfit}
                        alt="Descrição da imagem"
                        className="w-32 h-32   "
                    />
                    <div className='flex items-center flex-col text-gray-custom text-base'>
                        <p>Você saiu do app!</p>
                        <p>Faça login para acessar novamente!</p>
                    </div>
                    <button onClick={() => navigate('/')} className='bg-gray-custom text-white-custom px-7 text-sm border-gray-custom shadow-lg py-2  border-2 rounded'>Entrar novamente</button>
                </div>
            </div>
        </>
    )
}