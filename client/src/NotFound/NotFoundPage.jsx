import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-emerald-900">404</h1>

        <h2 className="mt-4 text-2xl font-semibold text-gray-800">
          Página no encontrada
        </h2>

        <p className="mt-2 text-gray-500">
          La página que estás buscando no existe o fue movida.
        </p>

        <Link
          to="/"
          className="inline-block mt-6 px-6 py-3 bg-emerald-800 text-white rounded-lg hover:bg-emerald-900 transition"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
