// Node 18+ has built-in fetch. Removing require.

// If node < 18, fetch might not be available. Assuming Node 18+ or I will use http module if fails. 
// For simplicity, I'll use standard http or just rely on global fetch if Node 18+ (User has modern env likely).

const output = [];
const log = (msg) => { console.log(msg); output.push(msg); };

async function runTests() {
    const baseUrl = 'http://localhost:5000/api';

    try {
        // 1. Test Health
        const health = await fetch('http://localhost:5000/').then(r => r.json());
        log(`Health Check: ${health.status}`);

        // 2. Test Login (Auth)
        const loginRes = await fetch(`${baseUrl}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'admin@shopnasi.com', password: 'hashed_secret' }) // Mock password
        });
        const loginData = await loginRes.json();
        log(`Login (Admin): ${loginRes.status} - ${loginData.message}`);

        // 3. Test Product Search (Fuzzy)
        const searchRes = await fetch(`${baseUrl}/products?q=monitor`); // "monitor"
        const searchData = await searchRes.json();
        log(`Product Search 'monitor': Found ${searchData.length} items.`);
        if (searchData.length > 0) log(` - First Item: ${searchData[0].name}`);

        // 4. Test Create Order
        const orderRes = await fetch(`${baseUrl}/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: 1, // Admin user
                totalAmount: 900,
                paymentMethod: 'credit_card',
                shippingAddress: { street: '123 Tech Blvd', city: 'Innovation City' },
                items: [
                    { productId: 1, quantity: 2, price: 450 } // 2 Monitors
                ]
            })
        });
        const orderData = await orderRes.json();
        log(`Create Order: ${orderRes.status} - ID: ${orderData.orderId}`);

    } catch (err) {
        log(`TEST FAILED: ${err.message}`);
    }
}

// Check if fetch exists (Node 18+)
if (!globalThis.fetch) {
    console.log("Fetch not found, please use Node 18+ or install node-fetch. Skipping tests.");
} else {
    runTests();
}
