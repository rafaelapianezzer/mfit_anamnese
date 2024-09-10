import logo from '../../assets/logo-mfit-azul.png';
import fotoLogin from '../../assets/fotologin.jpeg';
import logoGoogle from '../../assets/play_store.png';
import logoApple from '../../assets/apple.png';



export const InitialLogin = () => {
    return (
        <div className='flex'>
            <div className='flex flex-col w-full hidden md:block '>
                <img
                    src={fotoLogin}
                    alt='Foto de uma mulher na academia'
                    className='object-cover w-full h-full max-h-[61rem] rounded-lg shadow-lg relative'
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
                    <input type="text" placeholder="E-mail" className="py-2 px-4 w-80 h-10 border border-gray-300" />
                    <input type="text" placeholder="Senha" className="py-2 px-4 w-80 h-10 border border-gray-300" />
                    <p>Esqueceu sua senha? <a href="#" className="text-blue-500">Clique aqui</a></p>
                </div>
                <div className='flex flex-col gap-3'>
                    <button className='bg-gray-custom text-white px-20 py-2 border-2 border-gray-custom rounded'>Entrar</button>
                    <button className='bg-white text-gray-custom px-20 py-2 border-gray-custom border-2 rounded'>Não tenho uma conta</button>
                    <div className='flex justify-center'>
                        <a href='https://termosdeuso.mfitpersonal.com.br/'>Termos de Serviço</a>
                    </div>
                </div>

            </div>
        </div>
    )
}