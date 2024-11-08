import { useNavigate } from 'react-router-dom';
import logoMfit from '../../src/assets/logo-mfit-azul2.png';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addPersonalTrainer } from '../store/user/userReducer';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export const NewUser = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            nome: '',
            sobrenome: '',
            email: '',
            confirmEmail: '',
            whatsapp: '',
            sexo: '',
            password: '',
        },
        validationSchema: Yup.object({
            nome: Yup.string().required('Nome é obrigatório'),
            sobrenome: Yup.string().required('Sobrenome é obrigatório'),
            email: Yup.string()
                .email('Email inválido')
                .required('Email é obrigatório'),
            confirmEmail: Yup.string()
                .oneOf([Yup.ref('email'), null], 'Os emails devem corresponder')
                .required('Confirmação de email é obrigatória'),
            whatsapp: Yup.string(),
            sexo: Yup.string(),
            password: Yup.string()
                .min(8, 'A senha deve ter no mínimo 8 caracteres')
                .required('Senha é obrigatória'),
        }),
        onSubmit: (values) => {
            dispatch(addPersonalTrainer(values));
            navigate('/');
        },
    });

    return (
        <div className="bg-gray-custom h-full w-full pt-16">
            <div className="bg-gray-100 p-8 w-11/12 max-w-md mx-auto flex flex-col items-center gap-8 rounded-lg shadow-lg">
                <img
                    src={logoMfit}
                    alt="Logo Mfit"
                    className="w-32 h-32"
                />
                <form onSubmit={formik.handleSubmit} className="w-full flex flex-col gap-3">
                    <div className="mb-4">
                        <input
                            type="text"
                            name="nome"
                            placeholder="Nome"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.nome}
                            className="border w-full p-3 rounded border-gray-100 shadow-md focus:outline-none focus:shadow-lg"
                        />
                        {formik.touched.nome && formik.errors.nome && (
                            <div className="text-red-500 text-sm p-1">{formik.errors.nome}</div>
                        )}
                    </div>

                    <div className="mb-4">
                        <input
                            type="text"
                            name="sobrenome"
                            placeholder="Sobrenome"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.sobrenome}
                            className="border w-full p-3 rounded border-gray-100 shadow-md focus:outline-none focus:shadow-lg"
                        />
                        {formik.touched.sobrenome && formik.errors.sobrenome && (
                            <div className="text-red-500 text-sm p-1">{formik.errors.sobrenome}</div>
                        )}
                    </div>

                    <div className="mb-4">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            className="border w-full p-3 rounded border-gray-100 shadow-md focus:outline-none focus:shadow-lg"
                        />
                        {formik.touched.email && formik.errors.email && (
                            <div className="text-red-500 text-sm p-1">{formik.errors.email}</div>
                        )}
                    </div>

                    <div className="mb-4">
                        <input
                            type="email"
                            name="confirmEmail"
                            placeholder="Confirme seu email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.confirmEmail}
                            className="border w-full p-3 rounded border-gray-100 shadow-md focus:outline-none focus:shadow-lg"
                        />
                        {formik.touched.confirmEmail && formik.errors.confirmEmail && (
                            <div className="text-red-500 text-sm p-1">{formik.errors.confirmEmail}</div>
                        )}
                    </div>

                    <div className="mb-4">
                        <input
                            type="password"
                            name="password"
                            placeholder="Senha"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            className="border w-full p-3 rounded border-gray-100 shadow-md focus:outline-none focus:shadow-lg"
                        />
                        {formik.touched.password && formik.errors.password && (
                            <div className="text-red-500 text-sm p-1">{formik.errors.password}</div>
                        )}
                    </div>

                    <div className="mb-4">
                        <PhoneInput
                            country="br"
                            value={formik.values.whatsapp}
                            onChange={(phone) => formik.setFieldValue('whatsapp', phone)}
                            placeholder="(11) 96123-4567"
                            className='w-full '
                            inputProps={{
                                name: 'whatsapp',
                                required: true,
                                className: 'border w-full p-3 rounded border-gray-100 shadow-md focus:outline-none focus:shadow-lg placeholder-gray-400',
                            }}
                        />
                        {formik.touched.whatsapp && formik.errors.whatsapp && (
                            <div className="text-red-500 text-sm p-1">{formik.errors.whatsapp}</div>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-500 "></label>
                        <div className="flex justify-start py-2 gap-6">
                            <div>
                                <input
                                    id="masculino"
                                    name="sexo"
                                    type="radio"
                                    value="Masculino"
                                    onChange={formik.handleChange}
                                    className="mr-2"
                                    checked={formik.values.sexo === 'Masculino'}
                                />
                                <label htmlFor="masculino" className="text-gray-custom text-xl">Masculino</label>
                            </div>
                            <div>
                                <input
                                    id="feminino"
                                    name="sexo"
                                    type="radio"
                                    value="Feminino"
                                    onChange={formik.handleChange}
                                    className="mr-2"
                                    checked={formik.values.sexo === 'Feminino'}
                                />
                                <label htmlFor="feminino" className="text-gray-custom text-xl">Feminino</label>
                            </div>
                        </div>
                        {formik.touched.sexo && formik.errors.sexo && (
                            <div className="text-red-500 text-sm p-1">{formik.errors.sexo}</div>
                        )}
                    </div>

                    <button type="submit" className="bg-gray-custom text-white-custom py-3 mx-24 rounded-md">
                        Cadastrar
                    </button>
                </form>
            </div>
        </div>
    );
};
