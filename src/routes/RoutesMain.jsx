import { Routes, Route } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { Anamneses } from '../pages/AnamnesesPage';
import { FormNewModel } from '../pages/formNewModel';
import {AnamnesesRespondidas} from '../components/Anamneses/AnamnesesRespondidas';
import { InitialLogin } from '../pages/loginPage/InitialLogin';
import { ClientPage } from '../pages/ClientPage';
import { LogOut } from '../pages/LogOut';
import { NewUser } from '../pages/NewUser';
import EditAnamnese from '../pages/AnamnesesPage/EditAnamnese';



export const RoutesMain = () => {
    return (
        <Routes>
            <Route path='/' element={<InitialLogin/>}/>
            <Route path='/homepage' element={<HomePage/>}/>
            <Route path='/anamneses' element={<Anamneses/>}/>
            <Route path='/modelform' element={<FormNewModel/>}/>
            <Route path='/anamnesesRespondidas' element={<AnamnesesRespondidas/>}/>
            <Route path='/clientPage' element={<ClientPage/>}/>
            <Route path='/EditAnamnese/:id' element={<EditAnamnese />} />
            <Route path='/logout' element={<LogOut/>}/>
            <Route path='/newUser' element={<NewUser/>}/>
        </Routes>
    )
}
