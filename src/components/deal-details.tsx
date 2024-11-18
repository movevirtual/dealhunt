import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Menu, Copy, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { CategoryList } from './category-list';
import { MobileNav } from './mobile-nav';
import { VoteButtons } from './vote-buttons';
import { RainbowButton } from '@/components/magicui/rainbow-button';
import { Nav } from './layout/nav';
import { deals } from '@/data/deals';
import { createSlug } from '@/lib/utils';

const categories = [
  {
    section: "Browse",
    items: [
      { id: 'all', label: 'All Deals', title: "Today's Deals", subtitle: "Curated deals for everyone" },
      { id: 'featured', label: 'Featured Deals', title: "Featured Deals", subtitle: "Hand-picked premium offers" },
      { id: 'new', label: 'New Deals', title: "New Deals", subtitle: "Latest additions to our collection" },
      { id: 'ai', label: 'AI Tools', title: "AI Tools", subtitle: "Level up with AI technology" },
      { id: 'blackfriday', label: 'Black Friday', title: "Black Friday Deals", subtitle: "Best deals of the year" },
      { id: 'ending', label: 'Ending Soon', title: "Ending Soon", subtitle: "Last chance to save" },
    ]
  },
  {
    section: "Categories",
    items: [
      { id: 'saas', label: 'SaaS Tools', title: "SaaS Deals", subtitle: "Software as a Service solutions" },
      { id: 'dev', label: 'Developer Tools', title: "Developer Tools", subtitle: "Essential tools for developers" },
      { id: 'design', label: 'Design Resources', title: "Design Resources", subtitle: "Premium design assets & tools" },
      { id: 'hosting', label: 'Hosting & Domains', title: "Hosting & Domains", subtitle: "Web hosting and domain deals" },
      { id: 'marketing', label: 'Marketing', title: "Marketing Tools", subtitle: "Grow your audience for less" },
      { id: 'productivity', label: 'Productivity', title: "Productivity Tools", subtitle: "Get more done for less" },
      { id: 'business', label: 'Business & Finance', title: "Business Tools", subtitle: "Essential business solutions" },
      { id: 'education', label: 'Learning', title: "Education Deals", subtitle: "Courses and learning resources" }
    ]
  },
  {
    section: "Technology",
    items: [
      { id: 'nocode', label: 'No-Code Tools', title: "No-Code Platform Deals", subtitle: "Build without coding" },
      { id: 'database', label: 'Database & Backend', title: "Database Solutions", subtitle: "Data storage & management" },
      { id: 'analytics', label: 'Analytics', title: "Analytics Tools", subtitle: "Data insights & tracking" }
    ]
  }
];

export const DealDetails = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { dealSlug } = useParams();
  const navigate = useNavigate();
  
  const deal = deals.find(d => createSlug(d.title) === dealSlug);

  if (!deal) {
    return <div>Deal not found</div>;
  }

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    navigate('/');
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Nav onOpenMobileNav={() => setIsMobileNavOpen(true)} />

      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategorySelect}
        isDark={false}
      />

      <div className="flex">
        <aside className="hidden md:flex w-64 border-r border-gray-200 h-[calc(100vh-64px)] sticky top-16 flex-col">
          <div className="flex-1 overflow-y-auto p-4">
            {categories.map(({ section, items }) => (
              <CategoryList
                key={section}
                section={section}
                items={items}
                selectedCategory={selectedCategory}
                onSelectCategory={handleCategorySelect}
                isDark={false}
              />
            ))}
          </div>

          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="p-4 bg-gray-100 rounded-lg">
              <h3 className="font-medium mb-2">Get Featured</h3>
              <p className="text-sm text-gray-600 mb-4">
                Feature your product deals for just $9 $̶4̶9̶ (for 7 days).
              </p>
              <a href="https://buy.stripe.com/cN29Bidj7goMh0c29S" target="_blank" rel="noopener noreferrer">
                <RainbowButton className="w-full">
                  Get Featured Today!
                </RainbowButton>
              </a>
            </div>
          </div>
        </aside>

        <main className="flex-1">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 pb-32">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-3xl font-bold">{deal.title}</h1>
                {deal.featured && (
                  <span className="px-2 py-0.5 text-xs font-medium bg-yellow-500 text-black rounded-full">
                    Featured
                  </span>
                )}
              </div>
              <p className="text-lg text-gray-600">
                {deal.description}
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Features</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {deal.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-700">
                    <span className="text-green-500">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">About</h2>
              <p className="text-gray-700">
                {deal.longDescription}
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Stats</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {deal.stats.map((stat, index) => (
                  <div key={index} className="p-4 rounded-lg bg-gray-100">
                    <div className="text-2xl font-bold mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Reviews</h2>
              <div className="space-y-4">
                {deal.reviews.map((review, index) => (
                  <div key={index} className="p-4 rounded-lg bg-gray-100">
                    <p className="mb-3">{review.content}</p>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">{review.author}</span>
                      {review.role && <span> · {review.role}</span>}
                      {review.company && <span> · {review.company}</span>}
                    </div>
                    <div className="text-xs mt-1 text-gray-400">
                      via {review.source}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="fixed bottom-0 left-0 md:left-64 right-0 p-4 bg-white/80 backdrop-blur-sm border-t border-gray-200">
            <div className="max-w-4xl mx-auto flex items-center gap-4">
              <div className="flex-shrink-0">
                <VoteButtons dealId={deal.id} />
              </div>
              {deal.promoCode && (
                <Button
                  variant="outline"
                  className="gap-2 bg-gray-50 border-2 hover:bg-gray-100 transition-colors"
                  onClick={() => handleCopyCode(deal.promoCode!)}
                >
                  <span className="font-medium">{deal.promoCode}</span>
                  {copied ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4 text-gray-500" />
                  )}
                </Button>
              )}
              <a 
                href={deal.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button variant="primary" className="w-full h-10">
                  Get This Deal
                </Button>
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};