import { Routes, Route } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { Anamneses } from '../pages/AnamnesesPage';
import { FormNewModel } from '../pages/formNewModel';
import {AnamnesesRespondidas} from '../components/Anamneses/AnamnesesRespondidas';
import { InitialLogin } from '../pages/loginPage/InitialLogin';


export const RoutesMain = () => {
    return (
        <Routes>
            <Route path='/login' element={<InitialLogin/>}/>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/anamneses' element={<Anamneses/>}/>
            <Route path='/modelform' element={<FormNewModel/>}/>
            <Route path='/anamnesesRespondidas' element={<AnamnesesRespondidas/>}/>

        </Routes>
    )
}
