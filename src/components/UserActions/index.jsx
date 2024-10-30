import React, { useState } from 'react';
import { FormUserActions } from '../FormUserActions';
import { useSelector } from 'react-redux';
import { Modal } from '../Modal';


export const UserActions = () => {
  const students = useSelector((state) => state.user.students);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [filter, setFilter] = useState('');

  const handleOpenModal = (user) => {
    setSelectedUser(user || null);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedUser(null);
  };

  const studentsFilter = students.filter((student) =>
    student.nome.toLowerCase().includes(filter.toLowerCase()) ||
    student.sobrenome.toLowerCase().includes(filter.toLowerCase())
  );


  return (
    <div className='bg-gray-100 relative z-0  p-8 mt-20 w-screen  flex justify-center h-screen '>
      <div className='bg-white-custom rounded-lg z-10 absolute  w-[90%] lg:w-[768px] -mt-24 pb-6'>
        <div className='flex flex-col gap-4 p-5 w-full'>
          <div className='flex justify-between  '>
            <h3 className='text-gray-custom'>Alunos</h3>
            <button
              onClick={() => handleOpenModal(null)}
              className="text-white  bg-gray-custom px-5 shadow-lg py-2 rounded"
            >
              + Aluno
            </button>
          </div>
          {studentsFilter.length > 0 ? (
            <div>
              <input
            type="text"
            placeholder="Procurar"
            className="my-4 p-3 border rounded w-full shadow-sm focus:outline-none focus:shadow-md text-sm"
            value={filter}
            onChange={(ev) => setFilter(ev.target.value)}
          />
            <ul>
              {studentsFilter.map((student, index) => (
                <li key={index} className="flex items-center space-x-4 my-4 border-b border-b-[rgba(128,128,128,0.17)] p-2 py-4 text-gray-custom">
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
          ) : (
            <div className='flex flex-col items-center h-36 p-3 gap-4'>
              <h3 className='text-purple-950'>Você não tem nenhum aluno ativo</h3>
              <p className='text-gray-custom'>Cadastre o seu primeiro aluno e comece a usar o app!</p>
              <button onClick={() => handleOpenModal(null)} className='text-white bg-gray-custom px-3 py-3 rounded'>Cadastrar Aluno</button>
            </div>
          )}
          {isModalOpen && (
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
              <FormUserActions
                user={selectedUser}
                onClose={handleCloseModal}
                isEdit={!!selectedUser}
              />
            </Modal>
          )}
        </div>
    </div>
  </div>
  );
};


