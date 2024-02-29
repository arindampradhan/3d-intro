import { Link } from "react-router-dom";
import { IoArrowRedoSharp as Arrow } from "react-icons/io5";

// Props interface for Home Info
interface HomeInfoProps {
  currentStage: number;
}

const HomeInfo = ({ currentStage }: HomeInfoProps) => {
  if (currentStage === 1)
    return (
      <h1 className='sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5'>
        Hi, I'm
        <span className='font-semibold mx-2 text-white'>Arindam Pradhan</span>
        👋
        <br />
        A Software Engineer from India 🇮🇳
      </h1>
    );

  if (currentStage === 2) {
    return (
      <div className='info-box'>
        <p className='font-medium sm:text-xl text-center'>
          I'm passionate about building software and solving problems
        </p>

        <Link to='/about' className='neo-brutalism-white neo-btn'>
          Learn more
          <Arrow />
        </Link>
      </div>
    );
  }

  if (currentStage === 3) {
    return (
      <div className='info-box'>
        <p className='font-medium text-center sm:text-xl'>
          Led multiple projects to success over the years. <br /> Curious about the impact?
        </p>

        <Link to='https://github.com/arindampradhan/Resume/blob/master/PDF/ArindamPradhan.pdf' className='neo-brutalism-white neo-btn'>
          Visit my portfolio
          <Arrow />
        </Link>
      </div>
    );
  }

  if (currentStage === 4) {
    return (
      <div className='info-box'>
      <p className='font-medium sm:text-xl text-center'>
        Need a project done or looking for a dev? <br/> I'm just a few keystrokes away
      </p>

      <Link to='/contact' className='neo-brutalism-white neo-btn'>
        Let's talk
        <Arrow />
      </Link>
    </div>
    );
  }

  return null;
};

export default HomeInfo;