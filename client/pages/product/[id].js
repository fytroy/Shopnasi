import Head from 'next/head';
import Navbar from '../../components/Navbar';
import ProductCard from '../../components/ProductCard';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';

import { useStore } from '../../context/StoreContext';

export default function ProductDetails() {
    const router = useRouter();
    const { id } = router.query;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart, toggleWishlist, wishlist } = useStore();
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        fetch(`/api/products/${id}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
                setLoading(false);

                // Fetch related products based on category
                if (data && data.category) {
                    fetch(`/api/products?category=${data.category}`)
                        .then(res => res.json())
                        .then(related => {
                            // Filter out current product and limit to 4
                            const filtered = related.filter(p => p.id !== data.id).slice(0, 4);
                            setRelatedProducts(filtered);
                        });
                }
            })
            .catch(err => setLoading(false));
    }, [id]);

    if (loading || !product) return (
        <div style={{ padding: '80px', textAlign: 'center' }}>Loading details...</div>
    );

    const isWishlisted = wishlist.some(item => item.id === product.id);

    const handleBuyNow = () => {
        addToCart(product);
        router.push('/checkout');
    };

    return (
        <div style={{ background: 'white', minHeight: '100vh' }}>
            <Head>
                <title>{product.name} | Shopnasi</title>
            </Head>
            <Navbar />

            <main className="container" style={{ padding: '60px 24px' }}>
                <div style={{ display: 'flex', gap: '60px', alignItems: 'flex-start', marginBottom: '80px' }}>
                    {/* Large Product Image (Left) */}
                    <div style={{ flex: 1, background: '#f8fafc', padding: '60px', borderRadius: 'var(--radius)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img
                            src={product.image_url || `https://placehold.co/600x600/f1f5f9/0f172a?text=${product.name}`}
                            alt={product.name}
                            style={{ maxWidth: '100%', mixBlendMode: 'multiply' }}
                        />
                    </div>

                    {/* Product Info (Right) */}
                    <div style={{ flex: 1, paddingTop: '40px' }}>
                        <div style={{ fontSize: '14px', color: 'var(--secondary-color)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>
                            {product.category}
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                            <h1 style={{ fontSize: '40px', fontWeight: 800, letterSpacing: '-0.5px', margin: 0 }}>
                                {product.name}
                            </h1>
                            <button
                                onClick={() => toggleWishlist(product)}
                                style={{
                                    background: 'none', border: '1px solid var(--border-color)',
                                    borderRadius: '50%', width: '48px', height: '48px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '24px', cursor: 'pointer',
                                    color: isWishlisted ? 'red' : 'inherit'
                                }}
                                title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                            >
                                {isWishlisted ? '♥' : '♡'}
                            </button>
                        </div>

                        <p style={{ fontSize: '24px', color: 'var(--primary-color)', fontWeight: 600, marginBottom: '32px' }}>
                            KSh {product.price_retail ? product.price_retail.toLocaleString() : product.price_retail}
                        </p>

                        <p style={{ fontSize: '18px', color: 'var(--secondary-color)', lineHeight: '1.8', marginBottom: '40px' }}>
                            {product.description}
                        </p>

                        {/* Attributes / Specs */}
                        <div style={{ marginBottom: '40px' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>Technical Specifications</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                {Object.entries(product.attributes || {}).map(([key, value]) => (
                                    <div key={key} style={{ padding: '12px', background: '#f8fafc', borderRadius: '6px' }}>
                                        <span style={{ display: 'block', fontSize: '12px', color: 'var(--secondary-color)', textTransform: 'uppercase' }}>{key}</span>
                                        <span style={{ fontWeight: 500 }}>{value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div style={{ display: 'flex', gap: '16px' }}>
                            <button
                                onClick={() => addToCart(product)}
                                className="btn"
                                style={{ flex: 1, padding: '16px', fontSize: '16px' }}
                            >
                                Add to Cart
                            </button>
                            <button
                                onClick={handleBuyNow}
                                className="btn btn-secondary"
                                style={{ padding: '16px 32px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                            >
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>

                {/* Related Products Section */}
                {relatedProducts.length > 0 && (
                    <section style={{ borderTop: '1px solid var(--border-color)', paddingTop: '60px' }}>
                        <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '32px' }}>Related Products</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '24px' }}>
                            {relatedProducts.map(p => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
}
