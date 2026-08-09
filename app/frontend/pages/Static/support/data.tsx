import { BriefcaseIcon, ChartPieIcon, FileTextIcon, FolderGit2Icon, GraduationCapIcon, Link2Icon, ShareIcon, ShieldCheckIcon, UserIcon} from "lucide-react"

export const mainFeatures = [
	{
		icon: <FileTextIcon />,
		label: "Create a professional resume from a variety of clean templates."
	},
	{
		icon: <ChartPieIcon />,
		label: "Track key metrics about your profile - page views, bounce rates, and more."
	},
	{
		icon: <ShareIcon />,
		label: "Publish a custom digital resume that updates everywhere in seconds."
	},
]

export const miscFeatures = [
	{
		icon: <UserIcon size={20} />,
		title: "Unified work profile",
		description: "Store your bio, location, role, and custom highlights in one centralized, modern profile.",
	},
	{
		icon: <BriefcaseIcon size={20} />,
		title: "Work experience timeline",
		description: "Document your career milestones, and dates with clean, chronological precision.",
	},
	{
		icon: <FolderGit2Icon size={20} />,
		title: "Project showcase",
		description: "Highlight your best builds with live URLs, execution years, and key technical takeaways.",
	},
	{
		icon: <GraduationCapIcon size={20} />,
		title: "Academic credentials",
		description: "Display your degrees, majors, and GPA in an easy-to-read academic breakdown.",
	},
	{
		icon: <Link2Icon size={20} />,
		title: "Custom social links",
		description: "Connect your personal website and LinkedIn so visitors can explore your work deeper.",
	},
	{
		icon: <ShieldCheckIcon size={20} />,
		title: "Secure & reliable",
		description: "Rest easy with encrypted sessions, instant page loads, and data synchronization.",
	},
]

export const faqs = [
	{
		question: "How is this different from a standard PDF resume?",
		answer:
			"Unlike static PDFs that get outdated quickly, your profile is a dynamic, shareable website. You can update your projects, skills, or employment history in real time without needing to re-export or re-send files.",
	},
	{
		question: "Can I link my own custom projects and websites?",
		answer:
			"Yes! Every profile includes dedicated sections to showcase live builds with outbound links, year of completion, and key highlights so employers can see your real-world proof of work.",
	},
	{
		question: "Is my profile public to everyone?",
		answer:
			"Yes, your published profile generates a clean, shareable link that anyone can view. You can easily share it on LinkedIn, add it to job applications, or send it directly to recruiters.",
	},
	{
		question: "Can I customize what information is shown?",
		answer:
			"Absolutely. You have full control over your bio, job experience, education, social links, and custom highlights from your settings dashboard.",
	},
	{
		question: "How much does it cost to build a profile?",
		answer:
			"Getting started and creating your interactive online profile is completely free. You can set up your entire profile and start sharing your link in minutes.",
	},
]