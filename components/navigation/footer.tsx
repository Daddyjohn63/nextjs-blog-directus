import siteConfig from '@/config/site';
import PaddingContainer from '../layout/padding-container';
import Link from 'next/link';
import Sociallink from '../elements/social-link';

const Footer = () => {
  return (
    <div className="py-8 border-t mt-10 ">
      <PaddingContainer>
        <div>
          <h2 className="text-3xl font-bold">{siteConfig.siteName}</h2>
          <p className="max-w-md mt-2 text-neutral-700 text-lg">
            {siteConfig.description}
          </p>
        </div>
        {/* social and currently at */}
        <div className="mt-6 flex flex-wrap justify-between gap-4">
          <div>
            <div className="font-medium text-lg">#exploretheworld</div>
            <div className="flex items-center gap-3 text-neutral-600 mt-2">
              <Sociallink
                platform="twitter"
                link={siteConfig.socialLinks.twitter}
              />
              <Sociallink
                platform="instagram"
                link={siteConfig.socialLinks.instagram}
              />
              <Sociallink
                platform="youtube"
                link={siteConfig.socialLinks.youtube}
              />
              <Sociallink
                platform="linkedin"
                link={siteConfig.socialLinks.linkedin}
              />
              <Sociallink
                platform="github"
                link={siteConfig.socialLinks.github}
              />
            </div>
          </div>

          <div>
            <div className="text-sm text-neutral-400">Currently At</div>
            <div className="px-3 py-2 bg-white rounded-md shadow-md flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              {siteConfig.currentlyAt}
            </div>
          </div>
        </div>
        {/* bottom section */}
        <div className="flex flex-wrap items-center gap-4 justify-between mt-16 border-t py-3">
          <div className="text-sm text-neutral-400">
            Allrights reserved | Copyright {new Date().getFullYear()}
          </div>
          <div className="text-sm">
            Made with love by{' '}
            <Link
              className="underline underline-offset-4"
              href="https://webandprosper.co.uk"
            >
              John Paul
            </Link>
          </div>
        </div>
      </PaddingContainer>
    </div>
  );
};

export default Footer;
