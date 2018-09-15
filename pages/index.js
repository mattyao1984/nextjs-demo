import Link from 'next/link';
import Layout from '../components/MyLayout';
import fetch from 'isomorphic-unfetch';

const PostLink = (props) => (
  <li>
    <Link href={`/post?id=${props.id}`} as={`/post/${props.id}`}>
      <a>{props.name}</a>
    </Link>
    <style jsx>{`
      li {
        list-style: none;
        margin: 5px 0;
      }

      a {
        text-decoration: none;
        color: blue;
        font-family: "Arial";
      }

      a:hover {
        opacity: 0.6;
      }
    `}</style>
  </li>
);

const Home = (props) => (
  <Layout>
    <h1>Batman TV Shows</h1>
    <ul>
      { 
        props.shows.map(link => <PostLink key={link.show.id} id={link.show.id} name={link.show.name} />)  
      }
    </ul>
    <style jsx>{`
      h1, a {
        font-family: "Arial"
      }
      
      ul {
        padding: 0;
      }
    `}</style>
  </Layout>
);

Home.getInitialProps = async () => {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman');
  const data = await res.json();

  console.log(`Show data fetched. Count: `, data.length);

  return {
    shows: data
  };
};

export default Home;