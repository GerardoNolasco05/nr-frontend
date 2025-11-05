import Navbar from "../components/Navbar";
import pe1 from "../assets/images/pe1.png"; // ✅ import the asset

export default function Projects() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <Navbar
        widthClass="max-w-2xl w-full"
        heightClass="h-[66vh]"
        active="Projects" // ✅ shows "Projects" in the menu field
      >
        <div className="flex items-center">
          <img
            src={pe1} // ✅ use imported URL
            alt="Project artwork"
            className="max-h-600 max-w-full object-contain ml-1 -mt-1"
          />
        </div>
      </Navbar>
    </div>
  );
}
