import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Header } from '../../components/Header';
import { removeAnamnese } from '../../store/anamneses/anamnesesReducer';
import { useNavigate } from 'react-router-dom';
import { RenderForm } from '../../components/RenderForm';

export const Anamneses = () => {
  const [activeView, setActiveView] = useState('modelos');
  const [selectedForm, setSelectedForm] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const anamnesesList = useSelector((state) => state.anamneses.anamnesesList);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modelos = useSelector((state) => state.models.modelos);
  const pendentes = anamnesesList.filter((anamnese) => anamnese.status === 1);
  const respondidas = anamnesesList.filter((anamnese) => anamnese.status === 2)

  const handleRemoveAnamnese = (id) => {
    dispatch(removeAnamnese(id));
  };

  const handleOpenModal = (form) => {
    setSelectedForm(form);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedForm(null);
  };


  // const renderList = () => {
  //   if (activeView === 'modelos') {
  //     return (
  //       <>
  //        <ul>
  //         {models.map((model) => (
  //           <li key={model.id} className="flex justify-between">
  //             <button
  //               className="text-blue-500 hover:underline"
  //               onClick={() => handleOpenModal(model)}
  //             >
  //               {model.nome}
  //             </button>
  //           </li>
  //         ))}
  //       </ul>
  //       {isModalOpen && selectedForm && (
  //       <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
  //         <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-lg">
  //           <h2 className="text-xl font-bold mb-4">{selectedForm.nome}</h2>
  //           <form>
  //             <RenderForm />
  //             <button
  //               type="button"
  //               className="mt-4 bg-red-500 text-white p-2 rounded"
  //               onClick={handleCloseModal}
  //             >
  //               Fechar
  //             </button>
  //           </form>
  //         </div>
  //       </div>
  //     )}
  //       </>

  //     );
  //   }

  //   if (activeView === 'pendentes') {
  //     return (
  //       <ul>
  //         {pendentes.map((anamnese) => (
  //           <li key={anamnese.id} className="flex flex-col">
  //             <span>{anamnese.modelName}</span>
  //             <span>{anamnese.studentName}</span>
  //             <button onClick={() => navigate(`/editform/${anamnese.id}`)}>Editar</button>
  //             <button onClick={() => handleRemoveAnamnese(anamnese.id)}>Excluir</button>
  //           </li>
  //         ))}
  //       </ul>
  //     );
  //   }

  //   if (activeView === 'respondidas') {
  //     return (
  //       <div>
  //         <p>Você ainda não tem nenhuma anamnese respondida</p>
  //       </div>
  //     );
  //   }
  // };


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

          {
            activeView === "modelos" && <>
              <ul>
                {modelos.map((modelo) => (
                  <li key={modelo.id}>
                    <p>{modelo.nome}</p>
                  </li>
                ))}
                {/* map de modelos */}
                {/* map com os modelos  */}
                {/* <COmponente moldelo={modelo}/> */}
                {/* componente que ira receber uma variavel modelo como props, com o nome do modelo, que vai ser um botão, e vai ter um modal, com o controle do estado (show, setShow), dai dentro do modal tu vai fazer um map das perguntas */}
              </ul>
            </>
          }
          {
            activeView === "pendentes" && <>        
              <ul>
                {pendentes.map((anamnese) => (
                  <li key={anamnese.id} className="flex flex-col">
                    <span>{anamnese.name}</span>
                    <span>{anamnese.aluno}</span>
                    <button onClick={() => navigate(`/editform/${anamnese.id}`)}>Editar</button>
                    <button onClick={() => handleRemoveAnamnese(anamnese.id)}>Excluir</button>
                  </li>
                ))}
              </ul>
            </>
          }
          {
            activeView === "respondidas" && <>
              <h3>Você ainda não tem nenhuma anamnese respondida</h3>
            </>
          }
        </div>
      </div>
    </>
  );
};
