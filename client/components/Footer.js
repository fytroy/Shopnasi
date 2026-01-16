import Link from 'next/link';

export default function Footer() {
    return (
        <footer>
            {/* Value Props / Trust Signals */}
            <section style={{ background: '#f8fafc', padding: '60px 0', borderTop: '1px solid var(--border-color)' }}>
                <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', textAlign: 'left' }}>

                    {/* Trustscore */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ width: '48px', height: '48px', minWidth: '48px', background: '#fbbf24', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '16px', fontWeight: 800, margin: '0 0 4px', textTransform: 'uppercase' }}>4.9 / 5 Trustscore</h3>
                            <p style={{ fontSize: '13px', color: 'var(--secondary-color)', margin: 0 }}>Rated "Excellent" on Trustpilot</p>
                        </div>
                    </div>

                    {/* Fast Delivery */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ width: '48px', height: '48px', minWidth: '48px', background: '#e2e8f0', border: '2px solid #0f172a', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '16px', fontWeight: 800, margin: '0 0 4px', textTransform: 'uppercase' }}>Super Fast Delivery</h3>
                            <p style={{ fontSize: '13px', color: 'var(--secondary-color)', margin: 0 }}>Safe and Secure</p>
                        </div>
                    </div>

                    {/* M-PESA */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ width: '48px', height: '48px', minWidth: '48px', border: '2px solid #0f172a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '16px', fontWeight: 800, margin: '0 0 4px', textTransform: 'uppercase' }}>We accept M-Pesa</h3>
                            <p style={{ fontSize: '13px', color: 'var(--secondary-color)', margin: 0 }}>All credit cards too!</p>
                        </div>
                    </div>

                    {/* No Fakes */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ width: '48px', height: '48px', minWidth: '48px', background: 'white', border: '2px solid #0f172a', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"></path><path d="M4 6v12c0 1.1.9 2 2 2h14v-4"></path><path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z"></path></svg>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '16px', fontWeight: 800, margin: '0 0 4px', textTransform: 'uppercase' }}>No Fakes!</h3>
                            <p style={{ fontSize: '13px', color: 'var(--secondary-color)', margin: 0 }}>Only original products.</p>
                        </div>
                    </div>

                </div>
            </section>

            {/* Main Footer Content */}
            <section style={{ background: '#000', color: 'white', padding: '60px 0' }}>
                <div className="container" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '40px' }}>
                    {/* Brand / About */}
                    <div>
                        <Link href="/" style={{ fontSize: '28px', fontWeight: '900', fontStyle: 'italic', letterSpacing: '-1px', color: 'white', textDecoration: 'none', display: 'block', marginBottom: '24px' }}>
                            SHOPNASI
                        </Link>
                        <p style={{ color: '#94a3b8', lineHeight: '1.6', maxWidth: '300px' }}>
                            Your premium destination for high-quality electronics and gadgets. Authentic products, guaranteed.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 style={{ fontSize: '18px', fontWeight: 800, fontStyle: 'italic', marginBottom: '8px', textTransform: 'uppercase' }}>Quick Links</h4>
                        <div style={{ width: '40px', height: '4px', background: '#fbbf24', marginBottom: '24px' }}></div>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <li><Link href="/shop" style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '14px' }}>All Products</Link></li>
                            <li><Link href="/track-order" style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '14px' }}>Track Your Order</Link></li>
                            <li><Link href="/returns" style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '14px' }}>Returns & Exchanges</Link></li>
                            <li><Link href="/shipping" style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '14px' }}>Shipping Information</Link></li>
                            <li><Link href="/help" style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '14px' }}>Help Topics</Link></li>
                            <li><Link href="/feedback" style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '14px' }}>Give Us Feedback</Link></li>
                        </ul>
                    </div>

                    {/* Top Category */}
                    <div>
                        <h4 style={{ fontSize: '18px', fontWeight: 800, fontStyle: 'italic', marginBottom: '8px', textTransform: 'uppercase' }}>Top Category</h4>
                        <div style={{ width: '40px', height: '4px', background: '#fbbf24', marginBottom: '24px' }}></div>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <li><Link href="/shop?category=Phones" style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '14px' }}>Phones</Link></li>
                            <li><Link href="/shop?category=Gaming" style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '14px' }}>Gaming</Link></li>
                            <li><Link href="/shop?category=Monitors" style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '14px' }}>Monitors</Link></li>
                            <li><Link href="/shop?category=TVs" style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '14px' }}>TVs</Link></li>
                            <li><Link href="/shop?category=Smartwatches" style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '14px' }}>Watches</Link></li>
                        </ul>
                    </div>

                    {/* Our Policies */}
                    <div>
                        <h4 style={{ fontSize: '18px', fontWeight: 800, fontStyle: 'italic', marginBottom: '8px', textTransform: 'uppercase' }}>Our Policies</h4>
                        <div style={{ width: '40px', height: '4px', background: '#fbbf24', marginBottom: '24px' }}></div>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <li><Link href="/delivery" style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '14px' }}>Delivery</Link></li>
                            <li><Link href="/warranty" style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '14px' }}>Product Warranty</Link></li>
                            <li><Link href="/refunds" style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '14px' }}>Sales And Refunds</Link></li>
                            <li><Link href="/faqs" style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '14px' }}>FAQs</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="container" style={{ borderTop: '1px solid #334155', marginTop: '60px', paddingTop: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#94a3b8' }}>
                    <p style={{ fontSize: '13px', margin: 0 }}>&copy; {new Date().getFullYear()} Shopnasi. All rights reserved.</p>
                    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                        {/* Facebook */}
                        <a href="#" style={{ color: 'inherit', transition: 'color 0.2s' }} className="social-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                        </a>
                        {/* Instagram */}
                        <a href="#" style={{ color: 'inherit', transition: 'color 0.2s' }} className="social-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                        </a>
                        {/* WhatsApp */}
                        <a href="https://wa.me/254705762775" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', transition: 'color 0.2s' }} className="social-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                        </a>
                        {/* TikTok */}
                        <a href="#" style={{ color: 'inherit', transition: 'color 0.2s' }} className="social-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
                        </a>
                    </div>
                </div>
            </section>
        </footer>
    );
}
