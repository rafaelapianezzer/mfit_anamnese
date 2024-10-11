import { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal } from "../Modal";
import { removeAnamnese } from '../../store/anamneses/anamnesesReducer';

export const AnamnesesRespondidas = ({ anamnese }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleViewAnamnese = () => {
    setOpen(true);
  };

  const handleRemoveAnamnese = (id) => {
    dispatch(removeAnamnese(id));
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <>
      <li key={anamnese.id} className="flex items-center justify-between p-4 border-b border-b-[rgba(128,128,128,0.17)] ">
        <div className='flex flex-col'>
        <span onClick={handleViewAnamnese} className='text-gray-custom'>{anamnese.nome}</span>
        <span className='text-gray-400 text-sm'>{anamnese.aluno}</span>
        </div>
        <button onClick={() => handleRemoveAnamnese(anamnese.id)}>
        <i className="fa-light fa-trash text-white-custom bg-red-600 px-2 py-1 rounded text-xs"></i>
        </button>
      </li>
      {open && (
        <Modal isOpen={open} onClose={handleCloseModal}>
          <div className="p-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">{anamnese.nome}</h2>
              <button onClick={handleCloseModal} className="text-red-500 font-bold">X</button>
            </div>
            {anamnese.perguntas.map((perguntaObj, index) => (
              <div key={index} className="my-2">
                <span className="block font-semibold">{perguntaObj.pergunta}</span>
                <p className="mt-1 p-2 border border-gray-300 rounded bg-gray-100">
                  {perguntaObj.resposta}
                </p>
              </div>
            ))}
          </div>
        </Modal>
      )}
    </>
  );
};