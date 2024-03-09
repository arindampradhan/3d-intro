import { Link } from "react-router-dom";
import { IoArrowRedoSharp as Arrow } from "react-icons/io5";
import { motion } from "framer-motion";

const Animation: any = ({ children, ...rest }: React.PropsWithChildren<unknown>) => {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ rotate: 0, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      exit={{ opacity: 0, scale: 0 }}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

// Props interface for Home Info
interface HomeInfoProps {
  currentStage: number;
  key: string;
}

const HomeInfo = ({ currentStage, key }: HomeInfoProps) => {
  if (currentStage === 1)
    return (
      <Animation key={key}>
        <h1 className="sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5">
          Hi, I'm
          <span className="font-semibold mx-2 text-white">Arindam Pradhan</span>
          👋
          <br />A Software Engineer from India 🇮🇳
        </h1>
      </Animation>
    );

  if (currentStage === 2) {
    return (
      <Animation key={key} className="info-box">
        <p className="font-medium sm:text-xl text-center">
          I'm passionate about building software and solving problems
        </p>

        <Link
          target="_blank"
          to="https://medium.com/crazyhacker/about-me-3920d163a262"
          className="neo-brutalism-white neo-btn"
        >
          Learn more
          <Arrow />
        </Link>
      </Animation>
    );
  }

  if (currentStage === 3) {
    return (
      <Animation key={key} className="info-box">
        <p className="font-medium text-center sm:text-xl">
          Led multiple projects to success over the years. <br /> Curious about
          the impact?
        </p>

        <Link
          target="_blank"
          to="https://github.com/arindampradhan/Resume/blob/master/PDF/ArindamPradhan.pdf"
          className="neo-brutalism-white neo-btn"
        >
          Visit my portfolio
          <Arrow />
        </Link>
      </Animation>
    );
  }

  if (currentStage === 4) {
    return (
      <Animation key={key} className="info-box">
        <p className="font-medium sm:text-xl text-center">
          Need a project done or looking for a dev? <br /> I'm just a few
          keystrokes away
        </p>

        <Link
          target="_blank"
          to="mailto:arindampradhan@10.com"
          className="neo-brutalism-white neo-btn"
        >
          Let's talk
          <Arrow />
        </Link>
      </Animation>
    );
  }

  return null;
};

export default HomeInfo;
