import HowItWorks from "./HowItWorks/HowItWorks";
import LatestFindLost from "./LatestFindLost/LatestFindLost";
import Slider from "./Slider/Slider";
import Testimonials from "./Testimonials/Testimonials";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <div className="bg-gray-50 dark:bg-slate-800 dark:text-white py-10">
      <Helmet>
        <title>Home | WhereIsIt</title>
      </Helmet>
      <Slider></Slider>
      <LatestFindLost></LatestFindLost>
      <HowItWorks></HowItWorks>
      <Testimonials></Testimonials>
    </div>
  );
};

export default Home;
