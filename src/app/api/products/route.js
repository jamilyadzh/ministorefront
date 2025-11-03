export async function GET() {
const products = [
{ id: 'p1', name: 'Laptop Pro 14"', price: 1299, category: 'Electronics', stock: 5 },
{ id: 'p2', name: 'Wireless Mouse', price: 29, category: 'Electronics', stock: 12 },
{ id: 'p3', name: 'Phone XL', price: 899, category: 'Electronics', stock: 4 },
{ id: 'p4', name: 'Oak Desk', price: 450, category: 'Furniture', stock: 2 },
{ id: 'p5', name: 'Desk Chair', price: 150, category: 'Furniture', stock: 6 },
{ id: 'p6', name: 'Ceramic Vase', price: 45, category: 'Decor', stock: 8 },
{ id: 'p7', name: 'Wall Art Print', price: 60, category: 'Decor', stock: 10 },
{ id: 'p8', name: 'Coffee Table', price: 220, category: 'Furniture', stock: 3 },
{ id: 'p9', name: 'Headphones', price: 199, category: 'Electronics', stock: 7 },
{ id: 'p10', name: 'Throw Blanket', price: 35, category: 'Decor', stock: 9 },
{ id: 'p11', name: 'Standing Lamp', price: 80, category: 'Furniture', stock: 5 },
{ id: 'p12', name: 'Bluetooth Speaker', price: 120, category: 'Electronics', stock: 4 }
];

return new Response(JSON.stringify(products), {
status: 200,
headers: { 'Content-Type': 'application/json' }
});
}