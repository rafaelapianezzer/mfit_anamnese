import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { addModelo } from '../../store/models/modelsReducer';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header';

export const FormNewModel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [modelName, setModelName] = useState('');
    const [questions, setQuestions] = useState(['']);

    const handleAddQuestion = () => {
        setQuestions([...questions, '']);
    };

    const handleSaveModel = () => {
        const newModel = {
            id: uuidv4(),
            nome: modelName,
            aluno: null,
            perguntas: questions.map((q) => ({ id: uuidv4(), pergunta: q, resposta: "" })),
        };
        dispatch(addModelo(newModel));
        setModelName('');
        setQuestions(['']);
        navigate('/');
    };

    return (
        <>
            <Header />
            <div className="bg-gray-custom h-48 p-5">
                <div className='max-w-screen-lg mx-auto'>
                    <button onClick={() => navigate('/')} className='rounded bg-gray-secundary p-2 px-3 text-gray-custom text-xs mb-4'>Voltar</button>
                    <h5 className='text-lg text-white'>Seus Alunos</h5>
                </div>
            </div>
            <div className='bg-gray-100 h-full flex mx-auto justify-center relative '>
                <div className='bg-white w-11/12 h-auto rounded-lg absolute z-10 -mt-16 p-4 left-1/2 transform -translate-x-1/2 max-w-screen-lg'>
                    <h3 className='text-gray-custom mb-9'>Novo modelo</h3>
                    <div>
                        <p className='text-sm text-gray-custom my-2'>Nome da anamnese</p>
                        <input
                            type="text"
                            value={modelName}
                            onChange={(e) => setModelName(e.target.value)}
                            className='border w-full p-3 rounded border-gray-300 mb-8'
                        />
                    </div>
                    {questions.map((question, index) => (
                        <div key={index}>
                            <p className='text-sm text-gray-custom my-2'>Pergunta {index + 1}</p>
                            <input
                                type="text"
                                value={question}
                                onChange={(e) => {
                                    const newQuestions = [...questions];
                                    newQuestions[index] = e.target.value;
                                    setQuestions(newQuestions);

                                }}
                                className='border w-full p-3 rounded border-gray-300 mb-8'
                            />
                        </div>
                    ))}
                    <div className='flex flex-col items-start gap-5'>
                        <button onClick={handleAddQuestion} className='bg-blue-custom px-5 py-3 rounded text-white-custom'>Adicionar Pergunta</button>
                        <button onClick={handleSaveModel} className='w-full bg-gray-custom rounded p-3 text-white-custom'>Salvar</button>
                    </div>

                </div>
            </div>


        </>
    );
};