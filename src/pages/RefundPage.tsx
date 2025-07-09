import RefundContent from "@/components/legal/RefundContent";
import { Metadata } from "@/components/Metadata";

const RefundPage = () => {
  return (
    <>
      <Metadata
        title="Refund Policy - KahfWeb"
        description="Read about KahfWeb's refund policy for domain and hosting services."
      />
      <RefundContent />
    </>
  );
};

export default RefundPage;
