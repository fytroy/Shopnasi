import Head from 'next/head';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Shop() {
    const router = useRouter();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filter States
    const [search, setSearch] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [category, setCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [brand, setBrand] = useState('');

    const fetchProducts = () => {
        setLoading(true);
        const params = new URLSearchParams();
        if (search) params.append('q', search);
        if (minPrice) params.append('minPrice', minPrice);
        if (maxPrice) params.append('maxPrice', maxPrice);
        if (category) params.append('category', category);
        if (subCategory) params.append('sub_category', subCategory);
        if (brand) params.append('brand', brand);

        fetch(`/api/products?${params.toString()}`)
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchProducts();
    }, [search, minPrice, maxPrice, category, subCategory, brand]);

    return (
        <div style={{ background: 'var(--background-end-rgb)', minHeight: '100vh' }}>
            <Head>
                <title>Catalog | Shopnasi</title>
            </Head>
            <Navbar />

            <div className="container" style={{ padding: '40px 24px', display: 'flex', gap: '40px' }}>
                {/* Sidebar Filters */}
                <aside style={{ width: '250px', flexShrink: 0 }}>
                    <div style={{ position: 'sticky', top: '100px' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '24px' }}>Filters</h3>

                        <div style={{ marginBottom: '24px' }}>
                            <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>Search</label>
                            <input
                                type="text"
                                placeholder="Model, SKU..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--border-color)', borderRadius: '6px' }}
                            />
                        </div>

                        {/* Hierarchy Categories */}
                        <div style={{ marginBottom: '24px' }}>
                            <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>Category</label>
                            <select
                                value={category}
                                onChange={(e) => { setCategory(e.target.value); setSubCategory(''); }}
                                style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--border-color)', borderRadius: '6px' }}
                            >
                                <option value="">All Categories</option>
                                <option value="TVs">TVs</option>
                                <option value="Audio">Audio</option>
                                <option value="Phones">Phones</option>
                                <option value="Tablets">Tablets</option>
                                <option value="Powerbanks">Powerbanks</option>
                                <option value="Monitors">Monitors</option>
                                <option value="Peripherals">Peripherals</option>
                                <option value="Accessories">Accessories</option>
                            </select>

                            {/* Sub-Category Logic */}
                            {category === 'Audio' && (
                                <select
                                    value={subCategory}
                                    onChange={(e) => setSubCategory(e.target.value)}
                                    style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--border-color)', borderRadius: '6px', marginTop: '8px' }}
                                >
                                    <option value="">All Audio</option>
                                    <option value="Earbuds">Earbuds</option>
                                    <option value="Earphones">Earphones</option>
                                    <option value="Headphones">Headphones</option>
                                    <option value="Soundbars">Soundbars</option>
                                    <option value="Bluetooth Speakers">Bluetooth Speakers</option>
                                </select>
                            )}
                            {category === 'TVs' && (
                                <select
                                    value={subCategory}
                                    onChange={(e) => setSubCategory(e.target.value)}
                                    style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--border-color)', borderRadius: '6px', marginTop: '8px' }}
                                >
                                    <option value="">All TVs</option>
                                    <option value="Smart TV">Smart TV</option>
                                </select>
                            )}
                            {category === 'Phones' && (
                                <select
                                    value={subCategory}
                                    onChange={(e) => setSubCategory(e.target.value)}
                                    style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--border-color)', borderRadius: '6px', marginTop: '8px' }}
                                >
                                    <option value="">All Phones</option>
                                    <option value="Smartphones">Smartphones</option>
                                </select>
                            )}
                        </div>

                        {/* Brand Filter */}
                        <div style={{ marginBottom: '24px' }}>
                            <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>Brand</label>
                            <select
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                                style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--border-color)', borderRadius: '6px' }}
                            >
                                <option value="">All Brands</option>
                                <option value="Samsung">Samsung</option>
                                <option value="Apple">Apple</option>
                                <option value="Sony">Sony</option>
                                <option value="LG">LG</option>
                                <option value="Bose">Bose</option>
                                <option value="JBL">JBL</option>
                                <option value="Anker">Anker</option>
                                <option value="Xiaomi">Xiaomi</option>
                                <option value="Dell">Dell</option>
                                <option value="Lenovo">Lenovo</option>
                                <option value="TCL">TCL</option>
                                <option value="Hisense">Hisense</option>
                                <option value="Sennheiser">Sennheiser</option>
                            </select>
                        </div>

                        <div style={{ marginBottom: '24px' }}>
                            <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>Price Range</label>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <input
                                    type="number" placeholder="Min"
                                    value={minPrice} onChange={(e) => setMinPrice(e.target.value)}
                                    style={{ width: '50%', padding: '8px', border: '1px solid var(--border-color)', borderRadius: '6px' }}
                                />
                                <input
                                    type="number" placeholder="Max"
                                    value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}
                                    style={{ width: '50%', padding: '8px', border: '1px solid var(--border-color)', borderRadius: '6px' }}
                                />
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Product Grid */}
                <main style={{ flex: 1 }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px' }}>
                        {category || 'All Products'} <span style={{ fontSize: '16px', fontWeight: 400, color: 'var(--secondary-color)' }}>({products.length})</span>
                    </h2>

                    {loading ? (
                        <p>Loading catalog...</p>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
                            {products.map(p => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    )}

                    {!loading && products.length === 0 && (
                        <div style={{ padding: '40px', textAlign: 'center', background: 'white', borderRadius: 'var(--radius)' }}>
                            <p>No products found matching your criteria.</p>
                            <button onClick={() => { setSearch(''); setCategory(''); setMinPrice(''); setMaxPrice(''); }} style={{ marginTop: '16px', color: 'var(--accent-color)', background: 'none', border: 'none', textDecoration: 'underline', cursor: 'pointer' }}>
                                Reset Filters
                            </button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
