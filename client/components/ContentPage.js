import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Page({ title, content }) {
    return (
        <div style={{ background: 'rgb(var(--background-end-rgb))', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <main className="container" style={{ padding: '60px 24px', flex: 1 }}>
                <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '24px' }}>{title}</h1>
                <div style={{ background: 'white', padding: '40px', borderRadius: 'var(--radius)', lineHeight: '1.8' }}>
                    {content ? content : <p>Information regarding {title} will be updated shortly.</p>}
                </div>
            </main>
            <Footer />
        </div>
    );
}

