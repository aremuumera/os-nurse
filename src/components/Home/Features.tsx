import { MdOutlineArrowOutward } from "react-icons/md";
import { Link } from 'react-router-dom';



const LandingPage = () => {
  const features = [
    {
      id: '01',
      img: '/oversabinurse/bl-2.svg',
      title: 'Application & Documentation',
      description: 'Tired of confusing paperwork and endless requirements? I\'ll help you navigate the application...',
      active: true
    },
    {
      id: '02',
      img: '/oversabinurse/broken-love.svg',
      title: 'Relocation Support',
      description: 'Moving to a new country is exciting but also challenging. From housing tips to cultural insights, I\'ll guide...'
    },
    {
      id: '03',
      img: '/oversabinurse/broken-love.svg',
      title: 'Lifestyle adjustments',
      description: 'A new country means new experiences! I\'ll help you adapt to work culture, build a social...'
    },
    {
      id: '04',
      img: '/oversabinurse/broken-love.svg',
      title: 'Consultations & Coaching',
      description: 'Have questions about your nursing career abroad? Book a one-on-one session with me and get expert...'
    },
    {
      id: '05',
      img: '/oversabinurse/broken-love.svg',
      title: 'Online Courses & E-books',
      description: 'Get step-by-step guides, expert insights, and proven strategies through my online courses and e-books...'
    },
    {
      id: '06',
      img: '/oversabinurse/broken-love.svg',
      title: 'Job Placement Assistance',
      description: 'Finding the right job abroad can be tough, but you don\'t have to do it alone. I connect nurses with top...'
    }
  ];

  return (
    <div className="h-full relative mt-4 ">
      {/* Features Grid */}
      <section className="px-4 py-12 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.id}
                className={`p-6 group rounded-lg ${
                  feature.active ? 'bg-[#961798]' : ''
                } transition-all hover:shadow-lg hover:bg-[#961798] `}
              >
                <div className="flex justify-between items-center gap-4 mb-4">
                  <img src={feature.img} alt='' className="text-2xl"/>
                  <span className={`text-[48px]  ${feature.active ? 'text-[#F4A8D0]' : 'text-[#FCEAF4]'} group-hover:text-[#F4A8D0]  font-semibold`}>{feature.id}</span>
                </div>
                <h3 className={`group-hover:text-white text-xl font-bold mb-2 ${feature.active ? 'text-white' : 'text-primary-'}` }>
                  {feature.title}
                </h3>
                <p className={` group-hover:text-white ${feature.active ? 'text-gray-300' : 'text-gray-600'}`}>
                  {feature.description}
                </p>
                {/* <Link to={'/'} className={`block w-fit border-primary-mainPink border-[1px] ${feature.active ? 'bg-white text-primary-mainPink border-primary-mainPink' : ''} mt-4 px-6 py-2 text-pink-500 bg-transparent hover:bg-pink-50 rounded-full transition flex items-center gap-2 rounded-full `}>
                  Explore More <MdOutlineArrowOutward />
                </Link> */}
              </div>
            ))}
          </div>
        </div>
      </section>

    
    </div>
  );
};

export default LandingPage;