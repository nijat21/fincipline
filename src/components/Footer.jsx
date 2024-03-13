import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className='bg-white text-black  dark:text-slate-300 dark:bg-slate-900 h-16 text-center flex justify-between items-center relative shadow-sm'>
            <div className='w-1/4'>&copy; 2024 Fincipline </div>
            <div className='w-1/6 mr-14 flex justify-evenly items-center'>
                <i className="fa-brands fa-instagram fa-lg"></i>
                <i className="fa-brands fa-linkedin fa-lg"></i>
                <Link to='https://github.com/nijat21/phoenix_pages.git' target='_blank'>
                    <i className="fa-brands fa-github fa-lg"></i>
                </Link>
                <i className="fa-brands fa-facebook fa-lg"></i>
            </div>
        </footer>
    );
}

export default Footer;
