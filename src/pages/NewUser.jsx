import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
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
            sobrenome: Yup.string().required('preencha este campo.'),
            email: Yup.string()
                .email('Email inválido')
                .required('Email é obrigatório'),
            confirmEmail: Yup.string()
                .oneOf([Yup.ref('email'), null], 'Os emails devem corresponder')
                .required('Preencha este campo.'),
            whatsapp: Yup.string().matches(
                /^\+?[1-9]\d{1,14}$/,
                "Número inválido"
            )
                .required('Preencha este campo.'),
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
        <div className="bg-gray-custom  w-full flex items-center justify-center p-4 min-h-screen overflow-auto">
            <div className="bg-gray-100 w-full max-w-md p-6 flex flex-col items-center rounded-lg shadow-lg gap-6 h-auto  ">
                <img
                    src={logoMfit}
                    alt="Logo Mfit"
                    className="w-32 h-32 p-2"
                />
                <form onSubmit={formik.handleSubmit} className="w-full flex flex-col  ">
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
                    <PhoneInput
                        country="br" 
                        value={formik.values.whatsapp}
                        onChange={(phone) => formik.setFieldValue('whatsapp', phone)}
                        // placeholder="(11) 
                        enableAreaCodes={true} 
                        countryCodeEditable={false} 
                        inputProps={{
                            name: 'whatsapp',
                            className: 'border w-full py-3 pl-12 pr-3 rounded border-gray-100 shadow-md focus:outline-none focus:shadow-lg text-gray-400',
                        }}
                    />

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
                    <div className='flex items-center mx-auto flex-col py-3'>
                        <button type="submit" className="bg-gray-custom text-white-custom rounded-md  py-3 px-6 w-full text-sm">
                            Cadastrar
                        </button>
                    </div>

                </form>
                <div className='flex flex-col w-full  gap-6 text-lg text-gray-custom h-full'>
                    <div className='flex flex-row justify-start w-full gap-1 text-base h-auto'>
                        <p>Já tem uma conta?</p>
                        <button className='text-blue-custom'>Entre aqui</button>
                    </div>
                    <div className='flex justify-center '>
                        <a>Termos de Uso</a>
                    </div>

                </div>

            </div>
        </div>
    );
};
