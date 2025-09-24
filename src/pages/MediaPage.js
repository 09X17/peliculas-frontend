import MediaForm from "../components/MediaForm";
import MediaList from "../components/MediaList";

export default function MediaPage() {
  return (
    <div className="container mt-4">
      <MediaForm onAdd={() => window.location.reload()} />
      <MediaList />
    </div>
  );
}
