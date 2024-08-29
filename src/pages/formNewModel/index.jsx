import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addModelo } from '../../store/models/modelsReducer';
import { useNavigate } from 'react-router-dom';
import {Header} from '../../components/Header';

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
            id: Date.now(),
            nome: modelName,
            aluno: null,
            perguntas: questions.map((q) => ({ pergunta: q, resposta: "" })),
        };
        dispatch(addModelo(newModel));

        // Opcionalmente, você pode resetar o formulário após salvar
        setModelName('');
        setQuestions(['']);
    };


    return (
        <>
            <Header/>
            <div className='bg-gray-custom h-48'>
          <button onClick={() => navigate('/')}>Voltar</button>
          <h5>Criar modelo de anamnese</h5>
        </div>
            <div className='bg-white w-11/12 h-80 rounded-lg absolute z-10 -mt-16 p-4 left-1/2 transform -translate-x-1/2'>
        <h3>Novo modelo</h3>
        <div>
            <p>Nome da anamnese</p>
            <input 
                type="text" 
                value={modelName} 
                onChange={(e) => setModelName(e.target.value)} 
            />
        </div>
        {questions.map((question, index) => (
            <div key={index}>
                <p>Pergunta {index + 1}</p>
                <input 
                    type="text" 
                    value={question} 
                    onChange={(e) => {
                        const newQuestions = [...questions];
                        newQuestions[index] = e.target.value;
                        setQuestions(newQuestions);
                    }} 
                />
            </div>
        ))}
        <button onClick={handleAddQuestion}>Adicionar Pergunta</button>
        <button onClick={handleSaveModel}>Salvar</button>
    </div>
        
        
        </>
);
};