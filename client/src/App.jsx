import logo from './logo.svg';
import{Route,Routes,Navigate,BrowserRouter} from 'react-router-dom';

import './App.css';
import Milk from './components/milkprovider/Milk';
import News from './components/newsregister/Newsregister';
import Customer from './components/Customer/Customer';
import Cuslogin from './components/cuslogin/Cuslogin';
import Milkproviders from './components/milkproviders/Milkproviders';
import Home from './components/home/Home';
import CusUpadate from './components/cusupdate/CusUpadate'
import Cusrequest from './components/cusrequest/Cusrequest';
import Date from './components/Date/Date_Choose_milk'
import HomeForMilk from './components/HomeforMilk/HomeForMilk';
import Notmilk from './components/notdeliverymilk/Notmilk';
import Milkproupdate from './components/milkupdate/Milkproupdate';
import Monthlycard from './components/monthlycard/Monthlycard';
import Newsregister from './components/newsregister/Newsregister';
import { useEffect, useState } from 'react';
import NewsHome from './components/newshome/NewsHome';
import NewsUpdate from './components/newsupdate/NewsUpdate';
import Newsproviders from './components/newsproviders/Newsproviders';
import CusNewsrequest from './components/cusrequest/CusNewsrequest'
import NewsDelivery from './components/newsdelivery/Newsdelivery';
import Newscard from './components/monthlycard/Newscard';
import Date_Choose from './components/Date/Date_Choose_milk';
import Date_Choose_News from './components/Date/Date_Choose_News';
import Adminhome from './components/Admin/Adminhome';
import Forgotpass from './components/forgotpassword/Forgotpass';
import OTP from './components/forgotpassword/OTP';
import Changepass from './components/forgotpassword/Changepass';
function App() {
  const [user,setdata]=useState(JSON.parse(localStorage.getItem('user')));
  const [milk,setmilk] = useState();
  const [news,setnews] = useState();
  const [admin,setadmin] =useState();
  
  useEffect(()=>{
    setdata(JSON.parse(localStorage.getItem('user')));
    if(user){
    const milkprovider=JSON.parse(localStorage.getItem('user')).milk_provider_id?true:false;
    setmilk(milkprovider);
    const newsprovider=JSON.parse(localStorage.getItem('user')).news_provider_id?true:false;
    setnews(newsprovider);
    const admin=JSON.parse(localStorage.getItem('user')).username==="admin15"?true:false;
    setadmin(admin);
    }
  },[]);
    return ( 
    <div class= "App" >
        {/* <Cuslogin/> */}
        {/* <Milk/> */}
        {/* <News/> */}
        {/* <Customer/> */}
        <BrowserRouter>
      <Routes>
      
      
  
     {/* {milk && <Route  path="/" element={<Home/>} />} */}
       {milk && <Route path="/" element={<HomeForMilk/>}/>}
    {news && <Route path="/" element={<NewsHome/>}/>}
        {!user && <Route  path="/" element={<Cuslogin/>} />}
        {admin && <Route path='/' element={<Adminhome/>}/>}
        <Route path="/" element={<Home/>}/>
     <Route  path="/milkproviders" element={<Milkproviders/>} />
     <Route  path="/newsproviders" element={<Newsproviders/>} />
     <Route path="/profile" element={<CusUpadate/>}/>
     <Route path="/request" element={<Cusrequest/>}/>
     <Route path="/newsrequest" element={<CusNewsrequest/>}/>
     <Route path="/newsrequest" element={<CusNewsrequest/>}/>
     <Route path="/milkmanregister" element={<Milk/>}/>
     <Route path="/customerregister" element={<Customer/>}/>
     <Route path="/newsregister" element={<Newsregister/>}/>
    <Route path="/date" element={<Date/>}/>
    <Route path="/datenews" element={<Date_Choose_News/>}/>
    <Route path="/todaynotdelivery" element={<Notmilk/>}/>
  <Route path="/milkupdate" element={<Milkproupdate/>}/>
  <Route path="/newsupdate" element={<NewsUpdate/>}/>
  <Route path='/card' element={<Monthlycard/>}/>
  <Route path='/newscard' element={<Newscard/>}/>
  <Route path='/forgotpassword' element={<Forgotpass/>}/>
  <Route path='/todaynotdeliverynews' element={<NewsDelivery/>}/>
  <Route path='/otp' element={<OTP/>}/>
  <Route path="/changepass" element={<Changepass/>}/>
  
    </Routes>
    </BrowserRouter>
    </div>
    );
}

export default App;