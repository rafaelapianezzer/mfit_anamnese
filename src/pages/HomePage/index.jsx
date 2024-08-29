import { Header } from '../../components/Header';
import { UserActions } from '../../components/UserActions';
import { Cards } from '../../components/Cards';





export const HomePage = () => {
    return (
        <>
        <Header />
     <main className="bg-gray-custom min-h-screen w-full flex flex-col items-center">
       <section className="container mx-auto ">
         <div>
           <Cards />
         </div>
         <div>
           <UserActions />
         </div>
       </section>
     </main>
       </>
    )
}