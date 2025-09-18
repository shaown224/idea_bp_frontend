import { Shield, Search, MessageCircle, Star, Coins, MapPin } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Shield,
      title: 'Verified Properties',
      titleBn: 'যাচাইকৃত সম্পত্তি',
      description: 'All listings are manually verified by our team to ensure quality and authenticity.',
      descriptionBn: 'গুণমান এবং সত্যতা নিশ্চিত করতে আমাদের দল দ্বারা সমস্ত তালিকা যাচাই করা হয়।',
      color: 'text-primary',
      bg: 'bg-primary-light'
    },
    {
      icon: Search,
      title: 'Smart Search',
      titleBn: 'স্মার্ট অনুসন্ধান',
      description: 'Find properties by university, office location, or popular areas with advanced filters.',
      descriptionBn: 'উন্নত ফিল্টার সহ বিশ্ববিদ্যালয়, অফিসের অবস্থান বা জনপ্রিয় এলাকা দ্বারা সম্পত্তি খুঁজুন।',
      color: 'text-accent',
      bg: 'bg-accent-light'
    },
    {
      icon: MessageCircle,
      title: 'Direct Communication',
      titleBn: 'সরাসরি যোগাযোগ',
      description: 'Chat directly with property owners and get instant responses to your queries.',
      descriptionBn: 'সম্পত্তির মালিকদের সাথে সরাসরি চ্যাট করুন এবং আপনার প্রশ্নের তাৎক্ষণিক উত্তর পান।',
      color: 'text-secondary',
      bg: 'bg-secondary-light'
    },
    {
      icon: Star,
      title: 'Review System',
      titleBn: 'পর্যালোচনা সিস্টেম',
      description: 'Read genuine reviews from previous tenants to make informed decisions.',
      descriptionBn: 'সচেতন সিদ্ধান্ত নিতে পূর্ববর্তী ভাড়াটেদের প্রকৃত পর্যালোচনা পড়ুন।',
      color: 'text-primary',
      bg: 'bg-primary-light'
    },
    {
      icon: Coins,
      title: 'Point-Based System',
      titleBn: 'পয়েন্ট-ভিত্তিক সিস্টেম',
      description: 'Pay only for what you use. 1 point = ৳10. Get 5 free points on signup!',
      descriptionBn: 'শুধুমাত্র যা ব্যবহার করেন তার জন্য অর্থ প্রদান করুন। ১ পয়েন্ট = ১০ টাকা। সাইন আপে ৫টি ফ্রি পয়েন্ট!',
      color: 'text-accent',
      bg: 'bg-accent-light'
    },
    {
      icon: MapPin,
      title: 'Local Coverage',
      titleBn: 'স্থানীয় কভারেজ',
      description: 'Properties across 50+ areas in Dhaka and expanding to other cities.',
      descriptionBn: 'ঢাকার ৫০+ এলাকা জুড়ে সম্পত্তি এবং অন্যান্য শহরে সম্প্রসারণ।',
      color: 'text-secondary',
      bg: 'bg-secondary-light'
    }
  ];

  return (
    <section id="features" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose Bachelor Point?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We&apos;ve built the most trusted platform for students and bachelors to find verified accommodation in Bangladesh.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="group p-6 bg-card rounded-xl shadow-card border border-border hover:shadow-soft transition-smooth"
              >
                <div className={`inline-flex p-3 rounded-lg ${feature.bg} mb-4 group-hover:scale-110 transition-bounce`}>
                  <IconComponent className={`h-6 w-6 ${feature.color}`} />
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <div className="mt-20 bg-card rounded-2xl shadow-card border border-border p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold gradient-primary bg-clip-text text-gray mb-2">
                10,000+
              </div>
              <div className="text-muted-foreground">Happy Students</div>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-primary bg-clip-text text-gray mb-2">
                2,500+
              </div>
              <div className="text-muted-foreground">Verified Properties</div>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-primary bg-clip-text text-gray mb-2">
                50+
              </div>
              <div className="text-muted-foreground">Areas Covered</div>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-primary bg-clip-text text-gray mb-2">
                4.8/5
              </div>
              <div className="text-muted-foreground">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;