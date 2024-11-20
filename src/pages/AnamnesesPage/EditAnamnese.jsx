import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { saveRespostas } from '../../store/anamneses/anamnesesReducer';
import { Header } from '../../components/Header';

const EditAnamnese = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anamnese, setAnamnese] = useState(null);
  const [respostas, setRespostas] = useState([]);
  const anamnesesList = useSelector((state) => state.anamneses.anamnesesList);

  useEffect(() => {
    const anamneseToEdit = anamnesesList.find((anamnese) => anamnese.id === parseInt(id));
    if (anamneseToEdit) {
      setAnamnese(anamneseToEdit);
      setRespostas(anamneseToEdit.perguntas.map((p) => ({ ...p, resposta: "" })));
    }
  }, [id, anamnesesList]);

  const handleRespostaChange = (index, value) => {
    setRespostas((prevRespostas) => {
      const newRespostas = [...prevRespostas];
      newRespostas[index].resposta = value;
      return newRespostas;
    });
  };

  const handleSave = () => {
    dispatch(saveRespostas({ id: anamnese.id, respostas }));
    navigate('/homepage');
  };

  if (!anamnese) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <Header />

      <div className="h-full bg-gray-200 ">
        <div className="bg-gray-custom h-48 p-5 w-full">
          <div className='w-full  lg:max-w-[80%] xl:max-w-[790px] md:max-w-[93%] mx-auto'>
            <button onClick={() => navigate('/homepage')} className='rounded bg-gray-secundary p-2 px-3 text-gray-custom text-xs mb-4'>Voltar</button>
            <h5 className='text-lg text-white-custom'>Editar anamnese</h5>
          </div>
        </div>
        <div className='p-4'>
          <div className="bg-white-custom rounded-lg -mt-24 p-3  flex flex-col lg:max-w-[80%] xl:max-w-[790px] md:max-w-[93%] mx-auto">
            <div className='flex  flex-col'>
              <div className='flex flex-row justify-between py-3 items-center'>
                <h3 className='text-gray-custom text-xl font-semibold'>{anamnese.aluno}</h3>
              </div>
              <ul>
                {anamnese.perguntas.map((pergunta, index) => (
                  <li key={index} className='py-3'>
                    <p className='mb-2 text-gray-custom font-medium'>{pergunta.pergunta}</p>
                    <div className='bg-gray-200 rounded-tl-lg rounded-lg  min-h-12 flex items-center p-2 w-full'>
                      <input
                        type="text"
                        value={respostas[index]?.resposta || ''}
                        className='bg-gray-200 text-gray-700 flex-1'
                        placeholder='Digite sua resposta'
                        onChange={(e) => handleRespostaChange(index, e.target.value)}
                      />
                    </div>
                  </li>
                ))}
              </ul>
              <button onClick={handleSave} className='bg-gray-custom text-white-custom p-3 rounded-lg my-6'>Salvar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAnamnese;
