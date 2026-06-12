import Head from 'next/head';
import Navbar from '../components/Navbar';
import { useStore } from '../context/StoreContext';
import Link from 'next/link';

export default function Cart() {
    const { cart, removeFromCart, addToCart } = useStore();

    const total = cart.reduce((sum, item) => sum + (item.price_retail * item.quantity), 0);

    return (
        <div style={{ background: 'rgb(var(--background-end-rgb))', minHeight: '100vh' }}>
            <Head>
                <title>Shopping Cart | Shopnasi</title>
            </Head>
            <Navbar />

            <div className="container" style={{ padding: '40px 24px', maxWidth: '800px' }}>
                <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '24px' }}>Shopping Cart</h1>

                {cart.length === 0 ? (
                    <div style={{ padding: '40px', background: 'white', borderRadius: 'var(--radius)', textAlign: 'center' }}>
                        <p style={{ fontSize: '18px', color: 'var(--secondary-color)', marginBottom: '16px' }}>Your cart is empty.</p>
                        <Link href="/shop" className="btn">Continue Shopping</Link>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gap: '24px' }}>
                        <div style={{ background: 'white', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
                            {cart.map(item => (
                                <div key={item.id} style={{ display: 'flex', gap: '16px', padding: '24px', borderBottom: '1px solid var(--border-color)' }}>
                                    <div style={{ width: '80px', height: '80px', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', overflow: 'hidden' }}>
                                        <img
                                            src={item.image_url || `https://placehold.co/80x80/f1f5f9/0f172a?text=${encodeURIComponent(item.name)}`}
                                            alt={item.name}
                                            style={{ width: '100%', height: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }}
                                        />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                            <h3 style={{ fontWeight: 600 }}>{item.name}</h3>
                                            <span style={{ fontWeight: 600 }}>KSh {(item.price_retail * item.quantity).toLocaleString()}</span>
                                        </div>
                                        <p style={{ color: 'var(--secondary-color)', fontSize: '14px', marginBottom: '12px' }}>Unit: KSh {item.price_retail.toLocaleString()}</p>

                                        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '4px 8px' }}>
                                                <button onClick={() => addToCart(item, -1)} disabled={item.quantity <= 1} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>-</button>
                                                <span style={{ fontSize: '14px' }}>{item.quantity}</span>
                                                <button onClick={() => addToCart(item, 1)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>+</button>
                                            </div>
                                            <button onClick={() => removeFromCart(item.id)} style={{ color: 'red', fontSize: '13px', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Remove</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div style={{ background: 'white', borderRadius: 'var(--radius)', padding: '24px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 600, marginBottom: '24px' }}>
                                <span>Total</span>
                                <span>KSh {total.toLocaleString()}</span>
                            </div>
                            <Link href="/checkout" className="btn" style={{ display: 'block', textAlign: 'center' }}>
                                Proceed to Checkout
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
