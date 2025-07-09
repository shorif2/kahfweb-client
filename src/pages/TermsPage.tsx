import TermsContent from "@/components/legal/TermsContent";
import { Metadata } from "@/components/Metadata";

const TermsPage = () => {
  return (
    <>
      <Metadata
        title="Terms and Conditions - KahfWeb"
        description="Read our terms and conditions for using KahfWeb's domain and hosting services."
      />
      <TermsContent />
    </>
  );
};

export default TermsPage;
