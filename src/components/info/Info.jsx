
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'

export default function Info() {
    return (
        <div className="hidden w-[170px] h-[170px] rounded-full border-[1px] border-orange-400 fixed bottom-[20px] left-[40px] lg:flex items-center justify-center select-none z-50 group">
            <div className="circle w-[165px] h-[165px] rounded-full">
                <img src='https://avatars.githubusercontent.com/u/139154451?v=4' alt="myPicture" className="w-full h-full rounded-full object-cover" />
            </div>
            <strong className="absolute top-[45%] right-[-87px] -rotate-[90deg] text-[15px] italic text-black">Frontend
                Developer</strong>
            <a href="https://www.linkedin.com/in/mahsa-sahraei?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">
                <FaLinkedin className="group-hover:visible text-[88px] text-white absolute invisible transition-all duration-150 py-[5px] px-[30px] hover:opacity-900 top-[-30px] right-[-53px]" />
            </a>
            <a href="https://www.instagram.com/mahsacodes?igsh=b3o4NXE4d25tYmli">
                <FaInstagram className="group-hover:visible text-[88px] absolute invisible transition-all duration-150 py-[5px] px-[30px] hover:opacity-900 text-white top-[20px] right-[-70px]" />
            </a>
            <a href="https://github.com/mahsasa71">
                <FaGithub className="group-hover:visible text-[88px] absolute invisible transition-all duration-150 py-[5px] px-[30px] hover:opacity-900 text-white top-[70px] right-[-70px]" />
            </a>
            <a href="mailto:sahraee.mse@gmail.com">
                <MdEmail className="group-hover:visible text-[88px] absolute invisible transition-all duration-150 py-[5px] px-[30px] hover:opacity-900 text-white top-[110px] right-[-48px]" />
            </a>
        </div>
    )
}