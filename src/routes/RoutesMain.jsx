import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { Anamneses } from '../pages/AnamnesesPage';
import { FormNewModel } from '../pages/formNewModel';
 

export const RoutesMain = () => {
    return (
        <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/anamneses' element={<Anamneses/>}/>
            <Route path='modelform' element={<FormNewModel/>}/>
        
        </Routes>
    )
}
