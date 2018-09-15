import Layout from '../components/MyLayout.js';
import fetch from 'isomorphic-unfetch';
import Link from 'next/link';
import Markdown from 'react-markdown';

const PostBase = (props) => (
  <div>
    <h1>{props.show.name}</h1>

    <div className="markdown">
      <Markdown source={`
        This is our blog post.
        Yes. We can have a [link](/link).
        And we can have a title as well.

        ### This is a title

        And here's the content.
      `}/>
    </div>
    <style jsx global>{`
     .markdown {
       font-family: 'Arial';
     }

     .markdown a {
       text-decoration: none;
       color: blue;
     }

     .markdown a:hover {
       opacity: 0.6;
     }

     .markdown h3 {
       margin: 0;
       padding: 0;
       text-transform: uppercase;
     }
  `}</style>

    <p>{props.show.summary.replace(/<[/]?p>/g, '')}</p>
    <Link href={props.show.url} prefetch>
      <a target="_blank">
        <img src={props.show.image.medium} alt={props.show.name} />
      </a>
    </Link>
  </div>
);

const Post = (props) => (
  <Layout>
    <PostBase {...props} />
  </Layout>
);

Post.getInitialProps = async (context) => {
  const {
    id
  } = context.query;
  const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
  const show = await res.json();

  return {
    show
  };
};

export default Post;