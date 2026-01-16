import Page from '../components/ContentPage';

export default function FAQs() {
    return <Page title="Frequently Asked Questions" content={
        <ul>
            <li><strong>How do I place an order?</strong> Simply browse our catalog, add items to cart, and checkout.</li>
            <li><strong>Do you offer installment payments?</strong> Currently, we only accept full payments or M-Pesa.</li>
            <li><strong>Is my data safe?</strong> Yes, we use SSL encryption to protect your data.</li>
        </ul>
    } />;
}
