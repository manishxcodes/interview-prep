import { Card } from "../components/card";
import { movies } from "../movies";

export function Home() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4">
      {movies.map((m) => (
        <Card key={m.name} name={m.name} price={m.price} />
      ))}
    </div>
  );
}
