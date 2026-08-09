module ResumeData
  def self.placeholder
    {
      user: {
        id: "usr_9482710384",
        email: "alex.mercer@example.com",
        avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
        username: "alexmercer",
        full_name: "Alex Mercer",
      },
      resume: {
        role: "Senior Frontend Engineer",
        bio: "Passionate software engineer with over 6 years of experience building scalable web applications, design systems, and high-performance user interfaces using React, TypeScript, and modern CSS architecture.",
        linkedin_url: "/",
        website_url: "https://google.com",
        location: "San Francisco, CA",
        highlights: [
          "Led legacy frontend migration to Next.js, boosting load speeds by 45%.",
          "Mentored 5 junior devs, standardizing code reviews and test pipelines.",
          "Architected an accessible design system adopted across 8 product teams.",
        ],
      },
      projects: projects,
      education: {
        school: "University of California, Berkeley",
        degree: "Bachelor of Science",
        major: "Computer Science",
        gpa: "3.8 / 4.0",
        start_year: 2016,
        end_year: 2020,
      },
    }
  end

  private

  def projects
    [
      {
        id: "proj_01",
        year: 2025,
        title: "PulseUI Component Library",
        url: "https://pulseui.dev",
        description: "An open-source, highly accessible React component library built with Tailwind CSS and Radix UI primitives.",
        highlights: [
          "Achieved 100% WCAG compliance across all 35+ core components.",
          "Grew to over 2,400 GitHub stars within the first three months of release.",
        ],
        images: [
          "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
        ],
        image_ids: ["img_pulse_01", "img_pulse_02"],
      },
    ]
  end
end
