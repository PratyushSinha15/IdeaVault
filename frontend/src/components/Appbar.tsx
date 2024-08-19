import { Avatar } from './Blogcard';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdLogOut } from "react-icons/io";

const Appbar = () => {
  const navigate = useNavigate();

  const clickHandler = () => {
    if (localStorage.getItem('token')) {
      navigate('/blogs');
    }else{
        navigate('/signin');
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/signin');
  }

  

  return (
    <div className='border-b flex justify-between px-10 py-4'>
      <div onClick={clickHandler} className='flex flex-col justify-center  font-serif text-2xl font-semibold cursor-pointer'>
        IdeaVault
      </div>
      <div>
        <Avatar authorName={"P"} wsize={9} hsize={9} />
      </div>

    <div className='flex justify-center gap-20'>
        <Link to="/publish">
            <div className='flex border rounded-xl pr-2 pl-2 drop-shadow-sm shadow-sm flex-row text-sm font-semibold items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7 pr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                </svg>
                New
            </div>
        </Link>
        <div onClick={handleLogout} className='font-semibold cursor-pointer'>
            <IoMdLogOut className='size-8' />
        </div>
    </div>
      </div>
  );
};

export default Appbar;
