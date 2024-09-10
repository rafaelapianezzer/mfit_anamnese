import { useState } from "react";
import { Modal } from "../Modal";
import { useDispatch } from "react-redux";
import { saveRespostas, removeAnamnese, updateAnamneseStatus } from '../../store/anamneses/anamnesesReducer';

const AnamnesesPendentes = ({ anamnese }) => {

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [respostas, setRespostas] = useState(
    anamnese.perguntas.map((p) => ({ ...p, resposta: "" })) // Correção aqui
  );

  const handleRespostaChange = (index, value) => {
    setRespostas((prevRespostas) => {
      const newRespostas = [...prevRespostas];
      newRespostas[index].resposta = value; // Correção aqui
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
      <li key={anamnese.id} className="flex flex-col">
        <span>{anamnese.nome}</span>
        <span>{anamnese.aluno}</span>
        <button onClick={handleEditAnamnese}>Responder</button>
        <button onClick={() => handleRemoveAnamnese(anamnese.id)}>Excluir</button>
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
