import DirectorForm from "../components/DirectorForm";
import DirectorList from "../components/DirectorList";

export default function DirectoresPage() {
  return (
    <div className="container mt-4">
      <DirectorForm onAdd={() => window.location.reload()} />
      <DirectorList />
    </div>
  );
}
