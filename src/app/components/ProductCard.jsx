'use client';

export default function ProductCard({ product, onAdd }) {
const { id, name, price, category, stock } = product;

return (
<div className="bg-white p-4 rounded-lg shadow flex flex-col justify-between">
<div>
<h3 className="font-semibold">{name}</h3>
<p className="text-xs text-gray-500">{category}</p>
<p className="mt-2 font-medium">${price}</p>
</div>

<div className="mt-4 flex items-center justify-between">
<div>
{stock > 0 ? (
<span className="text-sm text-green-600">In stock: {stock}</span>
) : (
<span className="text-sm text-red-600 font-semibold">Out of stock</span>
)}
</div>

<button
className={`px-3 py-1 rounded-md text-sm font-medium focus:outline-none ${stock > 0 ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
onClick={() => onAdd(id)}
disabled={stock <= 0}
>
Add
</button>
</div>
</div>
);
}