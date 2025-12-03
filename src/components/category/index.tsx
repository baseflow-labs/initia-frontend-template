const RenderCategory = ({ data }: { data: string }) => {
  return (
    <small className="bg-opacity-primary p-2 rounded-4 text-sm ms-2 my-auto text-primary">
      {data}
    </small>
  );
};

export default RenderCategory;
