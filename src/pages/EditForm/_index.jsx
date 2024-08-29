
// import { useSelector, useDispatch } from 'react-redux';

// export const EditForm = ({ isOpen, onClose, onSave }) => {
//   if (!isOpen) return null;

//   const modelos = useSelector((state) => state.models.modelos);


//   const handleSubmit = () => {
//    // onSave(modelos);
//     onClose();
//   };

//   return (
//     <div className="modal">
      
//         {modelos.map((modelo) => (
//             <ul>
//             <li>
//                  <h3>{modelo.nome}</h3>
//             </li>
//                 <p>{modelo.perguntas.pergunta}</p>
//             <li>
//             </li>
//             </ul>
//         ))}
//         <div>
//         <p>Observações</p>
//         <input type='text'></input>
//         </div>
//         <button onClick={handleSubmit}>Salvar</button>
       
//     </div>

//   );
// };


