import Page from '../components/ContentPage';

export default function TrackOrder() {
    return <Page title="Track Your Order" content={
        <>
            <p>Enter your order ID to track your shipment.</p>
            <input type="text" placeholder="Order ID" style={{ padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e1', marginTop: '16px', width: '100%', maxWidth: '300px' }} />
            <button className="btn" style={{ marginTop: '16px' }}>Track</button>
        </>
    } />;
}
