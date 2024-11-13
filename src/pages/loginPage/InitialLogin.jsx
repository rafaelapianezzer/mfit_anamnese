import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo-mfit-azul.png';
import fotoLogin from '../../assets/fotologin.jpeg';
import logoGoogle from '../../assets/play_store.png';
import logoApple from '../../assets/apple.png';

export const InitialLogin = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false); 
    const navigate = useNavigate();

    const handleLogin = () => {
        if (email && senha) {
            navigate('/homepage');
        } else {
            alert("Por favor, preencha o e-mail e a senha.");
        }
    };

    const handleNewUser = () => {
        navigate('/newUser')
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsEmailValid(emailRegex.test(value));
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible); 
    };

    return (
        <div className='flex'>
            <div className='flex flex-col w-full hidden md:block '>
                <img
                    src={fotoLogin}
                    alt='Foto de uma mulher na academia'
                    className='object-cover w-full h-screen rounded-lg shadow-lg relative'
                />
                <div className='fixed bottom-0 left-0 p-2'>
                    <p className='text-white'>Use a MFIT também no seu telefone</p>
                    <div className='flex items-center gap-3'>
                        <img src={logoApple} alt='Logo Apple Store' className='h-10' />
                        <img src={logoGoogle} alt='Logo Play Store' className='h-11' />
                    </div>
                </div>
            </div>
            <div className='w-full justify-center items-center h-svh bg-gray-50 flex flex-col gap-8'>
                <div className='flex flex-col items-center justify-center'>
                    <img src={logo} alt="Logo MFIT" className='h-12' />
                    <h3 className='font-bold'>Professor</h3>
                </div>
                <div className="flex flex-col items-center justify-center gap-4">
                    <input
                        type="text"
                        placeholder="E-mail"
                        value={email}
                        onChange={handleEmailChange}
                        className={`py-2 px-4 w-80 h-10 border ${isEmailValid ? 'border-gray-300' : 'border-red-500'}`}
                    />
                    {!isEmailValid && <p className="text-red-500 text-sm mt-1">Por favor, insira um e-mail válido.</p>}
                    <div className="relative w-80">
                        <input
                            type={isPasswordVisible ? "text" : "password"} 
                            placeholder="Senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            className="py-2 px-4 h-10 border border-gray-300 w-full"
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600">
                            {isPasswordVisible ? <i class="fa-regular fa-eye"></i> : <i class="fa-regular fa-eye-slash"></i> }  
                        </button>
                       
                    </div>
                    <p>Esqueceu sua senha? <a href="#" className="text-blue-500">Clique aqui</a></p>
                </div>
                <div className='flex flex-col gap-3'>
                    <button
                        onClick={handleLogin}
                        className='bg-gray-custom text-white px-20 py-2 border-2 border-gray-custom rounded'>
                        Entrar
                    </button>
                    <button className='bg-white text-gray-custom px-20 py-2 border-gray-custom border-2 rounded' onClick={handleNewUser}>
                        Não tenho uma conta
                    </button>
                    <div className='flex justify-center'>
                        <a href='https://termosdeuso.mfitpersonal.com.br/'>Termos de Serviço</a>
                    </div>
                </div>
            </div>
        </div>
    );
};
