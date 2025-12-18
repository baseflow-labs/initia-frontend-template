export const inputs = (t: Function) => () => [
  {
    name: "dataFile",
    label: t("Auth.Settings.Admin.BulkDataInsertion.DataFileUpload"),
    type: "file",
  },
];

export const dependencyBasedOrder = (items: string[], relations: string[]) => {
  const graph: Record<string, string[]> = {};
  const inDegree: Record<string, number> = {};

  items.forEach(item => {
    graph[item] = [];
    inDegree[item] = 0;
  });

  relations.forEach(relation => {
    const [from, to] = relation.split('>');
    graph[from].push(to);
    inDegree[to]++;
  });

  const queue: string[] = [];
  items.forEach(item => {
    if (inDegree[item] === 0) {
      queue.push(item);
    }
  });

  const ordered: string[] = [];
  while (queue.length > 0) {
    const current = queue.shift()!;
    ordered.push(current);

    graph[current].forEach(neighbor => {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) {
        queue.push(neighbor);
      }
    });
  }

  if (ordered.length !== items.length) {
    throw new Error("Cyclic dependency detected");
  }

  return ordered;
}