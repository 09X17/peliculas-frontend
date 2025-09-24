import { useState } from "react";
import GeneroList from "../components/GeneroList";
import GeneroForm from "../components/GeneroForm";

export default function GenerosPage() {
  const [reload, setReload] = useState(false);

  const handleAdd = () => setReload(!reload);

  return (
    <div>
      <GeneroForm onAdd={handleAdd} />
      <GeneroList key={reload} />
    </div>
  );
}
