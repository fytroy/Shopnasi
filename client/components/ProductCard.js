import Link from 'next/link';

export default function ProductCard({ product }) {
    // Use mock image placeholder if local not found to ensure aesthetics in demo
    // Use DB image if available, else fallback to placeholder
    const imageUrl = product.image_url || `https://placehold.co/400x300/f1f5f9/0f172a?text=${product.name.replace(/ /g, '+')}`;

    return (
        <Link href={`/product/${product.id}`}>
            <div style={{
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius)',
                overflow: 'hidden',
                transition: 'all 0.2s',
                background: 'white',
                cursor: 'pointer'
            }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-md)'}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
            >
                <div style={{ height: '240px', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img
                        src={imageUrl}
                        alt={product.name}
                        style={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'contain', mixBlendMode: 'multiply' }}
                    />
                </div>
                <div style={{ padding: '24px' }}>
                    <div style={{ fontSize: '12px', color: 'var(--secondary-color)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        {product.category}
                    </div>
                    <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>{product.name}</h3>
                    <p style={{ fontSize: '14px', color: 'var(--secondary-color)', marginBottom: '16px' }}>
                        {product.sku || product.attributes?.sku || 'SKU-000'}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 'bold', fontSize: '18px' }}>KSh {product.price_retail ? product.price_retail.toLocaleString() : product.price_retail}</span>
                        <span style={{ fontSize: '14px', color: 'var(--accent-color)', fontWeight: 500 }}>View Specs &rarr;</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
