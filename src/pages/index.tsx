import { GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image'
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { getPrismicClient } from '../services/prismic';
import commonStyles from '../styles/common.module.scss';
import { PostItem } from '../components/postItem';

import styles from './home.module.scss';
import { RichText } from 'prismic-dom';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
    content: string;
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
  const [nextPage, setNextPage] = useState(null);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const { next_page, results } = postsPagination;

    setPosts(results);
    setNextPage(next_page)
  }, []);

  const handleLoadMore = () => {
    fetch(nextPage)
    .then(resp => resp.json())
    .then(data => {
      const dataResults = data.results.map(post => {
        const { uid, data, first_publication_date } = post;
    
        return {
          uid,
          first_publication_date: format(
            new Date(first_publication_date),
              "dd MMM yyyy",
              { locale: ptBR }
          ),
          data
        }
      })
      setPosts(posts.concat(dataResults))
      setNextPage(data.next_page)
    })
  }

  return (
    <>
      <Head>
        <title>Home | spacetraveling</title>
      </Head>

      <main className={styles.container}>
        <Image src="/static/images/Logo.png" alt="logo" width="240" height="26" />
        <div className={styles.posts}>
          { posts.map(post => <PostItem post={post}/>) }
          {
            nextPage &&
            <button 
              className={styles.loadmore}
              onClick={handleLoadMore}
            >Carregar mais posts</button>
          }
        </div>
      </main>
    </>
  )
}

export const getStaticProps = async () => {
  const prismic = getPrismicClient({});
  const postsResponse = await prismic.getByType('post', { pageSize: 1 });
  const posts = postsResponse.results.map(post => {
    const { uid, data, first_publication_date } = post;

    return {
      uid,
      first_publication_date: format(
        new Date(first_publication_date),
          "dd MMM yyyy",
          { locale: ptBR }
      ),
      data
    }
  })

  return {
    props: {
      postsPagination: {
        next_page: postsResponse.next_page,
        results: posts,
      }
    }
  }
};
