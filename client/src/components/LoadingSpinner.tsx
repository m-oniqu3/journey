import { SolarSystemIcon } from "@/components/icons";

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-32">
      <SolarSystemIcon className="animate-spin h-9 w-9 text-accent" />
    </div>
  );
}

export default LoadingSpinner;
