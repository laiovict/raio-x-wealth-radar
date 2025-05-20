
import { useRaioX } from "@/context/RaioXContext";
import FeedbackForm from "./FeedbackForm";
import FeedbackList from "./FeedbackList";

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
          <FeedbackForm clientId={selectedClient} isAdvisor={true} />
        </>
      ) : (
        <>
          {/* Clients only see their feedback form without the list */}
          <FeedbackForm clientId={selectedClient} />
        </>
      )}
    </div>
  );
};

export default ClientFeedbackSection;
