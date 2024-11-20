import { useState } from "react";
import { Modal } from "../Modal";
import { useDispatch } from "react-redux";
import { saveRespostas, removeAnamnese, updateAnamneseStatus } from '../../store/anamneses/anamnesesReducer';
import { useNavigate } from "react-router-dom";

const AnamnesesPendentes = ({ anamnese }) => {
  const navigate = useNavigate();
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
    navigate(`/EditAnamnese/${anamnese.id}`);
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
    </>
  );
};

export default AnamnesesPendentes;
