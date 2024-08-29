import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import {addUser, deleteUser} from "../../store/user/userReducer";

export const FormUserActions = ({ user, onClose, isEdit }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      nome: user?.nome || '',
      sobrenome: user?.sobrenome || '',
      email: user?.email || '',
      nascimento: user?.nascimento || '',
      whatsapp: user?.whatsapp || '',
      sexo: user?.sexo || '',
    },
    validationSchema: Yup.object({
      nome: Yup.string().required('Preencha este campo.'),
      sobrenome: Yup.string().required('Preencha este campo.'),
      email: Yup.string().email('Email inválido').required('Preencha este campo.'),
      nascimento: Yup.date().nullable(),
      whatsapp: Yup.string().required('Preencha este campo.'),
      sexo: Yup.string().required('Preencha este campo.'),
    }),
    onSubmit: (values) => {
      dispatch(addUser(values));
      onClose();
    }
  });

  const handleDelete = () => {
    if (user?.email) {
      dispatch(deleteUser(user.email));
      onClose()
    }
  };

  return (
    <div className="fixed inset-0 flex items-center flex-col justify-center">
      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <div className='flex flex-row justify-between w-full mb-4'>
        <h5>{isEdit ? 'Editar Aluno' : 'Novo Aluno'}</h5>
        <button onClick={onClose} className="text-red-500">X</button>
      </div>

      {isEdit && (
        <div className='flex w-full justify-end'>
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 text-red-700 p-2 rounded"
          >
            Excluir
          </button>
        </div>
      )}
        <div className="mb-4">
          <label htmlFor="nome" className="block text-gray-700">Nome:</label>
          <input
            id="nome"
            name="nome"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.nome}
            className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring"
          />
          {formik.touched.nome && formik.errors.nome ? (
            <div className="text-red-500 text-sm">{formik.errors.nome}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label htmlFor="sobrenome" className="block text-gray-700">Sobrenome:</label>
          <input
            id="sobrenome"
            name="sobrenome"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.sobrenome}
            className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring"
          />
          {formik.touched.sobrenome && formik.errors.sobrenome ? (
            <div className="text-red-500 text-sm">{formik.errors.sobrenome}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email:</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label htmlFor="nascimento" className="block text-gray-700">Nascimento (dd/mm/yyyy):</label>
          <input
            id="nascimento"
            name="nascimento"
            type="date"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.nascimento}
            className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring"
          />
          {formik.touched.nascimento && formik.errors.nascimento ? (
            <div className="text-red-500 text-sm">{formik.errors.nascimento}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label htmlFor="whatsapp" className="block text-gray-700">WhatsApp:</label>
          <input
            id="whatsapp"
            name="whatsapp"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.whatsapp}
            className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring"
          />
          {formik.touched.whatsapp && formik.errors.whatsapp ? (
            <div className="text-red-500 text-sm">{formik.errors.whatsapp}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Sexo:</label>
          <div className="flex items-center">
            <input
              id="masculino"
              name="sexo"
              type="radio"
              value="Masculino"
              onChange={formik.handleChange}
              className="mr-2"
              checked={formik.values.sexo === 'Masculino'}
            />
            <label htmlFor="masculino" className="mr-4">Masculino</label>
            <input
              id="feminino"
              name="sexo"
              type="radio"
              value="Feminino"
              onChange={formik.handleChange}
              className="mr-2"
              checked={formik.values.sexo === 'Feminino'}
            />
            <label htmlFor="feminino">Feminino</label>
          </div>
          {formik.touched.sexo && formik.errors.sexo ? (
            <div className="text-red-500 text-sm">{formik.errors.sexo}</div>
          ) : null}
        </div>

        <button type="submit" className="w-full bg-blue-500 p-2 rounded hover:bg-blue-700">
          Salvar
        </button>
        <button onClick={onClose}>
          Fechar
        </button>
      </form>
    </div>
  );
};
