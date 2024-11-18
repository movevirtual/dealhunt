import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, PackageSearch } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { CategoryList } from './category-list';
import { NotificationDialog } from './notification-dialog';
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

export const DevDeals = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric' 
  });

  const filteredDeals = deals.filter(deal => 
    selectedCategory === 'all' || 
    deal.category.toLowerCase().includes(selectedCategory.toLowerCase())
  );

  const currentCategory = categories.flatMap(cat => cat.items).find(cat => cat.id === selectedCategory);
  const pageTitle = currentCategory?.id === 'all' 
    ? `${currentCategory.title}, ${formattedDate}`
    : currentCategory?.title;

  const handleDealClick = (e: React.MouseEvent, dealId: number) => {
    if ((e.target as HTMLElement).closest('.vote-buttons')) {
      e.preventDefault();
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Nav onOpenMobileNav={() => setIsMobileNavOpen(true)} />

      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={(category) => {
          setSelectedCategory(category);
          setIsMobileNavOpen(false);
        }}
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
                onSelectCategory={setSelectedCategory}
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

        <main className="flex-1 p-4 sm:p-6">
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">{pageTitle}</h1>
            <p className="text-gray-600">
              {currentCategory?.subtitle}
            </p>
          </div>

          <div className="flex gap-4 mb-6 md:hidden">
            <NotificationDialog isDark={false} className="flex-1" />
            <a 
              href="https://buy.stripe.com/cN29Bidj7goMh0c29S" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1"
            >
              <RainbowButton className="w-full flex items-center justify-center gap-2">
                Get Featured $9
              </RainbowButton>
            </a>
          </div>

          {filteredDeals.length > 0 ? (
            <div className="space-y-4">
              {filteredDeals.map((deal) => (
                <Link 
                  key={deal.id} 
                  to={`/${createSlug(deal.title)}`}
                  className="block hover:bg-gray-50 transition-colors rounded-lg"
                  onClick={(e) => handleDealClick(e, deal.id)}
                >
                  <div className="p-4 border-gray-200 border rounded-lg">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-medium truncate">{deal.title}</h3>
                          <div className="flex gap-2 flex-wrap">
                            {deal.featured && (
                              <span className="px-2 py-0.5 text-xs font-medium bg-yellow-500 text-black rounded-full">
                                Featured
                              </span>
                            )}
                            {deal.title === "Stripe Atlas" && (
                              <span className="px-2 py-0.5 text-xs font-medium bg-blue-500 text-white rounded-full">
                                Best Value
                              </span>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          {deal.description}
                        </p>
                        <div className="flex items-center gap-4">
                          <div className="vote-buttons">
                            <VoteButtons dealId={deal.id} />
                          </div>
                          <div className="text-sm text-gray-600">
                            {deal.category}
                          </div>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-emerald-700 font-medium whitespace-nowrap">
                          {deal.discount}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <PackageSearch className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No deals found</h3>
              <p className="text-gray-600 mb-8">
                There are currently no deals in this category. Want to be the first?
              </p>
              <NotificationDialog isDark={false}>
                <Button variant="primary" className="gap-2">
                  <DollarSign className="h-4 w-4" />
                  Submit a Deal
                </Button>
              </NotificationDialog>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};