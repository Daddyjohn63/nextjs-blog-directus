import { DUMMY_POSTS } from '@/DUMMY_DATA';
import { notFound } from 'next/navigation';
import PaddingContainer from '@/components/layout/padding-container';
import PostHero from '@/components/post/post-hero';
import Sociallink from '@/components/elements/social-link';
import PostBody from '@/components/post/post-body';
import CTACard from '@/components/elements/cta-card';
import directus from '@/lib/directus';

export const generateStaticParams = async () => {
  // return DUMMY_POSTS.map(post => {
  //   return {
  //     slug: post.slug
  //   };
  // });
  try {
    const posts = await directus.items('post').readByQuery({
      filter: {
        status: {
          _eq: 'published'
        }
      },
      fields: ['slug']
    });

    const params = posts?.data?.map(post => {
      return {
        slug: post.slug as string
      };
    });
    return params || [];
  } catch (error) {
    throw new Error('Error fetching posts');
  }
};

const Page = async ({
  params
}: {
  params: {
    slug: string;
  };
}) => {
  // return <div>{params.slug}</div>;
  // const post = DUMMY_POSTS.find(post => post.slug === params.slug);
  // console.log(post);

  const getPostData = async () => {
    try {
      const post = await directus.items('post').readByQuery({
        filter: {
          slug: {
            _eq: params.slug
          }
        },
        fields: [
          '*',
          'category.id',
          'category.title',
          'author.id',
          'author.first_name',
          'author.last_name'
        ]
      });

      return post?.data?.[0];
    } catch (error) {}
  };

  const post = await getPostData();

  if (!post) {
    notFound();
  }
  //return <PaddingContainer> {post?.title}</PaddingContainer>; //we add the ? in case there is no title available
  return (
    <PaddingContainer>
      {/* container */}
      <div className="space-y-10">
        {/* Post hero */}
        <PostHero post={post} />
        {/* post body and social share */}
        <div className="flex flex-col md:flex-row gap-10">
          <div className="relative">
            <div className="sticky flex md:flex-col gap-5 top-20 items-center">
              <div className="font-medium md:hidden">Share this content:</div>
              <Sociallink
                isShareURL
                platform="facebook"
                link={`https://www.facebook.com/sharer/sharer.php?u=${`${process.env.NEXT_PUBLIC_SITE_URL}/post/${post.slug}`}`}
              />
              <Sociallink
                isShareURL
                platform="twitter"
                link={`https://twitter.com/intent/tweet?url=${`${process.env.NEXT_PUBLIC_SITE_URL}/post/${post.slug}`}`}
              />
              <Sociallink
                isShareURL
                platform="linkedin"
                link={`https://www.linkedin.com/shareArticle?mini=true&url=${`${process.env.NEXT_PUBLIC_SITE_URL}/post/${post.slug}`}`}
              />
            </div>
          </div>

          <PostBody body={post.body} />
        </div>
        {/* CTA Card */}

        <CTACard />
      </div>
    </PaddingContainer>
  );
};

export default Page;
