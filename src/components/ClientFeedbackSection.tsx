
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
          <FeedbackList clientId={null} />
          <FeedbackForm clientId={selectedClient} isAdvisor={true} />
        </>
      ) : (
        <>
          <FeedbackForm clientId={selectedClient} />
          <FeedbackList clientId={selectedClient} />
        </>
      )}
    </div>
  );
};

export default ClientFeedbackSection;
