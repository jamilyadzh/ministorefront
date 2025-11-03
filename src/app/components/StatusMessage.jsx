'use client';
import React from 'react';

export default function StatusMessage({ loading, error, items }) {
  if (loading) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        <p>⚠️ Error: {error}</p>
      </div>
    );
  }

  if (items && items.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        <p>No products found for your filters.</p>
      </div>
    );
  }

  return null; // nothing to show (normal loaded state)
}
