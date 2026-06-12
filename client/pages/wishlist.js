import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import Link from 'next/link';
import { useStore } from '../context/StoreContext';

export default function Wishlist() {
    const { wishlist, toggleWishlist } = useStore();

    return (
        <div style={{ background: 'rgb(var(--background-end-rgb))', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Head>
                <title>Wishlist | Shopnasi</title>
            </Head>
            <Navbar />

            <main className="container" style={{ padding: '40px 24px', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                    <h1 style={{ fontSize: '32px', fontWeight: 800 }}>
                        My Wishlist <span style={{ fontSize: '18px', fontWeight: 400, color: 'var(--secondary-color)' }}>({wishlist.length})</span>
                    </h1>
                    {wishlist.length > 0 && (
                        <Link href="/shop" style={{ color: 'var(--accent-color)', fontWeight: 500 }}>
                            Continue Shopping →
                        </Link>
                    )}
                </div>

                {wishlist.length === 0 ? (
                    <div style={{ padding: '60px', background: 'white', borderRadius: 'var(--radius)', textAlign: 'center' }}>
                        <div style={{ fontSize: '48px', marginBottom: '16px' }}>♡</div>
                        <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '12px' }}>Your wishlist is empty</h2>
                        <p style={{ color: 'var(--secondary-color)', marginBottom: '24px' }}>
                            Save items you love by clicking the heart icon on any product.
                        </p>
                        <Link href="/shop" className="btn">Explore Products</Link>
                    </div>
                ) : (
                    <>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px', marginBottom: '32px' }}>
                            {wishlist.map(product => (
                                <div key={product.id} style={{ position: 'relative' }}>
                                    <button
                                        onClick={() => toggleWishlist(product)}
                                        style={{
                                            position: 'absolute', top: '12px', right: '12px', zIndex: 10,
                                            background: 'white', border: '1px solid var(--border-color)',
                                            borderRadius: '50%', width: '36px', height: '36px',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            cursor: 'pointer', fontSize: '18px', color: 'red',
                                            boxShadow: 'var(--shadow-sm)'
                                        }}
                                        title="Remove from Wishlist"
                                    >
                                        ♥
                                    </button>
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </main>

            <Footer />
        </div>
    );
}
