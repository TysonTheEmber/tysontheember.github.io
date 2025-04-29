// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from "@mui/icons-material/YouTube";

// Material Kit 2 React components
import MKTypography from "components/MKTypography";

// Images
import logoCT from "assets/images/pfp1.png";

const date = new Date().getFullYear();

export default {
  brand: {
    name: "Project Ember",
    image: logoCT,
    route: "/",
  },
  socials: [
    {
      icon: <FacebookIcon />,
      link: "#",
    },
    {
      icon: <TwitterIcon />,
      link: "#",
    },
    {
      icon: <GitHubIcon />,
      link: "https://github.com/tysontheember",
    },
    {
      icon: <YouTubeIcon />,
      link: "https://www.youtube.com/@tysontheember",
    },
  ],
  menus: [
    {
      name: "company",
      items: [
        { name: "about us", href: "#" },
        { name: "freebies", href: "#" },
        { name: "premium tools", href: "#" },
        { name: "blog", href: "#" },
      ],
    },
    {
      name: "resources",
      items: [
        { name: "illustrations", href: "#" },
        { name: "bits & snippets", href: "#" },
        { name: "affiliate program", href: "#" },
      ],
    },
    {
      name: "help & support",
      items: [
        { name: "contact us", href: "#" },
        { name: "knowledge center", href: "#" },
        { name: "custom development", href: "#" },
        { name: "sponsorships", href: "#" },
      ],
    },
    {
      name: "legal",
      items: [
        { name: "terms & conditions", href: "#" },
        { name: "privacy policy", href: "#" },
        { name: "licenses (EULA)", href: "#" },
      ],
    },
  ],
  copyright: (
    <MKTypography variant="button" fontWeight="regular">
      All rights reserved. Copyright &copy; {date} Project Ember by{" "}
      <MKTypography
        component="a"
        href="https://github.com/tysontheember"
        target="_blank"
        rel="noreferrer"
        variant="button"
        fontWeight="regular"
      >
        Tyson Peterson
      </MKTypography>
      .
    </MKTypography>
  ),
};
