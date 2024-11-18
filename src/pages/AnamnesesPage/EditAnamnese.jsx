import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { editAnamnese } from '../../store/anamneses/anamnesesReducer';
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
    dispatch(editAnamnese({ id: anamnese.id, respostas }));
    navigate('/homepage');
  };

  if (!anamnese) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <Header />
      <div className="h-screen bg-gray-200 ">
        <div className="bg-gray-custom h-48 p-5 w-full">
          <div className='w-full  lg:max-w-[80%] xl:max-w-[790px] md:max-w-[93%] mx-auto'>
            <button onClick={() => navigate('/homepage')} className='rounded bg-gray-secundary p-2 px-3 text-gray-custom text-xs mb-4'>Voltar</button>
            <h5 className='text-lg text-white'>Editar anamnese</h5>
          </div>
        </div>
        <div className='p-4'>
          <div className="bg-white-custom rounded-lg -mt-24 p-3  flex flex-col lg:max-w-[80%] xl:max-w-[790px] md:max-w-[93%] mx-auto">
            <form>
              <h3 className='text-gray-custom text-lg'>{anamnese.nome}</h3>
              <ul>
                {anamnese.perguntas.map((pergunta, index) => (
                  <li key={index}>
                    <p>{pergunta.pergunta}</p>
                    <input
                      type="text"
                      value={respostas[index]?.resposta || ''}
                      onChange={(e) => handleRespostaChange(index, e.target.value)}
                    />
                  </li>
                ))}
              </ul>
              <button onClick={handleSave}>Salvar</button>
            </form>
          </div>
        </div>
      </div>









    </div>
  );
};

export default EditAnamnese;
