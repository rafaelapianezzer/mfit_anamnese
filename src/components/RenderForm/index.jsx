import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const RenderForm = ({ id }) => {
    const modelos = useSelector((state) => state.models.modelos);

    const [modelo, setModelo] = useState(null);


    useEffect(() => {
        if (modelos) {
            setModelo(modelos.find(m => m.id === id))
        }


    }, [modelos])


    useEffect(() => {

        console.log(modelo)

    }, [modelo])


    if (!modelo)
        return null
    return (
        <div>

            <h3>{modelo.nome}</h3>
            <ul>
                <li>
                    <p>Nome da anamnese:</p>
                    {modelo.nome}
                </li>
                {modelo.perguntas.map((pergunta, index) => (
                    <li key={index}>
                        Pergunta:
                        <strong>{pergunta.pergunta}</strong>: {pergunta.resposta}
                    </li>
                ))}
            </ul>

        </div>
    );
};

