import Head from 'next/head';
import Navbar from '../components/Navbar';
import { useState } from 'react';

export default function Checkout() {
    const [formData, setFormData] = useState({
        email: '',
        address: '',
        city: '',
        zip: '',
        card: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Basic client-side validation
        if (!formData.email.includes('@')) {
            setError("Please enter a valid email address.");
            setLoading(false);
            return;
        }

        // Mock API call
        try {
            const res = await fetch('http://localhost:5000/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: 3, // Guest/Consumer ID
                    totalAmount: 450, // Mock total
                    paymentMethod: 'credit_card',
                    shippingAddress: { ...formData },
                    items: [{ productId: 1, quantity: 1, price: 450 }]
                })
            });
            const data = await res.json();
            if (res.ok) {
                setSuccess(true);
            } else {
                setError(data.error || 'Checkout failed');
            }
        } catch (err) {
            setError('Network error, please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    if (success) return (
        <div style={{ textAlign: 'center', padding: '100px' }}>
            <Navbar />
            <div className="container">
                <h1 style={{ color: 'green', marginBottom: '24px' }}>Order Confirmed!</h1>
                <p>Thank you for your purchase. A confirmation email has been sent.</p>
            </div>
        </div>
    );

    return (
        <div style={{ background: 'var(--background-end-rgb)', minHeight: '100vh' }}>
            <Head>
                <title>Checkout | Shopnasi</title>
            </Head>
            <Navbar />

            <main className="container" style={{ padding: '60px 24px', maxWidth: '800px' }}>
                <h1 style={{ fontSize: '32px', marginBottom: '32px' }}>Secure Checkout</h1>

                <div style={{ background: 'white', padding: '40px', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-sm)' }}>
                    <form onSubmit={handleSubmit}>
                        <h3 style={{ marginBottom: '24px', fontSize: '18px' }}>Shipping Information</h3>

                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>Email Address</label>
                            <input name="email" type="email" required value={formData.email} onChange={handleChange}
                                style={{ width: '100%', padding: '12px', border: '1px solid var(--border-color)', borderRadius: '6px' }} />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px', marginBottom: '16px' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>Address</label>
                                <input name="address" required value={formData.address} onChange={handleChange}
                                    style={{ width: '100%', padding: '12px', border: '1px solid var(--border-color)', borderRadius: '6px' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>ZIP Code</label>
                                <input name="zip" required value={formData.zip} onChange={handleChange}
                                    style={{ width: '100%', padding: '12px', border: '1px solid var(--border-color)', borderRadius: '6px' }} />
                            </div>
                        </div>

                        <div style={{ marginBottom: '32px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>City</label>
                            <input name="city" required value={formData.city} onChange={handleChange}
                                style={{ width: '100%', padding: '12px', border: '1px solid var(--border-color)', borderRadius: '6px' }} />
                        </div>

                        <h3 style={{ marginBottom: '24px', fontSize: '18px' }}>Payment Details</h3>
                        <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '6px', border: '1px solid var(--border-color)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '20px', height: '20px', background: 'green', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '12px' }}>✓</div>
                            <span style={{ fontSize: '14px', fontWeight: 500 }}>Secure SSL Connection</span>
                        </div>

                        {error && <div style={{ color: 'red', marginBottom: '16px' }}>{error}</div>}

                        <button type="submit" disabled={loading} className="btn" style={{ width: '100%', padding: '16px' }}>
                            {loading ? 'Processing...' : 'Place Order'}
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}
