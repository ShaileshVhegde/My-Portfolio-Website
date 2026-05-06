import { 
  SiPython, SiJavascript, SiReact, SiNextdotjs, SiMongodb, SiPostgresql,
  SiDocker, SiJenkins, SiGit, SiLinux, SiFigma,
  SiHtml5, SiCss, SiTailwindcss, SiVercel, SiNodedotjs, SiExpress,
  SiFirebase, SiSonarqubecloud, SiTrivy, SiFlask, SiBurpsuite, SiGithubactions
} from "react-icons/si";
import { VscTerminalBash } from "react-icons/vsc";
import { MdSecurity } from "react-icons/md";
import { FaAws, FaChartLine, FaChartPie, FaGlobeAmericas, FaCalculator, FaCoins, FaUniversity } from "react-icons/fa";

export const skillsData = [
  {
    category: "DevSecOps & Cloud",
    skills: [
      { name: "AWS", icon: FaAws },
      { name: "Docker", icon: SiDocker },
      { name: "Jenkins", icon: SiJenkins },
      { name: "GitHub Actions", icon: SiGithubactions },
      { name: "SonarQube", icon: SiSonarqubecloud },
      { name: "Trivy", icon: SiTrivy },
      { name: "Argo CD", icon: VscTerminalBash }
    ]
  },
  {
    category: "Security",
    skills: [
      { name: "IAM & RBAC", icon: MdSecurity },
      { name: "Burp Suite", icon: SiBurpsuite },
      { name: "Web Security", icon: MdSecurity }
    ]
  },
  {
    category: "Backend Development",
    skills: [
      { name: "Python", icon: SiPython },
      { name: "Flask", icon: SiFlask },
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Express.js", icon: SiExpress },
      { name: "MongoDB", icon: SiMongodb },
      { name: "SQL", icon: SiPostgresql }
    ]
  },
  {
    category: "Frontend Development",
    skills: [
      { name: "JavaScript", icon: SiJavascript },
      { name: "React.js", icon: SiReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "HTML5", icon: SiHtml5 },
      { name: "CSS3", icon: SiCss }
    ]
  },
  {
    category: "Finance & Market Analytics",
    skills: [
      { name: "Stock Market Analysis", icon: FaChartLine },
      { name: "Mutual Funds & ETFs", icon: FaChartPie },
      { name: "Economic Indicators", icon: FaUniversity },
      { name: "Global Markets", icon: FaGlobeAmericas },
      { name: "Financial Ratios", icon: FaCalculator },
      { name: "Gold Investment", icon: FaCoins }
    ]
  },
  {
    category: "Tools & Others",
    skills: [
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "Linux", icon: SiLinux },
      { name: "Prompt Engineering", icon: VscTerminalBash }
    ]
  }
];
