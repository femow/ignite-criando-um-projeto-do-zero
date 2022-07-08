import { GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image'
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { getPrismicClient } from '../services/prismic';
import commonStyles from '../styles/common.module.scss';
import { PostItem } from '../components/postItem';

import styles from './home.module.scss';

export interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps ) {
  const { next_page, results: posts } = postsPagination;

  return (
    <>
      <Head>
        <title>Home | spacetraveling</title>
      </Head>

      <main className={styles.container}>
        <Image src="/static/images/Logo.png" alt="logo" width="240" height="26" />
        <div className={styles.posts}>
          {
            posts.map(post => <PostItem post={post}/>)
          }
        </div>
      </main>
    </>
  )
}

export const getStaticProps = async () => {
  const prismic = getPrismicClient({});
  const postsResponse = await prismic.getByType('post');
  const posts = postsResponse.results.map(post => ({
      ...post,
      first_publication_date: format(
        new Date(post.first_publication_date),
        "dd/MM/yyyy",
        { locale: ptBR }
      )
    })
  )
  
  console.log(posts);
  

  return {
    props: {
      postsPagination: {
        next_page: postsResponse.next_page,
        results: posts,
      }
    }
  }
};
