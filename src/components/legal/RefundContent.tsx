const RefundContent = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Refund Policy</h1>

      <div className="prose prose-blue max-w-none">
        <p className="text-lg mb-6">Last updated: May 18, 2025</p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          30-Day Money Back Guarantee
        </h2>
        <p>
          At KahfWeb, we stand behind our hosting services with a 30-day money
          back guarantee. If you're not satisfied with our hosting services
          within the first 30 days of your purchase, you can request a full
          refund of your hosting fees.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Eligibility for Refunds
        </h2>

        <h3 className="text-xl font-semibold mt-6 mb-3">Hosting Services</h3>
        <p>
          Our 30-day money back guarantee applies to our hosting services under
          the following conditions:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>
            The refund request is made within 30 days of the initial purchase.
          </li>
          <li>The refund applies to the base hosting fee only.</li>
          <li>
            Setup fees, migration costs, and add-on services are non-refundable.
          </li>
          <li>
            For annual plans, refunds will be prorated after the first 30 days.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">Domain Registration</h3>
        <p>
          Due to the nature of domain registrations and the immediate
          reservation of the domain name on your behalf, domain registration
          fees are generally non-refundable. However, exceptions may be made in
          the following cases:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>
            If we fail to register your domain due to technical issues on our
            end.
          </li>
          <li>
            If the domain name you registered contains a typographical error and
            you notify us within 24 hours of registration.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">Bundle Packages</h3>
        <p>
          For bundle packages that include both hosting and domain registration:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>
            The hosting portion of the bundle is eligible for our 30-day money
            back guarantee.
          </li>
          <li>
            The domain registration portion follows the domain refund policy
            stated above.
          </li>
          <li>
            If you receive a free domain with your hosting package and request a
            refund, the standard domain registration fee will be deducted from
            your refund amount.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          How to Request a Refund
        </h2>
        <p>To request a refund, you need to:</p>
        <ol className="list-decimal pl-6 mb-4">
          <li>
            Contact our customer support team via email at support@kahfweb.com
            or through the support ticket system in your customer dashboard.
          </li>
          <li>
            Provide your account information and the reason for requesting a
            refund.
          </li>
          <li>
            Our team will review your request and process eligible refunds
            within 7-10 business days.
          </li>
        </ol>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Refund Methods</h2>
        <p>
          Refunds will be issued using the original payment method used for the
          purchase:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Credit/debit card payments: Refunded to the original card.</li>
          <li>PayPal payments: Refunded to the PayPal account.</li>
          <li>Bank transfers: Refunded to the originating bank account.</li>
        </ul>
        <p>
          Please note that it may take 5-10 business days for the refund to
          appear on your statement, depending on your financial institution.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Excluded Services</h2>
        <p>The following services are not covered by our refund policy:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>SSL certificates</li>
          <li>Premium support services</li>
          <li>Custom development work</li>
          <li>Third-party software licenses</li>
          <li>Dedicated server setups</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Cancellation vs. Refund
        </h2>
        <p>
          Cancelling your service and requesting a refund are two separate
          processes:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>
            Cancellation: Stops the service from renewing at the end of the
            current billing cycle.
          </li>
          <li>
            Refund: Returns payment for services already purchased according to
            this refund policy.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Changes to This Policy
        </h2>
        <p>
          We reserve the right to modify this refund policy at any time. Changes
          will be effective immediately upon posting to our website. Your
          continued use of our services following the posting of changes
          constitutes your acceptance of such changes.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
        <p>
          If you have any questions about our refund policy, please contact us:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>By email: billing@kahfweb.com</li>
          <li>By phone: [Your Phone Number]</li>
          <li>Through our support ticket system in your customer dashboard</li>
        </ul>
      </div>
    </div>
  );
};

export default RefundContent;
