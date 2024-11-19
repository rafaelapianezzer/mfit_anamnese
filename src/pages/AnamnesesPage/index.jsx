import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Header } from '../../components/Header';
import { removeModelo, deletePergunta, addPergunta, editModelo } from '../../store/models/modelsReducer';
import { useNavigate } from 'react-router-dom';
import AnamnesesPendentes from '../../components/Anamneses/AnamnesesPendentes';
import { AnamnesesRespondidas } from '../../components/Anamneses/AnamnesesRespondidas';
import { Modal } from '../../components/Modal';
import { toast } from 'react-toastify';

export const Anamneses = () => {
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
    toast.success(
      <>
        Tudo certo! <br />
        <div className="text-sm">
          O modelo foi excluído!
        </div>
      </>
    );
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
      setSelectedModelo((prevModelo) => ({
        ...prevModelo,
        nome: value,
      }));
    } else {
      setSelectedModelo((prevModelo) => {
        if (!prevModelo) return null;

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
      setPerguntas(updatedModelo.perguntas);
    }
  }, [modelos, selectedModelo?.id]);

  return (
    <>
      <Header />
      <div className="h-full bg-gray-200 ">
        <div className="bg-gray-custom h-48 p-5 w-full">
          <div className='w-full  lg:max-w-[80%] xl:max-w-[790px] md:max-w-[93%] mx-auto'>
            <button onClick={() => navigate('/homepage')} className='rounded bg-gray-secundary p-2 px-3 text-gray-custom text-xs mb-4'>Voltar</button>
            <h5 className='text-lg text-white'>Anamneses</h5>
          </div>
        </div>
        <div className='p-4'>
          <div className="bg-white-custom rounded-lg -mt-24 p-3  flex flex-col lg:max-w-[80%] xl:max-w-[790px] md:max-w-[93%] mx-auto">
            <div className="flex flex-col  justify-around gap-3 p-4 md:flex-row">
              <button
                onClick={() => setActiveView('modelos')}
                className={`w-full rounded p-3 text-sm shadow-lg ${activeView === 'modelos' ? 'bg-blue-custom text-white-custom' : 'bg-white text-blue-custom'
                  } transform, transition-all, duration-300`}
              >
                Modelos
              </button>
              <button
                onClick={() => setActiveView('pendentes')}
                className={`w-full rounded p-3 text-sm shadow-lg ${activeView === 'pendentes' ? 'bg-blue-custom text-white-custom' : 'bg-white text-blue-custom'
                  } transform, transition-all, duration-300`}
              >
                Pendentes
              </button>
              <button
                onClick={() => setActiveView('respondidas')}
                className={`w-full rounded p-3 text-sm shadow-lg ${activeView === 'respondidas' ? 'bg-blue-custom text-white-custom' : 'bg-white text-blue-custom'
                  } transform, transition-all, duration-300`}
              >
                Respondidas
              </button>
            </div>
            {activeView === 'modelos' && (
              <div className="flex justify-end p-2 my-5">
                <button onClick={() => navigate('/modelform')} className='bg-gray-custom rounded text-white-custom p-2 text-sm'>Criar Modelo</button>
              </div>
            )}
            {activeView === 'modelos' && (
              <ul>
                {modelos.map((modelo) => (
                  <div key={modelo.id} className="flex flex-row items-center justify-between my-4 border-b border-b-[rgba(128,128,128,0.17)] p-2 ">
                    <li className='flex flex-row'>
                      <i className="fa-regular fa-paper-plane mr-2 bg-blue-custom text-white-custom px-2 py-1 rounded text-xs"></i>
                      <p onClick={() => handleOpenModal(modelo)}>{modelo.nome}</p>
                    </li>
                    <li>
                      {modelo.id !== 1 && (
                        <button onClick={() => handleDelete(modelo.id)} className="ml-4">
                          <i className="fa-light fa-trash text-white-custom bg-red-600 px-2 py-1 rounded text-xs"></i>
                        </button>
                      )}
                    </li>
                  </div>
                ))}
              </ul>
            )}
            {activeView === 'pendentes' &&
              (pendentes.length === 0 ? (
                <h3 className='text-center text-gray-custom p-6'>Seus alunos não têm nenhuma anamnese pendente</h3>
              ) :


                <ul className='flex flex-col'>
                  {pendentes.map((anamnese) => (
                    <AnamnesesPendentes key={anamnese.id} anamnese={anamnese} />
                  ))}
                </ul>
              )}
            {activeView === 'respondidas' &&
              (respondidas.length === 0 ? (
                <h3 className='text-center text-gray-custom p-6'>Você ainda não tem nenhuma anamnese respondida</h3>
              ) : (
                <ul>
                  {respondidas.map((anamnese) => (
                    <AnamnesesRespondidas key={anamnese.id} anamnese={anamnese} />
                  ))}
                </ul>
              ))}
          </div>
        </div>
      </div >
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <div className=" bg-white-custom max-h-[80vh] p-4 overflow-auto rounded-lg flex flex-col">
            <div className='flex flex-row justify-between py-3 items-center '>
            <h3 className='text-gray-custom text-xl font-semibold'>{selectedModelo?.nome}</h3>
            <i class="fa-regular fa-x fa-xs text-gray-500" onClick={handleCloseModal}></i>
            </div>
            <div>
              <p className='mb-2 mt-6 text-gray-custom font-medium'>Nome da anamnese:</p>
              <div className='bg-gray-200 rounded-lg  min-h-14 flex items-center p-2'>
              {selectedModelo?.id === 1 ? (
                <p className='text-gray-700'>{selectedModelo?.nome}</p>
              ) : (
                <div>
                  <input
                  type="text"
                  name="nome"
                  className='bg-gray-200 text-gray-700'
                  value={selectedModelo?.nome || ''}
                  onChange={handleEditChange}
                />
                  </div>
              )}
              </div>
            </div>
            <div>
              <ul >
                {selectedModelo.perguntas.map((pergunta, index) => (
                  <li key={index} className='py-3'>
                    <p className='mb-2 text-gray-custom font-medium'>Pergunta:</p>
                    {selectedModelo?.id === 1 ?
                      <div className='bg-gray-200 rounded-lg  min-h-14 flex items-center p-2 '>
                        <p className='text-gray-700'>{pergunta.pergunta}</p>
                      </div>
                      :
                      <div className='flex w-full justify-between min-h-14'>
                       <div className='bg-gray-200 rounded-tl-lg rounded-bl-lg  min-h-14 flex items-center p-2 w-full '>
                       <input
                          type="text"
                          name={`pergunta_${pergunta.id}`}
                          value={pergunta.pergunta || ''}
                          className='bg-gray-200 text-gray-700 flex-1 '
                          onChange={(e) => handleEditChange(e, pergunta.id)} 
                          />
                         
                       </div>
                       <i onClick={() => handleRemoveQuestion(selectedModelo.id, pergunta.id)} className="fa-light fa-trash text-red-600 border
                           border-red-600 rounded-tr-lg rounded-br-lg  px-5 flex items-center"></i>
                      </div>
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
                        placeholder="Digite uma nova pergunta"
                        className="border p-2 rounded-lg mb-2 w-full min-h-14 mt-4 border-gray-300 focus:border-blue-custom  focus:outline-none"
                      />
                    </div>
                  )}
                  <button
                    onClick={handleAddQuestion}
                    className="mt-4 px-4 bg-blue-custom text-white p-2 rounded"
                  >
                    Adicionar Pergunta
                  </button>
                </div>
              </>
            )}
            {selectedModelo?.id !== 1 && (
              <button onClick={handleSaveChanges} className="mt-4 bg-gray-custom text-white p-2 rounded">
                Salvar
              </button>
            )}
          </div>
        </Modal>
      )
      }
    </>
  );
};
