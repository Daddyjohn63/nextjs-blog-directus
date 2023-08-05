import directus from '@/lib/directus';
import { revalidateTag } from 'next/cache';
import Image from 'next/image';

const CTACard = async () => {
  const formAction = async (formData: FormData) => {
    'use server';
    try {
      const email = formData.get('email');
      await directus.items('subscribers').createOne({
        email
      });
      revalidateTag('subscribers-count');
    } catch (error) {
      console.log(error);
    }
  };

  const subscribersCount = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}items/subscribers?meta=total_count&access_token=${process.env.ADMIN_TOKEN}`,
    {
      next: {
        tags: ['subscribers-count']
      }
    }
  )
    .then(res => res.json())
    .then(res => res.meta.total_count)
    .catch(error => console.log(error));

  return (
    <div className="relative overflow-hidden rounded-md bg-slate-100 py-10 px-6">
      {/* overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-white/95 via-white/70 to-white/30" />
      {/* image */}
      <Image
        fill
        alt="CTA Card"
        className="object-cover object-center"
        src="https://images.unsplash.com/photo-1672600830594-ae4ccc159578?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1263&q=80"
      />
      {/* content */}
      <div className="relative z-20">
        <div className="text-lg font-medium">#exploretheworld</div>
        <h3 className="mt-3 text-4xl font-semibold">
          Explore the world with me
        </h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
          eaque corrupti deleniti dignissimos! Corrupti veritatis repellendus
          ducimus dolor quae doloribus officiis suscipit sed, ut est asperiores
          aliquam soluta vero repellat veniam pariatur!
        </p>
        {/* form */}
        <form
          key={subscribersCount + 'subscribers-form'}
          action={formAction}
          className="flex items-center gap-2 mt-6 w-full"
        >
          <input
            type="email"
            name="email"
            placeholder="write your email"
            className="bg-white/80 px-3 py-2 text-base rounded-md outline-none placeholder:text-sm focus:ring-2 ring-neutral-600 w-full md:w-auto"
          />
          <button className="px-3 py-2 rounded-md whitespace-nowrap bg-neutral-900 text-neutral-200">
            Sign Up
          </button>
        </form>
        {/* subscribers */}

        <div className="mt-5 text-neutral-700">
          Join our{' '}
          <span className="bg-neutral-700 rounded-md text-neutral-100 px-2 py-1 text-sm mr-1">
            {subscribersCount}
          </span>
          subscribers now!
        </div>
      </div>
    </div>
  );
};

export default CTACard;
