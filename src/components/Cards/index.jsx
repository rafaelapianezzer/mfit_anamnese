import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logoInsta from '../../assets/logoInsta.png';
import banner from '../../assets/banner3.gif';
import { Modal } from '../Modal';
import { FormUserActions } from '../FormUserActions';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { addAnamnese } from '../../store/anamneses/anamnesesReducer';


export const Cards = () => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.user.students);
  const anamnesesList = useSelector((state) => state.anamneses.anamnesesList);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAnamnesesModalOpen, setAnamnesesModalOpen] = useState(false);
  const models = useSelector((state) => state.models?.modelos);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const navigate = useNavigate();


 

  const handleOpenModal = (user = null) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedUser(null);
  };

  const handleOpenAnamnesesModal = () => {
    setAnamnesesModalOpen(true);
    // setTestInput('TESTE');
    setSelectedStudent(null);
  };

  const handleCloseAnamnesesModal = () => {
    setAnamnesesModalOpen(false);
  };

  const handleSendAnamnese = () => {
    if (selectedStudent && selectedModel) {
      const newAnamnese = {
        id: Date.now(),
        aluno: selectedStudent.label,
        name: selectedModel.label,
        status: 1, 
        perguntas: selectedModel.perguntas
      };
  
      dispatch(addAnamnese(newAnamnese)); 
      handleCloseAnamnesesModal(); 
    
    }
  };
  

  const handleNavigate = () => {
    navigate('/anamneses');
  };

  const studentOptions = students.map(student => ({
    value: student.nome,
    label: `${student.nome} ${student.sobrenome}`
  }));


  const modelsOptions = models?.map((model) => ({
    value: model.id,
    label: model.nome
}));


  return (
    <>
     <div className='flex flex-col items-center' >
     <div className='flex justify-center'>
        <img src={banner} alt='gif MFIT Personal' className='px-4 py-1'></img>
      </div>

      <div className=' flex flex-row  py-30 justify-center gap-5 p-3  '>
        <span

          className='flex bg-white p-5 rounded-lg h-40 cursor-pointer  min-w-52'
          onClick={() => handleOpenModal()}
        >
          <div className='flex flex-col justify-between w-full'>
            <div className='flex justify-center'>
              <div className='bg-blue-custom rounded-full w-12 h-12 flex items-center justify-center'>
                <FontAwesomeIcon icon={faUsers} className="text-white" />
              </div>
            </div>

            <div className='text-left'>
              <h5 className="text-slate-500">ALUNOS</h5>
              <p className='text-sm'>{students.length}</p>
            </div>
          </div>
        </span>

        <span
          className='flex bg-white p-5 rounded-lg h-40 w-full max-w-xs md:max-w-sm lg:max-w-md min-w-52'
          onClick={handleOpenAnamnesesModal}
        >
          <div className='flex flex-col justify-between w-full'>
            <div className='flex justify-center'>
              <div className='bg-blue-custom rounded-full w-12 h-12 flex items-center justify-center'>
                <FontAwesomeIcon icon={faUsers} className="text-white" />
              </div>
            </div>
            <div className='text-left'>
              <h5 className='text-slate-500'>ANAMNESES</h5>
              <p className='text-sm'>{anamnesesList.length}</p>
            </div>
          </div>
        </span>
      </div>

      <div className='bg-white rounded-lg flex my-6 items-center px-4 block sm:hidden '>
        <div className=''>
          <img src={logoInsta} alt='logo do Instagram' className='max-w-xs max-h-12'></img>
        </div>
        <div className='p-4 '>
          <p className='text-purple-950'>Siga a MFIT no Instagram</p>
          <p className='text-slate-500'>E não perca nenhuma novidade</p>
        </div>
      </div>
     </div>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          {selectedUser ? (
            <FormUserActions
              user={selectedUser}
              onClose={handleCloseModal}
              isEdit={true}
            />
          ) : students.length > 0 ? (
            <div className=''>
              <div className="flex justify-between items-center">
                <button onClick={handleCloseModal}>Voltar</button>
                <h6>Seus Alunos</h6>
              </div>
              <div>
                <h3>Alunos Ativos</h3>
                <input type='text' placeholder='Procurar' className="my-4 p-2 border rounded w-full"></input>
                <ul>
                  {students.map((student, index) => (
                    <li key={index} className="flex items-center space-x-4">
                      {student.nome} {student.sobrenome}
                      <button
                        onClick={() => handleOpenModal(student)}
                        className="text-blue-custom px-3 py-1 rounded ml-auto"
                      >
                        <i className='fa-regular fa-pencil'></i>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <FormUserActions
              user={null}
              onClose={handleCloseModal}
              isEdit={false}
            />
          )}
        </Modal>
      )}

{isAnamnesesModalOpen && (
        <Modal isOpen={isAnamnesesModalOpen} onClose={handleCloseAnamnesesModal}>
          <div>
            <h6>Anamneses</h6>
            <button onClick={() => navigate('/anamneses')}>Ver todas as anamneses</button>
            <div className='p-5'>
              <h3>Envie uma anamnese para um aluno</h3>
              <p>Anamnese</p>
              <Select
                value={selectedModel}
                onChange={(selectedOption) => setSelectedModel(selectedOption)}
                options={models?.map((model) => ({
                  value: model.id,
                  label: model.nome,
                }))}
                className='my-4'
              />

              <p>Aluno</p>
              <Select
                value={selectedStudent}
                onChange={(selectedOption) => setSelectedStudent(selectedOption)}
                options={students.map((student) => ({
                  value: student.nome,
                  label: `${student.nome} ${student.sobrenome}`,
                }))}
                placeholder='Padrão'
                className='my-4'
              />
            </div>
            <div>
              <button
                className='text-gray-custom bg-gray-50 px-3 py-1 rounded'
                onClick={handleSendAnamnese}
              >
                Enviar
              </button>
              <button
                onClick={handleCloseAnamnesesModal}
                className='text-white bg-gray-custom px-3 py-1 rounded'
              >
                Fechar
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};