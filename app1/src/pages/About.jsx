import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
          <Title text1={'ABOUT'} text2={'US'}/>
      </div>

        <div className='my-10 flex flex-col md:flex-row gap-16'>
          <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex voluptatibus, a, reprehenderit sit harum dolorem similique iusto soluta nesciunt aspernatur explicabo sint veniam quia odit?</p>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero culpa nostrum officiis debitis non? Impedit rerum sunt illum incidunt iusto recusandae hic ex sint ducimus?</p>
              <b className='text-gray-800'>Our Mission</b>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil deleniti excepturi deserunt, sit totam adipisci, laboriosam temporibus, officiis debitis perferendis expedita nobis nam mollitia ullam!</p>
          </div>
        </div>
        <div className='text-xl py-4'>
            <Title text1={'WHY'} text2={'CHOOSE US'}/>
        </div>

        <div className='flex flex-col md:flex-row text-sm mb-20'>
            <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                <b>Quality Assurance:</b>
                <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod ipsa nam autem veniam eaque cumque. Mollitia repellat cumque soluta pariatur. Nam, voluptas. Sunt, reprehenderit quas.</p>
            </div>
            <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                <b>Convenience:</b>
                <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod ipsa nam autem veniam eaque cumque. Mollitia repellat cumque soluta pariatur. Nam, voluptas. Sunt, reprehenderit quas.</p>
            </div>
            <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                <b>Exceptional Customer Service:</b>
                <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod ipsa nam autem veniam eaque cumque. Mollitia repellat cumque soluta pariatur. Nam, voluptas. Sunt, reprehenderit quas.</p>
            </div>
        </div>

        <NewsLetterBox />
      
    </div>
  )
}

export default About
