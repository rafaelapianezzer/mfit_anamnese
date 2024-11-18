import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ModeloPage = () => {
  const { id } = useParams(); // Pega o id do parâmetro da URL
  const [selectedModelo, setSelectedModelo] = useState(null); // Para armazenar o modelo selecionado
  const modelos = useSelector((state) => state.models.modelos); // Acessa os modelos do Redux
  const [perguntas, setPerguntas] = useState('');
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [novaPergunta, setNovaPergunta] = useState('');
  const anamnesesList = useSelector((state) => state.anamneses.anamnesesList);
  const pendentes = anamnesesList.filter((anamnese) => anamnese.status === 1);
  const respondidas = anamnesesList.filter((anamnese) => anamnese.status === 2);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Filtra o modelo que corresponde ao id da URL
  useEffect(() => {
    const modeloEncontrado = modelos.find((modelo) => modelo.id === id);
    if (modeloEncontrado) {
      setSelectedModelo(modeloEncontrado); // Atualiza o estado com o modelo encontrado
    }
  }, [id, modelos]);

  // Manipulação de edição das perguntas
  const handleEditChange = (e, perguntaId) => {
    const { value } = e.target;

    if (selectedModelo) {
      const updatedPerguntas = selectedModelo.perguntas.map((pergunta) =>
        pergunta.id === perguntaId ? { ...pergunta, pergunta: value } : pergunta
      );

      setSelectedModelo({
        ...selectedModelo,
        perguntas: updatedPerguntas,
      });
    }
  };

  // Caso o modelo não seja encontrado
  if (!selectedModelo) {
    return <div>Modelo não encontrado!</div>;
  }

  return (
    <div>
      <h1>{selectedModelo.nome}</h1>
      <ul>
        {selectedModelo.perguntas.map((pergunta) => (
          <li key={pergunta.id}>
            <p>{pergunta.pergunta}</p>
            <p>Resposta: {pergunta.resposta}</p>
            {/* Adicionando campo para editar a pergunta */}
            <input
              type="text"
              name="pergunta"
              value={pergunta.pergunta}
              onChange={(e) => handleEditChange(e, pergunta.id)}
            />
          </li>
        ))}
      </ul>
      {/* Botão para adicionar novas perguntas ou outro conteúdo */}
    </div>
  );
};

export default ModeloPage;
