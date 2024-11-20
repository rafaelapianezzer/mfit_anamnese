import React, { useState } from 'react';
import { FormUserActions } from '../FormUserActions';
import { useSelector } from 'react-redux';
import { Modal } from '../Modal';
import logoInsta from '../../assets/logoInsta.png';

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
    <div className='flex items-center flex-col px-3 bg-gray-200 gap-8 h-full min-h-screen '>
      <a
        href="https://www.instagram.com/mfitpersonal/"
        target="_blank"
        className="bg-white rounded-lg flex p-4 h-20 items-center sm:hidden z-10  w-full  -mt-16 "
      >
        <div className="flex p-3 items-center">
          <div className="">
            <img src={logoInsta} alt="logo do Instagram" className="max-w-xs max-h-11" />
          </div>
          <div className="p-4">
            <p className="text-gray-custom">Siga a MFIT no Instagram</p>
            <p className="text-slate-500 text-sm">E não perca nenhuma novidade</p>
          </div>
        </div>
      </a>

      <div className='bg-white-custom rounded-lg  lg:-mt-12 md:-mt-12 w-full  lg:max-w-[80%] xl:max-w-[790px] md:max-w-[93%] p-1'>
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
            <div className='flex flex-col items-center  p-3 gap-4  text-center'>
              <h3 className='text-purple-950'>Você não tem nenhum aluno ativo</h3>
              <p className='text-gray-custom pb-6'>Cadastre o seu primeiro aluno e comece a usar o app!</p>
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


