import Navbar from "../components/Navbar";
import pe1 from "../assets/images/pe1.png"; // ✅ import the asset

export default function Projects() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <Navbar
        widthClass="max-w-3xl w-full"
        heightClass="h-[65vh]"
        active="Projects" // ✅ shows "Projects" in the menu field
      >
        <div className="flex items-center justify-center h-full">
          <img
            src={pe1} // ✅ use imported URL
            alt="Project artwork"
            className="max-h-full max-w-full object-contain"
          />
        </div>
      </Navbar>
    </div>
  );
}
