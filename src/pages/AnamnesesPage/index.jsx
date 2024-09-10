import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Header } from '../../components/Header';
import { removeModelo, deletePergunta, addPergunta, editModelo } from '../../store/models/modelsReducer';
import { useNavigate } from 'react-router-dom';
import AnamnesesPendentes from '../../components/Anamneses/AnamnesesPendentes';
import { AnamnesesRespondidas } from '../../components/Anamneses/AnamnesesRespondidas';
import { Modal } from '../../components/Modal';

export const Anamneses = ({ modeloId }) => {
  const [activeView, setActiveView] = useState('modelos');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModelo, setSelectedModelo] = useState(null);
  const anamnesesList = useSelector((state) => state.anamneses.anamnesesList);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modelos = useSelector((state) => state.models.modelos);
  const pendentes = anamnesesList.filter((anamnese) => anamnese.status === 1);
  const respondidas = anamnesesList.filter((anamnese) => anamnese.status === 2);
  const [perguntas, setPerguntas] = useState("");
  const [showAddQuestion, setShowAddQuestion] = useState(false);
const [novaPergunta, setNovaPergunta] = useState('');





  const handleDelete = (id) => {
    dispatch(removeModelo(id));
  };

  const handleRemoveQuestion = (modeloId, questionId) => {
    dispatch(deletePergunta({ modeloId, questionId }));
  };

  const handleOpenModal = (modelo) => {
    setSelectedModelo(modelo);
    setPerguntas(modelo.perguntas); // 
    setIsModalOpen(true);
  };

const handleEditChange = (e, perguntaId) => {
  const { value } = e.target;

  if (e.target.name === 'nome') {
    // Atualiza o nome do modelo
    setSelectedModelo((prevModelo) => ({
      ...prevModelo,
      nome: value,
    }));
  } else {
    // Atualiza uma pergunta específica
    setSelectedModelo((prevModelo) => {
      if (!prevModelo) return null; // Caso não haja modelo selecionado

      const updatedPerguntas = prevModelo.perguntas.map((pergunta) =>
        pergunta.id === perguntaId ? { ...pergunta, pergunta: value } : pergunta
      );

      return {
        ...prevModelo,
        perguntas: updatedPerguntas,
      };
    });
  }
};

const handleAddQuestion = () => {
  setShowAddQuestion(true);
  if (novaPergunta.trim() && selectedModelo?.id) {
    dispatch(addPergunta({ modeloId: selectedModelo.id, novaPergunta }));
    setNovaPergunta(""); 
  } 
};

  const handleSaveChanges = () => {
    dispatch(
      editModelo({
        id: selectedModelo.id,
        updatedNome: selectedModelo.nome,
        updatedPerguntas: perguntas,
      })
    );
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const updatedModelo = modelos.find((modelo) => modelo.id === selectedModelo?.id);
    if (updatedModelo) {
      setSelectedModelo(updatedModelo);
      setPerguntas(updatedModelo.perguntas); // Atualiza as perguntas no estado ao reabrir o modal
    }
  }, [modelos, selectedModelo?.id]);

  return (
    <>
      <Header />
      <div className="h-full bg-gray-200">
        <div className="bg-gray-custom h-48">
          <button onClick={() => navigate('/')}>Voltar</button>
          <h5>Anamneses</h5>
        </div>
        <div className="bg-white w-11/12 h-80 rounded-lg absolute z-10 -mt-16 p-4 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-row justify-around">
            <button onClick={() => setActiveView('modelos')}>Modelos</button>
            <button onClick={() => setActiveView('pendentes')}>Pendentes</button>
            <button onClick={() => setActiveView('respondidas')}>Respondidas</button>
          </div>
          <div className="flex justify-end">
            <button onClick={() => navigate('/modelform')}>Criar Modelo</button>
          </div>

          {activeView === 'modelos' && (
            <ul>
              {modelos.map((modelo) => (
                <div key={modelo.id} className="flex flex-row">
                  <li>
                    <i className="fa-regular fa-paper-plane mr-2"></i>
                    <p onClick={() => handleOpenModal(modelo)}>{modelo.nome}</p>
                  </li>
                  <button onClick={() => handleDelete(modelo.id)} className="text-red-500 ml-4">
                    Excluir
                  </button>
                </div>
              ))}
            </ul>
          )}

          {activeView === 'pendentes' && (
            <ul>
              {pendentes.map((anamnese) => (
                <AnamnesesPendentes key={anamnese.id} anamnese={anamnese} />
              ))}
            </ul>
          )}

          {activeView === 'respondidas' &&
            (respondidas.length === 0 ? (
              <h3>Você ainda não tem nenhuma anamnese respondida</h3>
            ) : (
              <ul>
                {respondidas.map((anamnese) => (
                  <AnamnesesRespondidas key={anamnese.id} anamnese={anamnese} />
                ))}
              </ul>
            ))}
        </div>
      </div>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <div className="p-5">
            <h3>{selectedModelo?.nome}</h3>
            <div>
              <p>Nome da anamnese:</p>
              {selectedModelo?.id === 1 ? (
                <span>{selectedModelo?.nome}</span>
              ) : (
                <input
                  type="text"
                  name="nome"
                  value={selectedModelo?.nome || ''}
                  onChange={handleEditChange}
                />
              )}
            </div>
            <div>
              <ul>
                {selectedModelo.perguntas.map((pergunta, index) => (
                  <li key={index}>
                    <p>Pergunta:</p>
                    {selectedModelo?.id === 1 ?
                      <span>{pergunta.pergunta}</span>
                      :
                      <>
                        <input
                          type="text"
                          name={`pergunta_${pergunta.id}`} 
                          value={pergunta.pergunta || ''}
                          onChange={(e) => handleEditChange(e, pergunta.id)} />

                        <button onClick={() => handleRemoveQuestion(selectedModelo.id, pergunta.id)}>Excluir</button>
                      </>
                    }
                  </li>
                ))}
              </ul>
            </div>
            {selectedModelo?.id !== 1 && (
        <>
 <div>
  {showAddQuestion && (
    <div className="relative mb-4">
      <input
        type="text"
        value={novaPergunta}
        onChange={(e) => setNovaPergunta(e.target.value)}
        placeholder="Digite a nova pergunta"
        className="border p-2 rounded mb-2 w-full"
      />
    </div>
  )}
  <button
    onClick={handleAddQuestion}
    className="mt-4 bg-green-500 text-white p-2 rounded"
  >
    Adicionar Pergunta
  </button>
</div>
          
       
        </>
      )}
            {selectedModelo?.id !== 1 && (
              <button onClick={handleSaveChanges} className="mt-4 bg-blue-500 text-white p-2 rounded">
                Salvar
              </button>
            )}
          </div>
        </Modal>
      )}
    </>
  );
};
