import ProductoraForm from "../components/ProductoraForm";
import ProductoraList from "../components/ProductoraList";

export default function ProductorasPage() {
  return (
    <div className="container mt-4">
      <ProductoraForm onAdd={() => window.location.reload()} />
      <ProductoraList />
    </div>
  );
}
