export async function getStaticPaths() {
  const paths = [
    { params: { dynamicRoute: 'route1' } },
    { params: { dynamicRoute: 'route2' } },
  ];

  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }: { params: { dynamicRoute: string } }) {
  const { dynamicRoute } = params;

  console.log("Dynamic Route:", dynamicRoute);

  return {
    props: {
      dynamicRoute,
    },
  };
}

const DynamicRoutePage = ({ dynamicRoute }: { dynamicRoute: string }) => {
  return (
    <div>
      <h1>Página para: {dynamicRoute}</h1>
    </div>
  );
};

export default DynamicRoutePage;
