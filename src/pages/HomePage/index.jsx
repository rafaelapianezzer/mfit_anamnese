import { Header } from '../../components/Header';
import { UserActions } from '../../components/UserActions';
import { Cards } from '../../components/Cards';

export const HomePage = () => {
  return (
    <>
      <Header />
      <Cards />
      <UserActions />
    </>
  )
}