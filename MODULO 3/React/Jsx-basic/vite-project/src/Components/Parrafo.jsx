export const Parrafo = (props) => {
  const { texto, className } = props;
  console.log("Estafa", props);

  return <p className={className}>{texto}</p>;
};
