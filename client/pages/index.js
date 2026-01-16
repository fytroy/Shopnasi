import Head from 'next/head';
import Navbar from '../components/Navbar';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    // Fetch featured products (simplified: just get all and take 3)
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setFeaturedProducts(data.slice(0, 4)))
      .catch(err => console.error("API Error", err));
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ background: 'var(--background-end-rgb)', minHeight: '100vh', position: 'relative' }}>
      <Head>
        <title>Shopnasi | Premium Electronics</title>
        <meta name="description" content="High-performance electronics for professionals and enthusiasts." />
      </Head>

      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="container" style={{ padding: '80px 24px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '56px', fontWeight: 800, letterSpacing: '-2px', marginBottom: '24px', background: 'linear-gradient(to right, #0f172a, #475569)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Engineered for Excellence.
          </h1>
          <p style={{ fontSize: '20px', color: 'var(--secondary-color)', maxWidth: '600px', margin: '0 auto 40px' }}>
            Discover the next generation of professional-grade electronics.
            From ergonomic workspaces to high-performance peripherals.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <Link href="/shop" className="btn">
              Explore Catalog
            </Link>
          </div>
        </section>

        {/* Category Grid */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', height: '400px', marginBottom: '80px' }}>
          {/* Headphones */}
          <div style={{ position: 'relative', height: '100%', overflow: 'hidden', group: 'hover' }}>
            <img src="/categories/headphones.png" alt="Headphones" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px', background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }}>
              <p style={{ color: '#fff', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>WIRED & WIRELESS</p>
              <h3 style={{ color: '#fff', fontSize: '18px', fontWeight: 900, lineHeight: 1.1, textTransform: 'uppercase' }}>MUSIC LOVERS ON THE GO</h3>
            </div>
          </div>

          {/* TV */}
          <div style={{ position: 'relative', height: '100%', overflow: 'hidden' }}>
            <img src="/categories/tv.png" alt="TVs" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px', background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }}>
              <p style={{ color: '#fff', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>WIDE VARIETY</p>
              <h3 style={{ color: '#fff', fontSize: '18px', fontWeight: 900, lineHeight: 1.1, textTransform: 'uppercase' }}>TVS & ACCESSORIES</h3>
            </div>
          </div>

          {/* Gaming */}
          <div style={{ position: 'relative', height: '100%', overflow: 'hidden' }}>
            <img src="/categories/gaming.png" alt="Gaming" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px', background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }}>
              <p style={{ color: '#fff', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>LATEST GENERATION</p>
              <h3 style={{ color: '#fff', fontSize: '18px', fontWeight: 900, lineHeight: 1.1, textTransform: 'uppercase' }}>GAMES AND CONSOLES</h3>
            </div>
          </div>

          {/* Phones */}
          <div style={{ position: 'relative', height: '100%', overflow: 'hidden' }}>
            <img src="/categories/phone.png" alt="Phones" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px', background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }}>
              <p style={{ color: '#fff', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>IOS & ANDROID</p>
              <h3 style={{ color: '#fff', fontSize: '18px', fontWeight: 900, lineHeight: 1.1, textTransform: 'uppercase' }}>SMARTPHONES & TABLETS</h3>
            </div>
          </div>

          {/* Kitchen */}
          <div style={{ position: 'relative', height: '100%', overflow: 'hidden' }}>
            <img src="/categories/kitchen.png" alt="Kitchen" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px', background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }}>
              <p style={{ color: '#fff', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>MODERN LIVING</p>
              <h3 style={{ color: '#fff', fontSize: '18px', fontWeight: 900, lineHeight: 1.1, textTransform: 'uppercase' }}>KITCHENWARE & APPLIANCES</h3>
            </div>
          </div>
        </section>

        {/* Deals of the Day */}
        <section className="container" style={{ marginBottom: '80px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {/* Title Card */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>
              <h2 style={{ fontSize: '48px', fontWeight: 900, fontStyle: 'italic', lineHeight: '1', marginBottom: '16px' }}>
                DEALS<br />OF THE<br />DAY! 😎
              </h2>
              <div style={{ width: '60px', height: '6px', background: '#fbbf24', marginBottom: '24px' }}></div>
              <p style={{ color: 'var(--secondary-color)' }}>New Promos for the day!</p>
            </div>

            {/* Deal 1 */}
            <div style={{ position: 'relative', height: '350px', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer' }}>
              <img src="https://placehold.co/400x500/333/fff?text=JBL+Tune+780NC" alt="JBL" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', color: 'white' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '4px' }}>JBL TUNE 780NC</h3>
                <p style={{ fontSize: '12px', opacity: 0.8, marginBottom: '8px' }}>WIRELESS NOISE CANCELLING</p>
                <p style={{ fontSize: '24px', fontWeight: 700 }}>KSh 10,999</p>
              </div>
            </div>

            {/* Deal 2 */}
            <div style={{ position: 'relative', height: '350px', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer' }}>
              <img src="https://placehold.co/400x500/502/fff?text=Dell+Monitor" alt="Dell" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', color: 'white' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '4px' }}>DELL P3424WEB</h3>
                <p style={{ fontSize: '12px', opacity: 0.8, marginBottom: '8px' }}>34" VIDEO CONFERENCING</p>
                <p style={{ fontSize: '24px', fontWeight: 700 }}>KSh 107,000</p>
              </div>
            </div>

            {/* Deal 3 */}
            <div style={{ position: 'relative', height: '350px', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer' }}>
              <img src="https://placehold.co/400x500/124/fff?text=Harman+Kardon" alt="Harman" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', color: 'white' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '4px' }}>AURA STUDIO 5</h3>
                <p style={{ fontSize: '12px', opacity: 0.8, marginBottom: '8px' }}>BLUETOOTH HOME SPEAKER</p>
                <p style={{ fontSize: '24px', fontWeight: 700 }}>KSh 37,999</p>
              </div>
            </div>
          </div>
        </section>

        {/* Best Selling Section */}
        <section className="container" style={{ padding: '0 24px 60px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 800, fontStyle: 'italic', letterSpacing: '-1px' }}>BEST SELLING</h2>
            <Link href="/shop" style={{ color: 'var(--accent-color)', fontWeight: 500 }}>View all &rarr;</Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '32px' }}>
            {featuredProducts.length > 0 ? (
              featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p>Loading premium selection...</p>
            )}
          </div>
        </section>

        <Footer />
      </main>

      {/* Floating Action Buttons */}
      <div style={{ position: 'fixed', bottom: '32px', left: '32px', zIndex: 100 }}>
        <a href="https://wa.me/254705762775" target="_blank" rel="noopener noreferrer" style={{
          display: 'flex', alignItems: 'center', gap: '12px',
          background: 'white', padding: '12px 24px', borderRadius: '50px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)', textDecoration: 'none', color: 'inherit',
          fontWeight: 600, fontSize: '14px'
        }}>
          <div style={{ width: '32px', height: '32px', background: '#25D366', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
          </div>
          Need Help? Chat with us
        </a>
      </div>

      <div style={{ position: 'fixed', bottom: '32px', right: '32px', zIndex: 100 }}>
        <button onClick={scrollToTop} style={{
          width: '48px', height: '48px', borderRadius: '50%',
          background: 'white', border: 'none',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-color)'
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
        </button>
      </div>

    </div>
  );
}
