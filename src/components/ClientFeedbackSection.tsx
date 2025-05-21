
import { useRaioX } from "@/context/RaioXContext";
import FeedbackForm from "./FeedbackForm";
import FeedbackList from "./FeedbackList";
import { toNumber } from "@/utils/typeConversionHelpers";

interface ClientFeedbackSectionProps {
  isAdvisorView?: boolean;
}

const ClientFeedbackSection = ({ isAdvisorView = false }: ClientFeedbackSectionProps) => {
  const { selectedClient } = useRaioX();

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-white mb-6">
        {isAdvisorView ? "Feedback dos Clientes" : "Avalie sua Experiência"}
      </h2>
      
      {isAdvisorView ? (
        <>
          {/* Advisors see the list of all feedback */}
          <FeedbackList clientId={null} />
          <FeedbackForm clientId={selectedClient ? toNumber(selectedClient) : null} isAdvisor={true} />
        </>
      ) : (
        <>
          {/* Clients only see their feedback form without the list */}
          <FeedbackForm clientId={selectedClient ? toNumber(selectedClient) : null} />
        </>
      )}
    </div>
  );
};

export default ClientFeedbackSection;

const validateClientRating = (rating: string | number | null): number => {
  if (rating === null) return 0;
  const numRating = Number(rating);
  return isNaN(numRating) ? 0 : Math.min(Math.max(numRating, 0), 10);
};

const validateAdvisorRating = (rating: string | number | null): number => {
  if (rating === null) return 0;
  const numRating = Number(rating);
  return isNaN(numRating) ? 0 : Math.min(Math.max(numRating, 0), 10);  
};
