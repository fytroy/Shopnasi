import Link from 'next/link';
import { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { useRouter } from 'next/router';

export default function Navbar() {
    const { cart, cartCount, wishlistCount } = useStore();
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);

    const cartTotal = useMemo(() => {
        return cart.reduce((total, item) => total + (item.price_retail * item.quantity), 0);
    }, [cart]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            setMenuOpen(false);
            router.push(`/shop?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <header>
            {/* Top Bar */}
            <div style={{ background: '#1e293b', color: 'white', padding: '8px 0', fontSize: '13px', textAlign: 'right' }}>
                <div className="container">
                    Call us on <span style={{ fontWeight: 700 }}>+254705762775</span> to place your order.
                </div>
            </div>

            {/* Main Navbar */}
            <nav className="glass-header" style={{ position: 'sticky', top: 0, zIndex: 100, borderBottom: '1px solid var(--border-color)', background: 'rgba(255, 255, 255, 0.95)' }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '80px', gap: '40px' }}>

                    {/* Logo & Nav Links */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                        <Link href="/" style={{ fontSize: '28px', fontWeight: '900', fontStyle: 'italic', letterSpacing: '-1px', display: 'flex', alignItems: 'center' }}>
                            SHOPNASI
                        </Link>
                        <Link href="/shop" style={{ fontSize: '16px', fontWeight: 600, color: '#0f172a', textDecoration: 'none' }} className="navbar-socials">
                            Products
                        </Link>
                    </div>

                    {/* Search Bar (desktop) */}
                    <form onSubmit={handleSearch} className="navbar-search" style={{ flex: 1, maxWidth: '600px', position: 'relative' }}>
                        <input
                            type="text"
                            placeholder="What are you looking for..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{ width: '100%', padding: '12px 20px', paddingRight: '48px', borderRadius: '30px', border: '1px solid #e2e8f0', background: '#f8fafc', fontSize: '14px' }}
                        />
                        <button type="submit" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#64748b' }}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        </button>
                    </form>

                    {/* Actions (desktop) */}
                    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                        {/* Social Icons */}
                        <div className="navbar-socials" style={{ display: 'flex', gap: '16px', borderRight: '1px solid #e2e8f0', paddingRight: '24px' }}>
                            <a href="#" style={{ display: 'flex', alignItems: 'center' }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>
                            <a href="#" style={{ display: 'flex', alignItems: 'center' }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
                            <a href="#" style={{ display: 'flex', alignItems: 'center' }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg></a>
                        </div>

                        {/* Wishlist + Cart (always visible) */}
                        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                            <Link href="/wishlist" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                                {wishlistCount > 0 && <span style={{ position: 'absolute', top: '-8px', right: '-8px', background: '#fbbf24', color: 'black', borderRadius: '50%', fontSize: '10px', width: '18px', height: '18px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{wishlistCount}</span>}
                            </Link>
                            <Link href="/cart" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'inherit' }}>
                                <div style={{ position: 'relative' }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                                    {cartCount > 0 && <span style={{ position: 'absolute', top: '-8px', right: '-8px', background: '#fbbf24', color: 'black', borderRadius: '50%', fontSize: '10px', width: '18px', height: '18px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{cartCount}</span>}
                                </div>
                                <span className="navbar-socials" style={{ fontWeight: 600, fontSize: '14px' }}>KSh {cartTotal.toLocaleString()}</span>
                            </Link>
                        </div>

                        {/* Hamburger (mobile only) */}
                        <button
                            onClick={() => setMenuOpen(o => !o)}
                            style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
                            className="hamburger-btn"
                            aria-label="Menu"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                {menuOpen
                                    ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                                    : <><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></>
                                }
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile dropdown menu */}
                {menuOpen && (
                    <div style={{ background: 'white', borderTop: '1px solid var(--border-color)', padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <form onSubmit={handleSearch} style={{ position: 'relative' }}>
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{ width: '100%', padding: '12px 20px', paddingRight: '48px', borderRadius: '30px', border: '1px solid #e2e8f0', background: '#f8fafc', fontSize: '14px' }}
                            />
                            <button type="submit" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                            </button>
                        </form>
                        <Link href="/shop" onClick={() => setMenuOpen(false)} style={{ fontWeight: 600, fontSize: '16px' }}>Products</Link>
                        <Link href="/wishlist" onClick={() => setMenuOpen(false)} style={{ fontWeight: 600, fontSize: '16px' }}>Wishlist {wishlistCount > 0 ? `(${wishlistCount})` : ''}</Link>
                        <Link href="/cart" onClick={() => setMenuOpen(false)} style={{ fontWeight: 600, fontSize: '16px' }}>Cart {cartCount > 0 ? `(${cartCount})` : ''}</Link>
                        <Link href="/track-order" onClick={() => setMenuOpen(false)} style={{ fontWeight: 600, fontSize: '16px' }}>Track Order</Link>
                    </div>
                )}
            </nav>
        </header>
    );
}
