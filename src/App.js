import React, { useEffect } from 'react'
import './App.css';
import TopNav from './components/Header';
import Dashboard from './components/dashboard';
import { useDispatch, useSelector} from 'react-redux'
import { fetchAllData } from './Data';
import Loading from './components/Loading';

const App = () => {
  const dispatch = useDispatch();
  const {allTickets} = useSelector(state => state.DataReducer);
   
  useEffect(() => {
    dispatch(fetchAllData());
  }, [dispatch])

  return allTickets ? (
    <div  >
      <TopNav/>
      <Dashboard/>
    </div>
  ) : <Loading/>
}

export default App