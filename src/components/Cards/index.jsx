import React, { useState, useEffect } from 'react';
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
    setSelectedStudent(null);
  };

  const handleCloseAnamnesesModal = () => {
    setAnamnesesModalOpen(false);
  };

  const handleSendAnamnese = () => {
    if (selectedStudent && selectedModel) {
      console.log(selectedModel)

      const model = models.find(m => m.id === selectedModel.value)
      const newAnamnese = {
        id: Date.now(),
        aluno: selectedStudent.label,
        nome: model.nome,
        status: 1,
        perguntas: model.perguntas
      };

      dispatch(addAnamnese(newAnamnese));
      handleCloseAnamnesesModal();

    }
  };

  useEffect(() => {
    if (isModalOpen) {
      if (students.length > 0) {
        navigate('/clientPage', { state: { students } });
        setModalOpen(false);
      } else {
        setModalOpen(true);
      }
    }
  }, [isModalOpen, students, navigate]);

  return (
    <>
      <div className='flex flex-col items-center' >
        <div className='flex justify-center'>
          <img src={banner} alt='gif MFIT Personal' className='px-4 py-1'></img>
        </div>
        <div className=' flex flex-row  py-30 justify-center gap-5 p-3 w-full  md:max-w-[93%] '>
          <div
            className='flex bg-white-custom p-5 rounded-lg cursor-pointer  min-w-xs max-w-sm w-full'
            onClick={() => handleOpenModal()}
          >
            <div className='flex flex-col justify-between w-full'>
              <div className='flex md:justify-end justify-center'>
                <div className='bg-blue-custom rounded-full w-12 h-12 flex items-center justify-center'>
                  <FontAwesomeIcon icon={faUsers} className="text-white" />
                </div>
              </div>
              <div className='text-left flex flex-col gap-1'>
                <h5 className="text-slate-500 text-sm">ALUNOS</h5>
                <p className='text-sm text-gray-custom'>{students.length}</p>
              </div>
            </div>
          </div>
          <div
            className='flex bg-white p-5 rounded-lg h-40  max-w-sm w-full min-w-xs '
            onClick={handleOpenAnamnesesModal}
          >
            <div className='flex flex-col justify-between w-full'>
              <div className='flex md:justify-end justify-center'>
                <div className='bg-blue-custom rounded-full w-12 h-12 flex items-center justify-center'>
                  <FontAwesomeIcon icon={faUsers} className="text-white" />
                </div>
              </div>
              <div className='text-left flex flex-col gap-1'>
                <h5 className='text-slate-500 text-sm'>ANAMNESES</h5>
                <p className='text-sm text-gray-custom'>{anamnesesList.length}</p>
              </div>
            </div>
          </div>
        </div>
        <div className='bg-white rounded-lg grid my-5 h-20 items-center px-4 sm:hidden relative z-0 w-11/12'>
          <div className='flex p-3 items-center absolute'>
            <div className=''>
              <img src={logoInsta} alt='logo do Instagram' className='max-w-xs max-h-12'></img>
            </div>
            <div className='p-4 '>
              <p className='text-gray-custom'>Siga a MFIT no Instagram</p>
              <p className='text-slate-500 text-sm'>E não perca nenhuma novidade</p>
            </div>
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
          <div className='flex flex-col p-6 bg-white-custom rounded'>
            <div className='flex justify-between items-center'>
              <h6 className='text-[18px] text-gray-custom '>Anamneses</h6>
              <button onClick={handleCloseAnamnesesModal} className='text-gray-300'>x</button>
            </div>
            <button
              onClick={() => navigate('/anamneses')}
              className='text-left px-10 py-5 rounded bg-gray-secundary my-5 text-sm text-gray-custom
             border border-transparent hover:border-gray-200 hover:bg-white hover:shadow-sm transition duration-100'
            >
              Ver todas as anamneses
            </button>
            <div className=''>
              <h3 className='text-gray-custom my-3'>Envie uma anamnese para um aluno</h3>
              <p className='text-gray-custom text-sm'>Anamnese</p>
              <Select
                value={selectedModel}
                onChange={(selectedOption) => setSelectedModel(selectedOption)}
                options={models?.map((model) => ({
                  value: model.id,
                  label: model.nome,
                }))}
                placeholder=''
                className='my-2 mb-8'
              />

              <p className='text-gray-custom text-sm'>Aluno</p>
              <Select
                value={selectedStudent}
                onChange={(selectedOption) => setSelectedStudent(selectedOption)}
                options={students.map((student) => ({
                  value: student.nome,
                  label: `${student.nome} ${student.sobrenome}`,
                }))}
                placeholder=''
                className='my-4 mb-8'
              />
            </div>
            <div className='flex gap-3'>
              <button
                className='text-white bg-gray-custom px-6 py-3 rounded text-sm shadow-lg'
                onClick={handleSendAnamnese}
              >
                Enviar
              </button>
              <button
                onClick={handleCloseAnamnesesModal}
                className='text-gray-custom bg-gray-secundary px-6 py-3 rounded text-sm shadow-lg'
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

