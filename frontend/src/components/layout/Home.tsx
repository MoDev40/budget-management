import { FaGithub, FaList, FaMoneyBill, FaPlus, FaTrash } from "react-icons/fa6"
import NavBar from "./NavBar"
import { FaEdit, FaUndo } from "react-icons/fa"
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const features = [
  { icon: <FaMoneyBill className="text-blue-500" />, description: 'Create and manage your monthly budget' },
  { icon: <FaPlus className="text-blue-500" />, description: 'Add new transactions easily' },
  { icon: <FaEdit className="text-blue-500" />, description: 'Edit transactions with a few clicks' },
  { icon: <FaTrash className="text-blue-500" />, description: 'Delete transactions when needed' },
  { icon: <FaUndo className="text-blue-500" />, description: 'Cancel transactions if required' },
  { icon: <FaList className="text-blue-500" />, description: 'View all transactions at a glance' },
];

const Home = () => {
  return (
    <div className="w-full md:w-[1120px] md:mx-auto">
      <NavBar/>
      <div className=" min-h-screen flex flex-col justify-betwee ">
      {/* Hero Section */}
      <section className="  text-center py-16 md:py-20 lg:py-24">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Welcome to Your Budget Manager</h1>
        <p className="text-lg md:text-xl lg:text-2xl">Take control of your finances with our easy-to-use budget management app.</p>
        <Link to="/dashboard/configure">
        <Button variant="outline" className="text-blue-500 font-bold px-6 py-2 mt-4  transition duration-300">
          Get Started
        </Button>
        </Link>
      </section>

      {/* Key Features Section */}
      <section className="features-section bg-white py-12 md:py-16 lg:py-20">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 text-center">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col space-y-3 items-center justify-center p-6 border border-gray-200 rounded-md">
              {feature.icon}
              <p className="ml-2 capitalize">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-4 flex justify-center space-x-2 items-center">
        <p>&copy; 2024 Your Budget Manager</p>
        <Link to="https://github.com/MoDev40" target="_blank">
        <FaGithub size={30}/>
        </Link>
      </footer>
    </div>
    </div>
  )
}

export default Home
