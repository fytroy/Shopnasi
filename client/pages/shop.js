import Head from 'next/head';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

export default function Shop() {
    const router = useRouter();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filtersReady, setFiltersReady] = useState(false);

    const [search, setSearch] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [category, setCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [sort, setSort] = useState('');
    const [page, setPage] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    const PAGE_SIZE = 20;

    // Debounce search: only fire fetch 350ms after typing stops
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const debounceRef = useRef(null);
    const handleSearchChange = (val) => {
        setSearch(val);
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => setDebouncedSearch(val), 350);
    };

    useEffect(() => {
        if (!router.isReady) return;
        if (router.query.q) { setSearch(router.query.q); setDebouncedSearch(router.query.q); }
        if (router.query.category) setCategory(router.query.category);
        setFiltersReady(true);
    }, [router.isReady]);

    const fetchProducts = (currentPage = page) => {
        setLoading(true);
        const params = new URLSearchParams();
        if (debouncedSearch) params.append('q', debouncedSearch);
        if (minPrice) params.append('minPrice', minPrice);
        if (maxPrice) params.append('maxPrice', maxPrice);
        if (category) params.append('category', category);
        if (subCategory) params.append('sub_category', subCategory);
        if (brand) params.append('brand', brand);
        if (sort) params.append('sort', sort);
        params.append('page', currentPage);
        params.append('limit', PAGE_SIZE);

        fetch(`/api/products?${params.toString()}`)
            .then(res => res.json())
            .then(data => { setProducts(data.products); setTotalProducts(data.total); setLoading(false); })
            .catch(err => { console.error(err); setLoading(false); });
    };

    // Reset to page 1 when any filter changes
    useEffect(() => {
        if (!filtersReady) return;
        setPage(1);
        fetchProducts(1);
    }, [debouncedSearch, minPrice, maxPrice, category, subCategory, brand, sort, filtersReady]);

    useEffect(() => {
        if (!filtersReady) return;
        fetchProducts(page);
    }, [page]);

    return (
        <div style={{ background: 'rgb(var(--background-end-rgb))', minHeight: '100vh' }}>
            <Head>
                <title>Catalog | Shopnasi</title>
            </Head>
            <Navbar />

            <div className="container shop-layout" style={{ padding: '40px 24px', display: 'flex', gap: '40px' }}>
                {/* Sidebar Filters */}
                <aside className="shop-sidebar" style={{ width: '250px', flexShrink: 0 }}>
                    <div style={{ position: 'sticky', top: '100px' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '24px' }}>Filters</h3>

                        <div style={{ marginBottom: '24px' }}>
                            <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>Search</label>
                            <input
                                type="text"
                                placeholder="Model, SKU..."
                                value={search}
                                onChange={(e) => handleSearchChange(e.target.value)}
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
                                <option value="Gaming">Gaming</option>
                                <option value="Laptops">Laptops</option>
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
                            {category === 'Accessories' && (
                                <select
                                    value={subCategory}
                                    onChange={(e) => setSubCategory(e.target.value)}
                                    style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--border-color)', borderRadius: '6px', marginTop: '8px' }}
                                >
                                    <option value="">All Accessories</option>
                                    <option value="Smartwatches">Smartwatches</option>
                                    <option value="Docks">Docks & Hubs</option>
                                    <option value="Dashcams">Dashcams</option>
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
                                <option value="Shure">Shure</option>
                                <option value="Sonos">Sonos</option>
                                <option value="Harman Kardon">Harman Kardon</option>
                                <option value="HP">HP</option>
                                <option value="Pixel">Pixel</option>
                                <option value="UE">UE</option>
                                <option value="PlayStation">PlayStation</option>
                                <option value="Oraimo">Oraimo</option>
                                <option value="Xiaomi">Xiaomi</option>
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
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <h2 style={{ fontSize: '24px', fontWeight: 700 }}>
                            {category || 'All Products'} <span style={{ fontSize: '16px', fontWeight: 400, color: 'var(--secondary-color)' }}>({totalProducts})</span>
                        </h2>
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            style={{ padding: '8px 12px', border: '1px solid var(--border-color)', borderRadius: '6px', fontSize: '14px', background: 'white' }}
                        >
                            <option value="">Sort: Default</option>
                            <option value="price_asc">Price: Low to High</option>
                            <option value="price_desc">Price: High to Low</option>
                            <option value="newest">Newest First</option>
                            <option value="name_asc">Name: A–Z</option>
                        </select>
                    </div>

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
                            <button onClick={() => { setSearch(''); setDebouncedSearch(''); setCategory(''); setSubCategory(''); setBrand(''); setMinPrice(''); setMaxPrice(''); setSort(''); }} style={{ marginTop: '16px', color: 'var(--accent-color)', background: 'none', border: 'none', textDecoration: 'underline', cursor: 'pointer' }}>
                                Reset Filters
                            </button>
                        </div>
                    )}

                    {/* Pagination */}
                    {!loading && totalProducts > PAGE_SIZE && (() => {
                        const totalPages = Math.ceil(totalProducts / PAGE_SIZE);
                        return (
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '40px' }}>
                                <button
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    style={{ padding: '8px 16px', border: '1px solid var(--border-color)', borderRadius: '6px', background: 'white', cursor: page === 1 ? 'not-allowed' : 'pointer', opacity: page === 1 ? 0.4 : 1 }}
                                >
                                    ← Prev
                                </button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1)
                                    .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 2)
                                    .reduce((acc, p, idx, arr) => {
                                        if (idx > 0 && p - arr[idx - 1] > 1) acc.push('…');
                                        acc.push(p);
                                        return acc;
                                    }, [])
                                    .map((p, idx) => p === '…'
                                        ? <span key={`ellipsis-${idx}`} style={{ padding: '0 4px' }}>…</span>
                                        : <button key={p} onClick={() => setPage(p)} style={{ width: '36px', height: '36px', border: '1px solid var(--border-color)', borderRadius: '6px', background: page === p ? 'var(--primary-color)' : 'white', color: page === p ? 'white' : 'inherit', cursor: 'pointer', fontWeight: page === p ? 700 : 400 }}>{p}</button>
                                    )
                                }
                                <button
                                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                    disabled={page === totalPages}
                                    style={{ padding: '8px 16px', border: '1px solid var(--border-color)', borderRadius: '6px', background: 'white', cursor: page === totalPages ? 'not-allowed' : 'pointer', opacity: page === totalPages ? 0.4 : 1 }}
                                >
                                    Next →
                                </button>
                            </div>
                        );
                    })()}
                </main>
            </div>
        </div>
    );
}
