import Catalog from './components/Catalog';

export default function Page() {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold">Mini Storefront</h1>
          <p className="text-sm text-gray-600">
            Browse, filter, and add to cart — stock updates in real-time (simulated).
          </p>
        </header>

        <Catalog />
      </div>
    </main>
  );
}
