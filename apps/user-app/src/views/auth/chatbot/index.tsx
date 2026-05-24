import PageTemplate from "@initia/shared/ui/layouts/auth/pages/pageTemplate";
import { useEffect, useState } from "react";

import { answerSession, getFlows, startSession } from "../../../api/chatbot";

interface NodeOption {
  id: string;
  label: string;
}
interface CurrentNode {
  id: string;
  title: string;
  message: string;
  options?: NodeOption[];
}

const ChatbotView = () => {
  const [flowId, setFlowId] = useState<string>("");
  const [sessionId, setSessionId] = useState<string>("");
  const [node, setNode] = useState<CurrentNode | null>(null);
  const [flows, setFlows] = useState<Array<{ id: string; name: string }>>([]);

  useEffect(() => {
    getFlows().then((res) => {
      const payload = (res.payload || []) as unknown as Array<{ id: string; name: string }>;
      setFlows(payload);
      if (payload[0]?.id) setFlowId(payload[0].id);
    });
  }, []);

  const begin = async () => {
    const res = await startSession(flowId);
    const payload = res.payload as { session: { id: string }; node: CurrentNode };
    setSessionId(payload?.session?.id || "");
    setNode(payload?.node || null);
  };

  const choose = async (optionId: string) => {
    if (!node) return;
    const res = await answerSession({ sessionId, nodeId: node.id, optionId });
    const payload = res.payload as { nextNode: CurrentNode | null };
    setNode(payload?.nextNode || null);
  };

  return (
    <PageTemplate title="Chatbot">
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="mb-3">
            <label className="form-label">Flow</label>
            <select
              className="form-select"
              value={flowId}
              onChange={(e) => setFlowId(e.target.value)}
            >
              {flows.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
          </div>
          <button className="btn btn-primary mb-3" onClick={begin}>
            Start Chat
          </button>

          {node ? (
            <div>
              <h6>{node.title}</h6>
              <p>{node.message}</p>
              <div className="d-flex gap-2 flex-wrap">
                {(node.options || []).map((opt) => (
                  <button
                    key={opt.id}
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => choose(opt.id)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-muted mb-0">Start a chat to begin the guided flow.</p>
          )}
        </div>
      </div>
    </PageTemplate>
  );
};

export default ChatbotView;
