import { motion as m, AnimatePresence } from 'framer-motion';
import { container, item } from '../animations/animation.js';
import { v4 as uuidv4 } from 'uuid';
import NijatPhoto from '../../public/assets/NijatPhoto.jpeg';


function About() {
    const person = {
        name: 'Nijat Ismayilov',
        role: 'Web Developer',
        bio: 'MSc. in Management',
        linkedIn: 'https://www.linkedin.com/in/nijat-ismayilov',
        github: 'https://github.com/stars/nijat21/lists/fincipline',
        photo: NijatPhoto,
    };


    return (
        <AnimatePresence>
            <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className='w-screen h-screen flex items-center justify-center'
            >
                <div className='w-[90%] md:w-3/5  flex justify-center items-center border-2 border-transparent rounded-xl bg-slate-400 dark:bg-blue-900'>
                    <section className='flex flex-col px-12 py-16 items-center justify-center'>
                        <div className='flex flex-col items-center w-64 px-8'>
                            <img src={person.photo} alt='Nijat' className=' rounded-xl w-40 h-48 mb-4 object-cover grayscale-50' />
                            <h4 className='text-center font-bold my-2'>{person.name}</h4>
                            <p className='text-center'>{person.role}</p>
                            <p className='text-center'>{person.bio}</p>
                        </div>
                        <m.div className='flex flex-col items-center mt-4'
                            variants={container} initial='hidden' animate='show'>
                            <div className='overflow-hidden'>
                                <m.div variants={item} className='flex items-center w-40 justify-evenly'>
                                    <a
                                        href={person.linkedIn}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                    >
                                        <i className="fa-brands fa-linkedin fa-3x"></i>
                                    </a>
                                    <a
                                        href={person.github}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                    >
                                        <i className="fa-brands fa-square-github fa-3x"></i>
                                    </a>
                                </m.div>
                            </div>
                        </m.div>
                    </section>
                </div>
            </m.div>
        </AnimatePresence>
    );
}


export default About;
