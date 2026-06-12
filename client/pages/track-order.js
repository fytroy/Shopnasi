import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState } from 'react';

const STATUS_STEPS = ['pending', 'paid', 'shipped', 'delivered'];
const STATUS_LABELS = { pending: 'Order Placed', paid: 'Payment Confirmed', shipped: 'Shipped', delivered: 'Delivered' };

export default function TrackOrder() {
    const [orderId, setOrderId] = useState('');
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleTrack = async (e) => {
        e.preventDefault();
        const id = orderId.trim();
        if (!id) return;
        setLoading(true);
        setError('');
        setOrder(null);

        try {
            const res = await fetch(`/api/orders/${id}`);
            const data = await res.json();
            if (!res.ok) {
                setError(data.error || 'Order not found. Please check your order ID.');
            } else {
                setOrder(data);
            }
        } catch {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const currentStep = order ? STATUS_STEPS.indexOf(order.status) : -1;

    return (
        <div style={{ background: 'rgb(var(--background-end-rgb))', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Head>
                <title>Track Your Order | Shopnasi</title>
            </Head>
            <Navbar />

            <main className="container" style={{ padding: '60px 24px', flex: 1, maxWidth: '720px' }}>
                <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '8px' }}>Track Your Order</h1>
                <p style={{ color: 'var(--secondary-color)', marginBottom: '32px' }}>Enter your order ID to see the current status.</p>

                <form onSubmit={handleTrack} style={{ display: 'flex', gap: '12px', marginBottom: '40px' }}>
                    <input
                        type="number"
                        placeholder="Order ID (e.g. 1)"
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                        style={{ flex: 1, padding: '14px 20px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius)', fontSize: '16px' }}
                    />
                    <button type="submit" disabled={loading} className="btn" style={{ padding: '14px 28px', whiteSpace: 'nowrap' }}>
                        {loading ? 'Searching...' : 'Track Order'}
                    </button>
                </form>

                {error && (
                    <div style={{ padding: '16px', background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 'var(--radius)', color: '#dc2626', marginBottom: '24px' }}>
                        {error}
                    </div>
                )}

                {order && (
                    <div style={{ background: 'white', borderRadius: 'var(--radius)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
                        {/* Order Header */}
                        <div style={{ padding: '24px 32px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                            <div>
                                <p style={{ fontSize: '13px', color: 'var(--secondary-color)', marginBottom: '4px' }}>ORDER ID</p>
                                <p style={{ fontSize: '20px', fontWeight: 700 }}>#{order.id}</p>
                            </div>
                            <div>
                                <p style={{ fontSize: '13px', color: 'var(--secondary-color)', marginBottom: '4px' }}>PLACED ON</p>
                                <p style={{ fontWeight: 600 }}>{new Date(order.created_at).toLocaleDateString('en-KE', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                            </div>
                            <div>
                                <p style={{ fontSize: '13px', color: 'var(--secondary-color)', marginBottom: '4px' }}>TOTAL</p>
                                <p style={{ fontWeight: 700, fontSize: '18px' }}>KSh {order.total_amount?.toLocaleString()}</p>
                            </div>
                            <div>
                                <span style={{
                                    display: 'inline-block', padding: '6px 14px', borderRadius: '999px', fontSize: '13px', fontWeight: 700,
                                    background: order.status === 'delivered' ? '#dcfce7' : order.status === 'shipped' ? '#dbeafe' : order.status === 'paid' ? '#fef9c3' : '#f1f5f9',
                                    color: order.status === 'delivered' ? '#16a34a' : order.status === 'shipped' ? '#2563eb' : order.status === 'paid' ? '#ca8a04' : '#475569',
                                }}>
                                    {STATUS_LABELS[order.status] || order.status}
                                </span>
                            </div>
                        </div>

                        {/* Progress Tracker */}
                        <div style={{ padding: '32px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', marginBottom: '40px' }}>
                                {/* connector line */}
                                <div style={{ position: 'absolute', top: '16px', left: '16px', right: '16px', height: '2px', background: '#e2e8f0', zIndex: 0 }} />
                                <div style={{ position: 'absolute', top: '16px', left: '16px', height: '2px', background: 'var(--primary-color)', zIndex: 1, width: `${(currentStep / (STATUS_STEPS.length - 1)) * 100}%`, transition: 'width 0.5s' }} />

                                {STATUS_STEPS.map((step, idx) => {
                                    const done = idx <= currentStep;
                                    return (
                                        <div key={step} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 2, flex: 1 }}>
                                            <div style={{
                                                width: '32px', height: '32px', borderRadius: '50%',
                                                background: done ? 'var(--primary-color)' : 'white',
                                                border: `2px solid ${done ? 'var(--primary-color)' : '#e2e8f0'}`,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                color: done ? 'white' : '#94a3b8', fontWeight: 700, fontSize: '14px'
                                            }}>
                                                {done ? '✓' : idx + 1}
                                            </div>
                                            <span style={{ fontSize: '12px', fontWeight: done ? 600 : 400, color: done ? 'var(--primary-color)' : 'var(--secondary-color)', textAlign: 'center' }}>
                                                {STATUS_LABELS[step]}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Items */}
                            {order.items?.length > 0 && (
                                <div>
                                    <h3 style={{ fontWeight: 700, marginBottom: '16px', fontSize: '16px' }}>Items in this order</h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        {order.items.map(item => (
                                            <div key={item.id} style={{ display: 'flex', gap: '16px', alignItems: 'center', padding: '12px', background: '#f8fafc', borderRadius: '8px' }}>
                                                <div style={{ width: '48px', height: '48px', background: 'white', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
                                                    <img src={item.image_url || `https://placehold.co/48x48/f1f5f9/0f172a?text=P`} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                                </div>
                                                <div style={{ flex: 1 }}>
                                                    <p style={{ fontWeight: 600, marginBottom: '2px' }}>{item.name}</p>
                                                    <p style={{ fontSize: '13px', color: 'var(--secondary-color)' }}>Qty: {item.quantity}</p>
                                                </div>
                                                <span style={{ fontWeight: 600 }}>KSh {(item.price_at_purchase * item.quantity).toLocaleString()}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Shipping Address */}
                            {order.shipping_address?.address && (
                                <div style={{ marginTop: '24px', padding: '16px', background: '#f8fafc', borderRadius: '8px' }}>
                                    <p style={{ fontSize: '13px', color: 'var(--secondary-color)', marginBottom: '6px', fontWeight: 600 }}>SHIPPING TO</p>
                                    <p style={{ fontWeight: 500 }}>{order.shipping_address.address}, {order.shipping_address.city} {order.shipping_address.zip}</p>
                                    {order.shipping_address.email && <p style={{ fontSize: '13px', color: 'var(--secondary-color)' }}>{order.shipping_address.email}</p>}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
