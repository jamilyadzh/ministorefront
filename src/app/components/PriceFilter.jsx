'use client';
import React from 'react';

export default function PriceFilter({ value, onChange }) {
return (
<div className="mb-4">
<label className="block text-sm font-medium mb-1">Price</label>
<select
className="w-full border rounded p-2"
value={value}
onChange={e => onChange(e.target.value)}
>
<option value="All">All</option>
<option value="Under50">Under $50</option>
<option value="Under200">Under $200</option>
<option value="Under500">Under $500</option>
</select>
</div>
);
}