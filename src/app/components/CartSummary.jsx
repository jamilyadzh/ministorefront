'use client';
import React from 'react';

export default function CartSummary({ cart = {}, onDecrement, onReset }) {
  const entries = Object.values(cart);
  const itemCount = entries.reduce((sum, e) => sum + e.qty, 0);
  const total = entries.reduce((sum, e) => sum + e.qty * e.product.price, 0);

  return (
    <div>
      <h3 className="font-semibold">Cart</h3>
      <p className="text-sm text-gray-600">Items: {itemCount}</p>
      <p className="text-sm text-gray-600">Total: ${total}</p>

      <div className="mt-3 space-x-2">
        {entries.length === 0 ? (
          <p className="text-xs text-gray-500">Cart is empty</p>
        ) : (
          <div>
            <ul className="space-y-1 text-sm">
              {entries.map(e => (
                <li
                  key={e.product.id}
                  className="flex justify-between items-center"
                >
                  <span>
                    {e.product.name} x {e.qty}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      className="text-xs px-2 py-1 bg-gray-200 rounded"
                      onClick={() => onDecrement(e.product.id)}
                    >
                      -
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-3 flex gap-2">
              <button
                className="px-3 py-1 bg-red-600 text-white rounded"
                onClick={onReset}
              >
                Reset Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
