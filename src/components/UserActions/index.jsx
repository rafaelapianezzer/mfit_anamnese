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
    <div className='flex justify-center max-w-2md  mx-11 rounded-lg'>
      <div className='bg-white rounded flex flex-col container p-5'>
        <div className=''>
          <div className='flex justify-between'>
            <h3>Alunos</h3>
            <button
              onClick={() => handleOpenModal(null)}
              className="text-white bg-gray-custom px-3 py-2 rounded"
            >
              + Aluno
            </button>
          </div>
          {studentsFilter.length > 0 ? (
            <div>
              <input
            type="text"
            placeholder="Procurar"
            className="my-4 p-2 border rounded w-full"
            value={filter}
            onChange={(ev) => setFilter(ev.target.value)}
          />
            <ul>
              {studentsFilter.map((student, index) => (
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


