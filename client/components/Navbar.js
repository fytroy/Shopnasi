import Link from 'next/link';
import { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { useRouter } from 'next/router';

export default function Navbar() {
    const { cart, cartCount, wishlistCount } = useStore();
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');

    const cartTotal = useMemo(() => {
        return cart.reduce((total, item) => total + (item.price_retail * item.quantity), 0);
    }, [cart]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/shop?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <header>
            {/* Top Bar - Contact Info */}
            <div style={{ background: '#1e293b', color: 'white', padding: '8px 0', fontSize: '13px', textAlign: 'right' }}>
                <div className="container">
                    Call us on <span style={{ fontWeight: 700 }}>+254705762775</span> to place your order.
                </div>
            </div>

            {/* Main Navbar */}
            <nav className="glass-header" style={{ position: 'sticky', top: 0, zIndex: 100, borderBottom: '1px solid var(--border-color)', background: 'rgba(255, 255, 255, 0.95)' }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '80px', gap: '40px' }}>
                    {/* Logo */}
                    <Link href="/" style={{ fontSize: '28px', fontWeight: '900', fontStyle: 'italic', letterSpacing: '-1px', display: 'flex', alignItems: 'center' }}>
                        SHOPNASI
                    </Link>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} style={{ flex: 1, maxWidth: '600px', position: 'relative' }}>
                        <input
                            type="text"
                            placeholder="What are you looking for..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                width: '100%', padding: '12px 20px', paddingRight: '48px',
                                borderRadius: '30px', border: '1px solid #e2e8f0',
                                background: '#f8fafc', fontSize: '14px'
                            }}
                        />
                        <button type="submit" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#64748b' }}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        </button>
                    </form>

                    {/* Actions & Socials */}
                    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>

                        {/* Social Icons */}
                        <div style={{ display: 'flex', gap: '16px', borderRight: '1px solid #e2e8f0', paddingRight: '24px' }}>
                            {/* Facebook */}
                            <a href="#" style={{ display: 'flex', alignItems: 'center' }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>
                            {/* Instagram */}
                            <a href="#" style={{ display: 'flex', alignItems: 'center' }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
                            {/* WhatsApp */}
                            <a href="#" style={{ display: 'flex', alignItems: 'center' }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg></a>
                            {/* TikTok (Music note as proxy or custom path) */}
                            <a href="#" style={{ display: 'flex', alignItems: 'center' }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg></a>
                        </div>

                        {/* Store Icons */}
                        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                            {/* Sync/Refresh */}
                            {/* <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 4v6h-6"></path><path d="M1 20v-6h6"></path><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg></button> */}

                            {/* Wishlist */}
                            <Link href="#" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                                {wishlistCount > 0 && <span style={{
                                    position: 'absolute', top: '-8px', right: '-8px',
                                    background: '#fbbf24', color: 'black', borderRadius: '50%',
                                    fontSize: '10px', width: '18px', height: '18px', fontWeight: 'bold',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>{wishlistCount}</span>}
                            </Link>

                            {/* Cart */}
                            <Link href="/cart" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'inherit' }}>
                                <div style={{ position: 'relative' }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                                    {cartCount > 0 && <span style={{
                                        position: 'absolute', top: '-8px', right: '-8px',
                                        background: '#fbbf24', color: 'black', borderRadius: '50%',
                                        fontSize: '10px', width: '18px', height: '18px', fontWeight: 'bold',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    }}>{cartCount}</span>}
                                </div>
                                <span style={{ fontWeight: 600, fontSize: '14px' }}>KSh{cartTotal.toLocaleString()}</span>
                            </Link>
                        </div>

                    </div>
                </div>
            </nav>
        </header>
    );
}
