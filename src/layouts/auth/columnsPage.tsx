interface Props {
  children: React.ReactNode;
}

const ColumnsPage = ({ children }: Props) => {
  return <div className="row">{children}</div>;
};

export default ColumnsPage;
