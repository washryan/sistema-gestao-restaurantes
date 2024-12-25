import { GetStaticPaths, GetStaticProps } from 'next'

export const getStaticPaths: GetStaticPaths = async () => {
  // Defina os caminhos que você deseja pré-renderizar
  const paths = [
    { params: { slug: 'dashboard' } },
    { params: { slug: 'menu' } },
    // Adicione mais rotas conforme necessário
  ]

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string }
  // Busque dados com base no slug
  return { props: { slug } }
}

const DynamicPage = ({ slug }: { slug: string }) => {
  return <h1>Página para: {slug}</h1>
}

export default DynamicPage