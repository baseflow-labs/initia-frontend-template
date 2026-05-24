import Button from "@initia/shared/ui/components/core/button";
import Form from "@initia/shared/ui/components/form";
import TabsComp from "@initia/shared/ui/components/tab";
import PageTemplate from "@initia/shared/ui/layouts/auth/pages/pageTemplate";
import { useEffect, useMemo, useState } from "react";

import {
  addNode,
  addOption,
  createFlow,
  deleteNode,
  deleteOption,
  getFlows,
  updateFlow,
  updateNode,
  updateOption,
} from "../../../../api/chatbot";

interface Option {
  id: string;
  label: string;
  nextNodeId?: string;
  endsFlow?: boolean;
}
interface Node {
  id: string;
  title: string;
  message: string;
  isStart: boolean;
  posX?: number;
  posY?: number;
  options?: Option[];
}
interface Flow {
  id: string;
  name: string;
  locale: string;
  isActive: boolean;
  nodes?: Node[];
}

const ChatbotBuilderView = () => {
  const [flows, setFlows] = useState<Flow[]>([]);
  const [selectedFlowId, setSelectedFlowId] = useState("");
  const [editing, setEditing] = useState<Flow | null>(null);
  const [editingNodeId, setEditingNodeId] = useState("");
  const [addingOptionForNode, setAddingOptionForNode] = useState("");
  const [editingOptionId, setEditingOptionId] = useState("");
  const [draggedNodeId, setDraggedNodeId] = useState("");

  const load = async () => {
    const res = await getFlows();
    const payload = (res.payload || []) as unknown as Flow[];
    setFlows(payload);
    if (!selectedFlowId && payload[0]?.id) setSelectedFlowId(payload[0].id);
  };

  useEffect(() => {
    load();
  }, []);

  const selectedFlow = useMemo(
    () => flows.find((f) => f.id === selectedFlowId),
    [flows, selectedFlowId]
  );
  const nodes = selectedFlow?.nodes || [];

  const nodeMap = useMemo(() => {
    const m: Record<string, Node> = {};
    nodes.forEach((n) => (m[n.id] = n));
    return m;
  }, [nodes]);

  const autoLayout = async () => {
    for (let i = 0; i < nodes.length; i += 1) {
      const n = nodes[i];
      await updateNode(n.id, { posX: i % 2 === 0 ? 80 : 420, posY: 40 + Math.floor(i / 2) * 160 });
    }
    await load();
  };

  const flowMap = (
    <div className="card shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h6 className="mb-0">Graph Canvas</h6>
          <Button size="sm" onClick={autoLayout}>
            Auto-layout
          </Button>
        </div>
        <svg
          width="100%"
          height={Math.max(420, nodes.length * 180)}
          style={{ border: "1px solid #e5e7eb", borderRadius: 8 }}
        >
          <defs>
            <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#64748b" />
            </marker>
          </defs>

          {nodes.flatMap((node) =>
            (node.options || []).map((opt) => {
              if (opt.endsFlow || !opt.nextNodeId) return null;
              const target = nodeMap[opt.nextNodeId];
              if (!target) return null;
              const x1 = (node.posX || 80) + 260;
              const y1 = (node.posY || 40) + 35;
              const x2 = target.posX || 80;
              const y2 = (target.posY || 40) + 35;
              const c1x = x1 + 80;
              const c2x = x2 - 80;
              const d = `M ${x1} ${y1} C ${c1x} ${y1}, ${c2x} ${y2}, ${x2} ${y2}`;
              return (
                <g key={`edge-${opt.id}`}>
                  <path
                    d={d}
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth="1.7"
                    markerEnd="url(#arrow)"
                  />
                  <text x={(x1 + x2) / 2} y={(y1 + y2) / 2 - 6} fontSize="10" fill="#334155">
                    {opt.label}
                  </text>
                </g>
              );
            })
          )}

          {nodes.map((node) => (
            <g
              key={node.id}
              transform={`translate(${node.posX || 80}, ${node.posY || 40})`}
              onMouseDown={() => setDraggedNodeId(node.id)}
            >
              <rect
                width="260"
                height="72"
                rx="10"
                fill="#fff"
                stroke={node.isStart ? "#0d6efd" : "#cbd5e1"}
                strokeWidth={node.isStart ? 2 : 1}
              />
              <text x="12" y="24" fontSize="13" fontWeight="bold" fill="#111827">
                {node.title}
              </text>
              <text x="12" y="44" fontSize="11" fill="#6b7280">
                {node.isStart ? "START NODE" : "QUESTION NODE"}
              </text>
            </g>
          ))}
        </svg>

        {draggedNodeId && (
          <div
            className="mt-2 small text-muted"
            onMouseMove={async (e) => {
              const svg = (
                e.currentTarget.previousElementSibling as SVGElement
              ).getBoundingClientRect();
              const x = Math.max(20, Math.round(e.clientX - svg.left - 130));
              const y = Math.max(20, Math.round(e.clientY - svg.top - 35));
              await updateNode(draggedNodeId, { posX: x, posY: y });
              await load();
            }}
            onMouseUp={() => setDraggedNodeId("")}
          >
            Dragging node. Release mouse to drop.
          </div>
        )}
      </div>
    </div>
  );

  return (
    <PageTemplate title="Chatbot Flow Builder v3">
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h6 className="mb-3">{editing ? "Update Flow" : "Create Flow"}</h6>
          <Form
            initialValues={editing || { name: "", locale: "en", isActive: true }}
            onFormSubmit={async (values) => {
              if (editing?.id) await updateFlow(editing.id, values || {});
              else await createFlow(values || {});
              setEditing(null);
              await load();
            }}
            inputs={() => [
              { name: "name", label: "Flow Name", type: "text", required: true, double: true },
              { name: "locale", label: "Locale", type: "text", required: true, double: true },
              { name: "isActive", label: "Active", type: "switch", required: false },
            ]}
          />
          <hr />
          <label className="form-label fw-bold">Select Flow to Build</label>
          <select
            className="form-select"
            value={selectedFlowId}
            onChange={(e) => setSelectedFlowId(e.target.value)}
          >
            <option value="">Choose...</option>
            {flows.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name} ({f.locale})
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedFlow && (
        <TabsComp
          items={[
            {
              id: "builder",
              title: "Builder",
              content: (
                <>
                  <div className="card shadow-sm mb-4">
                    <div className="card-body">
                      <h6 className="mb-3">Add Question Node</h6>
                      <Form
                        onFormSubmit={async (values) => {
                          await addNode(selectedFlow.id, values || {});
                          await load();
                        }}
                        inputs={() => [
                          {
                            name: "title",
                            label: "Question Title",
                            type: "text",
                            required: true,
                            fullWidth: true,
                          },
                          {
                            name: "message",
                            label: "Question/Message",
                            type: "textarea",
                            required: true,
                            rows: 4,
                            fullWidth: true,
                          },
                          {
                            name: "isStart",
                            label: "Is Start Question",
                            type: "switch",
                            required: false,
                          },
                        ]}
                      />
                    </div>
                  </div>

                  {nodes.map((node) => (
                    <div className="card shadow-sm mb-3" key={node.id}>
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <div>
                            <h6 className="mb-1">
                              {node.title}{" "}
                              {node.isStart ? (
                                <span className="badge bg-primary">Start</span>
                              ) : null}
                            </h6>
                            <p className="mb-1 text-muted">{node.message}</p>
                          </div>
                          <div className="d-flex gap-2">
                            <Button size="sm" onClick={() => setEditingNodeId(node.id)}>
                              Edit Node
                            </Button>
                            <Button
                              size="sm"
                              color="danger"
                              onClick={async () => {
                                await deleteNode(node.id);
                                await load();
                              }}
                            >
                              Delete Node
                            </Button>
                          </div>
                        </div>
                        {editingNodeId === node.id && (
                          <div className="border rounded p-3 mb-3 bg-light-subtle">
                            <Form
                              initialValues={node}
                              onFormSubmit={async (values) => {
                                await updateNode(node.id, values || {});
                                setEditingNodeId("");
                                await load();
                              }}
                              inputs={() => [
                                {
                                  name: "title",
                                  label: "Question Title",
                                  type: "text",
                                  required: true,
                                  fullWidth: true,
                                },
                                {
                                  name: "message",
                                  label: "Question/Message",
                                  type: "textarea",
                                  required: true,
                                  rows: 4,
                                  fullWidth: true,
                                },
                                {
                                  name: "isStart",
                                  label: "Is Start Question",
                                  type: "switch",
                                  required: false,
                                },
                              ]}
                            />
                          </div>
                        )}
                        <div className="border rounded p-3 bg-light-subtle">
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <strong>Options / Branches</strong>
                            <Button size="sm" onClick={() => setAddingOptionForNode(node.id)}>
                              Add Option
                            </Button>
                          </div>
                          {(node.options || []).map((opt) => (
                            <div key={opt.id} className="border rounded p-2 bg-white mb-2">
                              <div className="d-flex justify-content-between align-items-center">
                                <div>
                                  <div className="fw-semibold">{opt.label}</div>
                                  <small className="text-muted">
                                    {opt.endsFlow
                                      ? "Ends flow"
                                      : `Next: ${nodeMap[opt.nextNodeId || ""]?.title || "Not mapped"}`}
                                  </small>
                                </div>
                                <div className="d-flex gap-2">
                                  <Button size="sm" onClick={() => setEditingOptionId(opt.id)}>
                                    Edit
                                  </Button>
                                  <Button
                                    size="sm"
                                    color="danger"
                                    onClick={async () => {
                                      await deleteOption(opt.id);
                                      await load();
                                    }}
                                  >
                                    Remove
                                  </Button>
                                </div>
                              </div>
                              {editingOptionId === opt.id && (
                                <div className="mt-2 border-top pt-2">
                                  <Form
                                    initialValues={opt}
                                    onFormSubmit={async (values) => {
                                      await updateOption(opt.id, values || {});
                                      setEditingOptionId("");
                                      await load();
                                    }}
                                    inputs={() => [
                                      {
                                        name: "label",
                                        label: "Option Label",
                                        type: "text",
                                        required: true,
                                        fullWidth: true,
                                      },
                                      {
                                        name: "nextNodeId",
                                        label: "Next Question",
                                        type: "select",
                                        required: false,
                                        fullWidth: true,
                                        options: nodes
                                          .filter((n) => n.id !== node.id)
                                          .map((n) => ({ value: n.id, label: n.title })),
                                      },
                                      {
                                        name: "endsFlow",
                                        label: "Ends Flow",
                                        type: "switch",
                                        required: false,
                                      },
                                    ]}
                                  />
                                </div>
                              )}
                            </div>
                          ))}
                          {addingOptionForNode === node.id && (
                            <div className="mt-2 border-top pt-2">
                              <Form
                                onFormSubmit={async (values) => {
                                  await addOption(node.id, values || {});
                                  setAddingOptionForNode("");
                                  await load();
                                }}
                                inputs={() => [
                                  {
                                    name: "label",
                                    label: "Option Label",
                                    type: "text",
                                    required: true,
                                    fullWidth: true,
                                  },
                                  {
                                    name: "nextNodeId",
                                    label: "Next Question",
                                    type: "select",
                                    required: false,
                                    fullWidth: true,
                                    options: nodes
                                      .filter((n) => n.id !== node.id)
                                      .map((n) => ({ value: n.id, label: n.title })),
                                  },
                                  {
                                    name: "endsFlow",
                                    label: "Ends Flow",
                                    type: "switch",
                                    required: false,
                                  },
                                ]}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ),
            },
            { id: "map", title: "Flow Map", content: flowMap },
          ]}
        />
      )}
    </PageTemplate>
  );
};

export default ChatbotBuilderView;
