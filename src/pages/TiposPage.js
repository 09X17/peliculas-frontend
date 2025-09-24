import TipoForm from "../components/TipoForm";
import TipoList from "../components/TipoList";

export default function TiposPage() {
  return (
    <div className="container mt-4">
      <TipoForm onAdd={() => window.location.reload()} />
      <TipoList />
    </div>
  );
}
