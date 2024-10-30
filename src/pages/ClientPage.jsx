import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Modal } from '../components/Modal';
import { FormUserActions } from '../components/FormUserActions';



export const ClientPage = () => {
  const students = useSelector((state) => state.user.students);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const navigate = useNavigate();

  const handleHomePage = () => {
    navigate('/homepage');
  }

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
    <>
      <Header />
      <div className="bg-gray-custom h-48 p-5 ">
        <div className='max-w-screen-lg mx-auto '>
          <button onClick={handleHomePage} className='rounded bg-gray-secundary p-2 px-3 mb-4 text-gray-custom text-xs'>Voltar</button>
          <h5 className='text-white text-lg'>Seus Alunos</h5>
        </div>
      </div>
      <div className='bg-gray-100 h-full flex mx-auto justify-center relative'>
        <div className='bg-white p-4 rounded h-auto absolute w-11/12 mx-auto pb-8 z-10 -top-16 max-w-screen-lg'>
          <h3 className='text-gray-custom'>Alunos Ativos</h3>
          <input
            type="text"
            placeholder="Procurar"
            className="my-4 p-2 border rounded w-full shadow-sm focus:outline-none focus:shadow-md text-sm"
            value={filter}
            onChange={(ev) => setFilter(ev.target.value)}
          />
          <div className='flex justify'>
            <ul className='flex flex-col w-full'>
              {studentsFilter.map((student, index) => (
                <div className='flex justify-between mb-[1px] border-b border-b-[rgba(128,128,128,0.17)] p-4'>
                  <li key={index} className="flex items-center space-x-4 text-gray-custom ">
                    {student.nome} {student.sobrenome}
                    <button
                      onClick={() => handleOpenModal(student)}
                      className="text-blue-custom px-3 py-1 rounded ml-auto"
                    >
                      <i className='fa-regular fa-pencil'></i>
                    </button>
                  </li>
                  <div>
                    <button className='fa-brands fa-whatsapp text-green-700 text-lg p-1'></button>
                  </div>

                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <FormUserActions
            user={selectedUser}
            onClose={handleCloseModal}
            isEdit={!!selectedUser}
          />
        </Modal>
      )}
    </>
  )
}