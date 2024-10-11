import { useState } from "react";
import { Modal } from "../Modal";
import { useDispatch } from "react-redux";
import { saveRespostas, removeAnamnese, updateAnamneseStatus } from '../../store/anamneses/anamnesesReducer';

const AnamnesesPendentes = ({ anamnese }) => {

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [respostas, setRespostas] = useState(
    anamnese.perguntas.map((p) => ({ ...p, resposta: "" }))
  );

  const handleRespostaChange = (index, value) => {
    setRespostas((prevRespostas) => {
      const newRespostas = [...prevRespostas];
      newRespostas[index].resposta = value;
      return newRespostas;
    });
  };

  const handleSave = (id) => {
    dispatch(saveRespostas({ id, respostas }));
    dispatch(updateAnamneseStatus({ id, status: 2 }));
    handleEditAnamnese();
  };

  const handleRemoveAnamnese = (id) => {
    dispatch(removeAnamnese(id));
  };

  const handleEditAnamnese = () => {
    setOpen(prevState => !prevState);
  };

  return (
    <>
      <li key={anamnese.id} className="flex flex-row items-center justify-between  p-4 border-b border-b-[rgba(128,128,128,0.17)] ">
        <div className='flex flex-col'>
          <div className='flex gap-2'>
            <span className='text-gray-custom'>{anamnese.nome}</span>
            <button onClick={handleEditAnamnese}>
              <i className="fa-regular fa-link text-blue-custom"></i>
            </button>
          </div>
          <span className='text-gray-400 text-sm'>{anamnese.aluno}</span>
        </div>
        <button onClick={() => handleRemoveAnamnese(anamnese.id)}>
          <i className="fa-light fa-trash text-white-custom bg-red-600 px-2 py-1 rounded text-xs"></i>
        </button>
      </li>
      <Modal isOpen={open}>
        <div className="p-5">
          <span className="flex">
            Nome: {anamnese.nome}
            <span onClick={handleEditAnamnese}>X</span>
          </span>
          <span className="block">Aluno: {anamnese.aluno}</span>
          {anamnese.perguntas.map((perguntaObj, index) => (
            <div key={index} className="my-2">
              <span className="block">{perguntaObj.pergunta}</span>
              <input
                type="text"
                value={respostas[index].resposta} // Correção aqui
                onChange={(e) => handleRespostaChange(index, e.target.value)}
                className="mt-1 p-1 border border-gray-300 rounded"
                placeholder="Digite sua resposta"
              />
            </div>
          ))}
          <button onClick={() => handleSave(anamnese.id)} className="mt-4 p-2 bg-blue-500 text-white rounded">
            Salvar Respostas
          </button>
        </div>
      </Modal>
    </>
  );
};

export default AnamnesesPendentes;
