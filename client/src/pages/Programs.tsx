import { useEffect, useState } from "react";

interface Program {
  id: number;
  title: string;
  synopsis: string;
  poster: string;
  country: string;
  year: number;
}

function Programs() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await fetch("http://localhost:3311/api/programs");

        const textData = await response.text();

        try {
          const data = JSON.parse(textData);
          setPrograms(data);
        } catch (parseError) {
          console.error("Erreur de parsing JSON:", parseError);
          throw new Error("La réponse n'est pas au format JSON valide");
        }

        setIsLoading(false);
      } catch (err) {
        console.error("Erreur complète:", err);
        setError(
          err instanceof Error ? err.message : "Une erreur est survenue",
        );
        setIsLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  if (isLoading) {
    return <div>Chargement des programmes...</div>;
  }

  if (error) {
    return <div>Erreur lors du chargement : {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Séries TV</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {programs.map((program) => (
          <div
            key={program.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={program.poster}
              alt={program.title}
              className="w-full h-96 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{program.title}</h2>
              <p className="text-gray-600 mb-2">
                {program.country} - {program.year}
              </p>
              <p className="text-gray-700 line-clamp-3">{program.synopsis}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Programs;
