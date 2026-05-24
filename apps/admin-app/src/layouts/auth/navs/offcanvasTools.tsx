import { faHeadset, faRobot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@initia/shared/ui/components/core/button";
import OffcanvasComp from "@initia/shared/ui/components/offcanvas";
import MessagingView from "@initia/shared/ui/messaging";
import { Fragment, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

type Flow = { id: string; name: string; isActive?: boolean };
type NodeOption = { id: string; label: string };
type ChatNode = { id: string; title: string; message: string; options?: NodeOption[] };
type ChatLine = { id: string; from: "bot" | "user"; text: string };

const StructuredChatbot = () => {
  const [flows, setFlows] = useState<Flow[]>([]);
  const [flowId, setFlowId] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [currentNode, setCurrentNode] = useState<ChatNode | null>(null);
  const [lines, setLines] = useState<ChatLine[]>([]);

  useEffect(() => {
    import("../../../api/chatbot").then(({ getFlows }) => {
      getFlows().then((res) => {
        const items = ((res.payload || []) as unknown as Flow[]).filter(
          (f) => f.isActive !== false
        );
        setFlows(items);
        if (items[0]?.id) setFlowId(items[0].id);
      });
    });
  }, []);

  const start = async () => {
    if (!flowId) return;
    const { startSession } = await import("../../../api/chatbot");
    const res = await startSession(flowId);
    const payload = res.payload as { session?: { id?: string }; node?: ChatNode };
    const sid = payload?.session?.id || "";
    const node = payload?.node || null;
    setSessionId(sid);
    setCurrentNode(node);
    setLines(node ? [{ id: `bot-${Date.now()}`, from: "bot", text: node.message }] : []);
  };

  const pick = async (option: NodeOption) => {
    if (!currentNode || !sessionId) return;
    setLines((prev) => [...prev, { id: `user-${Date.now()}`, from: "user", text: option.label }]);
    const { answerSession } = await import("../../../api/chatbot");
    const res = await answerSession({ sessionId, nodeId: currentNode.id, optionId: option.id });
    const payload = res.payload as { nextNode?: ChatNode | null };
    const nextNode = payload?.nextNode || null;
    setCurrentNode(nextNode);
    if (nextNode?.message) {
      setLines((prev) => [
        ...prev,
        { id: `bot-${Date.now()}-next`, from: "bot", text: nextNode.message },
      ]);
    }
  };

  const canStart = useMemo(() => !!flowId, [flowId]);

  return (
    <div className="px-3 pb-3">
      <div className="mb-2">
        <label className="form-label small fw-semibold">Flow</label>
        <select
          className="form-select form-select-sm"
          value={flowId}
          onChange={(e) => setFlowId(e.target.value)}
        >
          <option value="">Choose flow</option>
          {flows.map((f) => (
            <option key={f.id} value={f.id}>
              {f.name}
            </option>
          ))}
        </select>
      </div>
      <Button size="sm" className="w-100 mb-3" onClick={start} disabled={!canStart}>
        Start Chat
      </Button>

      <div
        className="border rounded p-2 mb-2"
        style={{ minHeight: 200, maxHeight: 320, overflowY: "auto" }}
      >
        {lines.length === 0 ? (
          <p className="text-muted small mb-0">Start chat to see guided questions.</p>
        ) : (
          lines.map((line) => (
            <div
              key={line.id}
              className={`d-flex mb-2 ${line.from === "user" ? "justify-content-end" : "justify-content-start"}`}
            >
              <div
                className={`px-2 py-1 rounded small ${line.from === "user" ? "bg-primary text-white" : "bg-light"}`}
              >
                {line.text}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="d-flex flex-wrap gap-2">
        {(currentNode?.options || []).map((opt) => (
          <button
            key={opt.id}
            className="btn btn-outline-secondary btn-sm"
            onClick={() => pick(opt)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
};

const OffCanvasTools = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("chatbot");

  const tabs = [
    {
      id: "chatbot",
      title: t("Auth.SupportCenter.Chatbot.Title"),
      icon: faRobot,
      content: <StructuredChatbot />,
    },
    {
      id: "live-support",
      title: t("Auth.SupportCenter.LiveSupport.Title"),
      icon: faHeadset,
      content: <MessagingView singleChat />,
    },
  ];

  return (
    <div>
      <div className="position-fixed vstack gap-2 bottom-50 end-0 me-3">
        {tabs.map(({ id, icon }, i) => (
          <Button
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasTools"
            aria-controls="offcanvasTools"
            onClick={() => setActiveTab(id)}
            key={i}
          >
            <FontAwesomeIcon icon={icon} />
          </Button>
        ))}
      </div>

      <OffcanvasComp
        id="offcanvasTools"
        position="end"
        content={() => (
          <Fragment>
            <h6 className="text-primary fw-bold m-3">
              {tabs.find((tab) => tab.id === activeTab)?.title}
            </h6>
            {tabs.find((tab) => tab.id === activeTab)?.content}
          </Fragment>
        )}
      />
    </div>
  );
};

export default OffCanvasTools;
